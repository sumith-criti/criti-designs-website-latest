'use client';

import { ADDON_OPTIONS } from '../utils/options';
import { EstimatorFormData } from '../utils/types';

interface StepAddonsProps {
  formData: EstimatorFormData;
  onUpdate: (values: Partial<EstimatorFormData>) => void;
}

export function StepAddons({ formData, onUpdate }: StepAddonsProps) {
  const toggleAddon = (value: string) => {
    const current = new Set(formData.addons);
    if (current.has(value)) {
      current.delete(value);
    } else {
      current.add(value);
    }
    onUpdate({ addons: Array.from(current) });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Add-on features</h2>
        <p className="mt-1 text-sm text-gray-500">
          Select optional upgrades to include in your preliminary estimate.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {ADDON_OPTIONS.map((addon) => {
          const isActive = formData.addons.includes(addon.value);
          return (
            <button
              key={addon.value}
              type="button"
              onClick={() => toggleAddon(addon.value)}
              className={`flex h-full flex-col rounded-xl border p-5 text-left transition-all ${
                isActive
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-600 shadow-sm'
                  : 'border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-gray-900'
              }`}
            >
              <span className="text-lg font-semibold text-gray-900">{addon.label}</span>
              <span className="mt-2 text-sm text-gray-500">{addon.description}</span>
              <span className="mt-4 inline-flex w-max rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                {isActive ? 'Included' : 'Tap to include'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}


