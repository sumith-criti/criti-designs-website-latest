'use client';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  disableNext?: boolean;
  nextLabel?: string;
}

export function StepNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  disableNext,
  nextLabel,
}: StepNavigationProps) {
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;

  return (
    <div className="flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-xs text-gray-500">
        Step {currentStep + 1} of {totalSteps}
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirst}
          className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-indigo-300 hover:text-indigo-600 disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-300"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={disableNext || isLast}
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
        >
          {isLast ? 'Done' : nextLabel ?? 'Next'}
        </button>
      </div>
    </div>
  );
}


