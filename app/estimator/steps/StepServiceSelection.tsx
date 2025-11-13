'use client';

import { SERVICE_OPTIONS } from '../utils/options';
import { EstimatorFormData } from '../utils/types';

interface StepServiceSelectionProps {
  formData: EstimatorFormData;
  onUpdate: (values: Partial<EstimatorFormData>) => void;
}

export function StepServiceSelection({ formData, onUpdate }: StepServiceSelectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">What can we build for you?</h2>
        <p className="mt-1 text-sm text-gray-500">
          Pick the service that best aligns with your project goals.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {SERVICE_OPTIONS.map((option) => {
          const isActive = formData.service === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onUpdate({ service: option })}
              className={`rounded-xl border p-5 text-left transition-all ${
                isActive
                  ? 'border-indigo-500 bg-indigo-50 shadow-sm'
                  : 'border-gray-200 hover:border-indigo-300 hover:shadow-sm'
              }`}
            >
              <h3 className="text-lg font-medium text-gray-900">{option}</h3>
              <p className="mt-2 text-sm text-gray-500">
                {option === 'Home Construction' && 'End-to-end design and build for new homes.'}
                {option === 'Architecture and Design' && 'Concept to detailed design for bespoke spaces.'}
                {option === 'Interior Design' && 'Curated interiors tailored to your lifestyle.'}
                {option === 'Renovation or Remodeling' && 'Transform existing spaces with expert planning.'}
                {option === 'Landscaping' && 'Outdoor environments that elevate your property.'}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

