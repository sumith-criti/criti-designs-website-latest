'use client';

import { ChangeEvent } from 'react';
import { PROJECT_TYPES, TIMELINE_OPTIONS } from '../utils/options';
import { EstimatorFormData } from '../utils/types';

interface StepProjectDetailsProps {
  formData: EstimatorFormData;
  onUpdate: (values: Partial<EstimatorFormData>) => void;
}

export function StepProjectDetails({ formData, onUpdate }: StepProjectDetailsProps) {
  const handleChange =
    (key: keyof EstimatorFormData) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = event.target.type === 'number' ? Number(event.target.value) : event.target.value;
      onUpdate({
        [key]: event.target.type === 'number' && Number.isNaN(value) ? '' : value,
      });
    };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Project fundamentals</h2>
        <p className="mt-1 text-sm text-gray-500">
          Tell us where you&apos;re building and the scale of the project.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col space-y-2">
          <span className="text-sm font-medium text-gray-700">Project location</span>
          <input
            type="text"
            value={formData.projectLocation}
            onChange={handleChange('projectLocation')}
            placeholder="e.g. Indiranagar, Bengaluru"
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </label>

        <label className="flex flex-col space-y-2">
          <span className="text-sm font-medium text-gray-700">Built-up area (sq ft)</span>
          <input
            type="number"
            min={0}
            step={50}
            value={formData.builtUpArea}
            onChange={handleChange('builtUpArea')}
            placeholder="e.g. 2500"
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </label>

        <label className="flex flex-col space-y-2">
          <span className="text-sm font-medium text-gray-700">Project type</span>
          <select
            value={formData.projectType}
            onChange={handleChange('projectType')}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">Select project type</option>
            {PROJECT_TYPES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-col space-y-3">
          <span className="text-sm font-medium text-gray-700">Preferred timeline</span>
          <div className="grid gap-3 sm:grid-cols-2">
            {TIMELINE_OPTIONS.map((option) => {
              const isActive = formData.timelinePreference === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onUpdate({ timelinePreference: option.value as EstimatorFormData['timelinePreference'] })}
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
      </div>
    </div>
  );
}


