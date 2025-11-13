export type TimelinePreference = 'normal' | 'fast-track';

export type MaterialQuality = 'basic' | 'standard' | 'premium';

export type InteriorRequirement = 'none' | 'partial' | 'full';

export type FinishQuality = 'basic' | 'standard' | 'luxury';

export type StructuralComplexity = 'simple' | 'moderate' | 'complex';

export interface EstimatorFormData {
  service: string;
  projectLocation: string;
  builtUpArea: number | '';
  projectType: string;
  timelinePreference: TimelinePreference;
  materialQuality: MaterialQuality;
  interiorRequirement: InteriorRequirement;
  finishQuality: FinishQuality;
  structuralComplexity: StructuralComplexity;
  addons: string[];
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  additionalNotes: string;
}

export interface EstimateBreakdown {
  constructionCost: number;
  interiorCost: number;
  extrasCost: number;
  totalBaseCost: number;
}

export interface EstimateResult {
  minEstimate: number;
  maxEstimate: number;
  marginPercentage: number;
  breakdown: EstimateBreakdown;
  timelineWeeks: number;
  timelineLabel: string;
}

