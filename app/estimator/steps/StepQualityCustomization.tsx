'use client';

import {
  MATERIAL_QUALITY_OPTIONS,
  INTERIOR_REQUIREMENT_OPTIONS,
  FINISH_QUALITY_OPTIONS,
  STRUCTURAL_COMPLEXITY_OPTIONS,
} from '../utils/options';
import { EstimatorFormData } from '../utils/types';

interface StepQualityCustomizationProps {
  formData: EstimatorFormData;
  onUpdate: (values: Partial<EstimatorFormData>) => void;
}

export function StepQualityCustomization({ formData, onUpdate }: StepQualityCustomizationProps) {
  const renderOptionGroup = (
    label: string,
    options: { value: string; label: string }[],
    activeValue: string,
    field: keyof EstimatorFormData
  ) => (
    <div className="space-y-3 rounded-xl border border-gray-200 p-5 shadow-sm">
      <div>
        <h3 className="text-base font-semibold text-gray-900">{label}</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const isActive = activeValue === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onUpdate({ [field]: option.value } as Partial<EstimatorFormData>)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-600 shadow-sm'
                  : 'border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-gray-900'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Quality & specification preferences</h2>
        <p className="mt-1 text-sm text-gray-500">
          Customise the finish level and complexity of the project to align with your expectations.
        </p>
      </div>

      <div className="space-y-5">
        {renderOptionGroup(
          'Material quality',
          MATERIAL_QUALITY_OPTIONS,
          formData.materialQuality,
          'materialQuality'
        )}

        {renderOptionGroup(
          'Interior involvement',
          INTERIOR_REQUIREMENT_OPTIONS,
          formData.interiorRequirement,
          'interiorRequirement'
        )}

        {renderOptionGroup(
          'Finish quality',
          FINISH_QUALITY_OPTIONS,
          formData.finishQuality,
          'finishQuality'
        )}

        {renderOptionGroup(
          'Structural complexity',
          STRUCTURAL_COMPLEXITY_OPTIONS,
          formData.structuralComplexity,
          'structuralComplexity'
        )}
      </div>
    </div>
  );
}


