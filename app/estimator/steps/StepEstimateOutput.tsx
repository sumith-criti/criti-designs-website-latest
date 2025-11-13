'use client';

import { formatCurrency } from '@/lib/calculateEstimate';
import { EstimatorFormData, EstimateResult } from '../utils/types';

interface StepEstimateOutputProps {
  formData: EstimatorFormData;
  estimate: EstimateResult | null;
  onUpdate: (values: Partial<EstimatorFormData>) => void;
  onRecalculate: () => Promise<void>;
  onDownloadPdf: () => Promise<void>;
  onSubmitLead: () => Promise<void>;
  isCalculating: boolean;
  isGeneratingPdf: boolean;
  isSubmittingLead: boolean;
  lastCalculatedOn?: Date | null;
}

export function StepEstimateOutput({
  formData,
  estimate,
  onUpdate,
  onRecalculate,
  onDownloadPdf,
  onSubmitLead,
  isCalculating,
  isGeneratingPdf,
  isSubmittingLead,
  lastCalculatedOn,
}: StepEstimateOutputProps) {
  const canDownloadOrSubmit = Boolean(estimate);
  const pdfEnabled =
    typeof process !== 'undefined' &&
    typeof process.env !== 'undefined' &&
    process.env.NEXT_PUBLIC_ENABLE_PDF === 'true';

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Preliminary estimate</h2>
          <p className="mt-1 text-sm text-gray-500">
            Review the indicative range for your project. Numbers update instantly when you tweak
            earlier steps.
          </p>
        </div>
        <button
          type="button"
          onClick={onRecalculate}
          disabled={isCalculating}
          className="inline-flex items-center justify-center rounded-lg border border-indigo-500 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
        >
          {isCalculating ? 'Refreshing...' : 'Recalculate'}
        </button>
      </div>

      <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-600 to-indigo-500 p-6 text-white shadow-lg">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-indigo-100">Estimated investment</p>
            <p className="text-3xl font-semibold">
              {estimate ? (
                <>
                  {formatCurrency(estimate.minEstimate)} – {formatCurrency(estimate.maxEstimate)}
                </>
              ) : (
                'Awaiting inputs'
              )}
            </p>
          </div>
          <div className="text-sm sm:text-right">
            <p className="text-indigo-100">Projected timeline</p>
            <p className="text-lg font-semibold">
              {estimate ? estimate.timelineLabel : 'Provide project details'}
            </p>
            <p className="mt-1 text-xs text-indigo-100">
              Margin applied: {estimate ? `${estimate.marginPercentage}%` : '—'}
            </p>
            {lastCalculatedOn ? (
              <p className="mt-1 text-[11px] text-indigo-100">
                Last updated {lastCalculatedOn.toLocaleString()}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-500">Construction</p>
          <p className="mt-2 text-xl font-semibold text-gray-900">
            {estimate ? formatCurrency(estimate.breakdown.constructionCost) : '—'}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Includes structure, shell, and core finishing based on selected quality.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-500">Interiors</p>
          <p className="mt-2 text-xl font-semibold text-gray-900">
            {estimate ? formatCurrency(estimate.breakdown.interiorCost) : '—'}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Covers interior specification, finishing materials, and custom fit-outs.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-gray-500">Extras</p>
          <p className="mt-2 text-xl font-semibold text-gray-900">
            {estimate ? formatCurrency(estimate.breakdown.extrasCost) : '—'}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Optional upgrades and add-ons you&apos;ve included in the scope.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-gray-800">Client details</p>
        <p className="mt-1 text-xs text-gray-500">
          Leave your details and our consultants will get in touch with a detailed proposal.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="flex flex-col space-y-2">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Full name
            </span>
            <input
              type="text"
              value={formData.clientName}
              onChange={(event) => onUpdate({ clientName: event.target.value })}
              placeholder="Your name"
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </label>
          <label className="flex flex-col space-y-2">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Email
            </span>
            <input
              type="email"
              value={formData.clientEmail}
              onChange={(event) => onUpdate({ clientEmail: event.target.value })}
              placeholder="you@email.com"
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </label>
          <label className="flex flex-col space-y-2">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Phone
            </span>
            <input
              type="tel"
              value={formData.clientPhone}
              onChange={(event) => onUpdate({ clientPhone: event.target.value })}
              placeholder="+91 XXXXX XXXXX"
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </label>
          <label className="flex flex-col space-y-2 md:col-span-2">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Additional notes
            </span>
            <textarea
              rows={3}
              value={formData.additionalNotes}
              onChange={(event) => onUpdate({ additionalNotes: event.target.value })}
              placeholder="Share anything else that will help us prepare for a discovery call."
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </label>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          This is a preliminary estimate. Final pricing will be confirmed after a detailed site
          visit and scope definition.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-gray-500">
          Need adjustments? Navigate back to update earlier steps. Your estimate will refresh.
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onDownloadPdf}
            disabled={!canDownloadOrSubmit || isGeneratingPdf || !pdfEnabled}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-indigo-400 hover:text-indigo-600 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400"
          >
            {pdfEnabled ? (isGeneratingPdf ? 'Preparing PDF…' : 'Download PDF estimate') : 'PDF disabled'}
          </button>
          <button
            type="button"
            onClick={onSubmitLead}
            disabled={!canDownloadOrSubmit || isSubmittingLead}
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
          >
            {isSubmittingLead ? 'Submitting…' : 'Submit & request consultation'}
          </button>
        </div>
      </div>
    </div>
  );
}


