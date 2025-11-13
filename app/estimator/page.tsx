'use client';

import { useCallback, useMemo, useState } from 'react';
import { calculateEstimate } from '@/lib/calculateEstimate';
import { ProgressIndicator } from './components/ProgressIndicator';
import { StepNavigation } from './components/StepNavigation';
import { StepServiceSelection } from './steps/StepServiceSelection';
import { StepProjectDetails } from './steps/StepProjectDetails';
import { StepQualityCustomization } from './steps/StepQualityCustomization';
import { StepAddons } from './steps/StepAddons';
import { StepEstimateOutput } from './steps/StepEstimateOutput';
import { STEP_TITLES } from './utils/options';
import { EstimatorFormData, EstimateResult } from './utils/types';

const TOTAL_STEPS = STEP_TITLES.length;

const INITIAL_FORM_DATA: EstimatorFormData = {
  service: '',
  projectLocation: '',
  builtUpArea: '',
  projectType: '',
  timelinePreference: 'normal',
  materialQuality: 'standard',
  interiorRequirement: 'partial',
  finishQuality: 'standard',
  structuralComplexity: 'moderate',
  addons: [],
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  additionalNotes: '',
};

type FeedbackState =
  | {
      type: 'success' | 'error';
      message: string;
    }
  | null;

export default function EstimatorPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<EstimatorFormData>(INITIAL_FORM_DATA);
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [lastCalculatedOn, setLastCalculatedOn] = useState<Date | null>(null);

  const updateFormData = useCallback((values: Partial<EstimatorFormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...values,
    }));
  }, []);

  const isStepValid = useCallback(
    (stepIndex: number) => {
      switch (stepIndex) {
        case 0:
          return Boolean(formData.service);
        case 1:
          return (
            Boolean(formData.projectLocation?.trim()) &&
            Number(formData.builtUpArea) > 0 &&
            Boolean(formData.projectType)
          );
        default:
          return true;
      }
    },
    [formData.builtUpArea, formData.projectLocation, formData.projectType, formData.service]
  );

  const handleCalculateEstimate = useCallback(async () => {
    if (!formData.builtUpArea || Number(formData.builtUpArea) <= 0) {
      setEstimate(null);
      setFeedback({
        type: 'error',
        message: 'Enter a valid built-up area to generate an estimate.',
      });
      return;
    }

    setIsCalculating(true);
    setFeedback(null);
    try {
      const result = calculateEstimate({
        ...formData,
        builtUpArea: Number(formData.builtUpArea),
      });
      setEstimate(result);
      setLastCalculatedOn(new Date());
    } catch (error) {
      console.error('[estimate/calculate]', error);
      setFeedback({
        type: 'error',
        message: 'Unable to calculate estimate right now. Please try again in a moment.',
      });
    } finally {
      setIsCalculating(false);
    }
  }, [formData]);

  const handleNext = useCallback(async () => {
    if (currentStep === TOTAL_STEPS - 2) {
      await handleCalculateEstimate();
    }
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
  }, [currentStep, handleCalculateEstimate]);

  const handlePrevious = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleDownloadPdf = useCallback(async () => {
    if (!estimate) {
      return;
    }

    setIsGeneratingPdf(true);
    setFeedback(null);

    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: {
            ...formData,
            builtUpArea: Number(formData.builtUpArea) || '',
          },
          estimate,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'criti-project-estimate.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setFeedback({
        type: 'success',
        message: 'PDF generated successfully. Check your downloads.',
      });
    } catch (error) {
      console.error('[estimate/pdf]', error);
      setFeedback({
        type: 'error',
        message: 'We could not create the PDF. Please try again shortly.',
      });
    } finally {
      setIsGeneratingPdf(false);
    }
  }, [estimate, formData]);

  const handleSubmitLead = useCallback(async () => {
    if (!estimate) {
      return;
    }

    if (!formData.clientName || !formData.clientEmail || !formData.clientPhone) {
      setFeedback({
        type: 'error',
        message: 'Please share your name, email, and phone so we can get in touch.',
      });
      return;
    }

    setIsSubmittingLead(true);
    setFeedback(null);

    try {
      const response = await fetch('/api/save-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: {
            ...formData,
            builtUpArea: Number(formData.builtUpArea) || '',
          },
          estimate,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save lead');
      }

      setFeedback({
        type: 'success',
        message:
          'Thanks for sharing your details! Our consultants will reach out shortly to schedule a walkthrough.',
      });
    } catch (error) {
      console.error('[estimate/lead]', error);
      setFeedback({
        type: 'error',
        message: 'Unable to submit your request right now. Please try again later.',
      });
    } finally {
      setIsSubmittingLead(false);
    }
  }, [estimate, formData]);

  const stepContent = useMemo(() => {
    switch (currentStep) {
      case 0:
        return <StepServiceSelection formData={formData} onUpdate={updateFormData} />;
      case 1:
        return <StepProjectDetails formData={formData} onUpdate={updateFormData} />;
      case 2:
        return <StepQualityCustomization formData={formData} onUpdate={updateFormData} />;
      case 3:
        return <StepAddons formData={formData} onUpdate={updateFormData} />;
      case 4:
        return (
          <StepEstimateOutput
            formData={formData}
            estimate={estimate}
            onUpdate={updateFormData}
            onRecalculate={handleCalculateEstimate}
            onDownloadPdf={handleDownloadPdf}
            onSubmitLead={handleSubmitLead}
            isCalculating={isCalculating}
            isGeneratingPdf={isGeneratingPdf}
            isSubmittingLead={isSubmittingLead}
            lastCalculatedOn={lastCalculatedOn}
          />
        );
      default:
        return null;
    }
  }, [
    currentStep,
    estimate,
    formData,
    handleCalculateEstimate,
    handleDownloadPdf,
    handleSubmitLead,
    isCalculating,
    isGeneratingPdf,
    isSubmittingLead,
    lastCalculatedOn,
    updateFormData,
  ]);

  return (
    <div className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-600">
            Criti Designs
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Project cost estimator
          </h1>
          <p className="mt-3 max-w-2xl text-base text-gray-600">
            Get a tailored investment range for your next build in minutes. Walk through the guided
            steps and receive a ready-to-share PDF summary.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
          <div className="flex flex-col gap-6">
            <ProgressIndicator currentStep={currentStep} />

            {feedback ? (
              <div
                className={`rounded-xl border px-4 py-3 text-sm ${
                  feedback.type === 'success'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border-rose-200 bg-rose-50 text-rose-700'
                }`}
              >
                {feedback.message}
              </div>
            ) : null}

            <div className="min-h-[320px]">{stepContent}</div>

            {currentStep < TOTAL_STEPS - 1 ? (
              <StepNavigation
                currentStep={currentStep}
                totalSteps={TOTAL_STEPS}
                onPrevious={handlePrevious}
                onNext={() => {
                  if (!isStepValid(currentStep)) {
                    setFeedback({
                      type: 'error',
                      message: 'Please complete the required details before continuing.',
                    });
                    return;
                  }
                  setFeedback(null);
                  void handleNext();
                }}
                disableNext={!isStepValid(currentStep)}
                nextLabel={currentStep === TOTAL_STEPS - 2 ? 'Generate estimate' : 'Next'}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}


