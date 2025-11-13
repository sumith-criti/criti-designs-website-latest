'use client';

import { STEP_TITLES } from '../utils/options';

interface ProgressIndicatorProps {
  currentStep: number;
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center gap-3">
      {STEP_TITLES.map((title, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={title} className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition ${
                isCompleted
                  ? 'border-indigo-500 bg-indigo-500 text-white'
                  : isActive
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                  : 'border-gray-200 bg-white text-gray-400'
              }`}
            >
              {index + 1}
            </div>
            <div className="hidden flex-col sm:flex">
              <span
                className={`text-xs font-medium uppercase tracking-wide ${
                  isActive || isCompleted ? 'text-indigo-600' : 'text-gray-400'
                }`}
              >
                Step {index + 1}
              </span>
              <span className="text-sm font-semibold text-gray-900">{title}</span>
            </div>
            {index < STEP_TITLES.length - 1 ? (
              <div className="h-px w-8 bg-gray-200 sm:w-16" />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}


