const BASE_CONSTRUCTION_RATE = {
  basic: 1450,
  standard: 1750,
  premium: 2200,
};

const INTERIOR_RATE = {
  none: 0,
  partial: 400,
  full: 900,
};

const FINISH_RATE = {
  basic: 0,
  standard: 150,
  luxury: 320,
};

const COMPLEXITY_MULTIPLIER = {
  simple: 1,
  moderate: 1.05,
  complex: 1.12,
};

const TIMELINE_SURCHARGE = {
  normal: 1,
  'fast-track': 1.08,
};

const COMPLEXITY_MARGIN = {
  simple: 10,
  moderate: 12.5,
  complex: 15,
};

const EXTRA_COSTS = {
  modularKitchen: 85000,
  wardrobes: 60000,
  landscaping: 55000,
  smartHome: 45000,
  solar: 65000,
  hvac: 95000,
};

const FALSE_CEILING_RATE = 130;

const DEFAULT_TIMELINE_CONFIG = {
  minWeeks: 12,
  sqftPerWeek: 150,
  complexityMultiplier: {
    simple: 1,
    moderate: 1.12,
    complex: 1.25,
  },
  fastTrackReduction: 0.85,
};

function sanitizeNumber(value) {
  if (value === '' || value === null || value === undefined) {
    return 0;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function roundCurrency(value) {
  return Math.round(value / 1000) * 1000;
}

function calculateTimelineWeeks({ builtUpArea, structuralComplexity, timelinePreference }) {
  const area = sanitizeNumber(builtUpArea);
  const {
    minWeeks,
    sqftPerWeek,
    complexityMultiplier,
    fastTrackReduction,
  } = DEFAULT_TIMELINE_CONFIG;

  const baseWeeks = Math.max(minWeeks, Math.ceil(area / sqftPerWeek));
  const complexityFactor = complexityMultiplier[structuralComplexity] ?? 1;
  let timeline = baseWeeks * complexityFactor;

  if (timelinePreference === 'fast-track') {
    timeline *= fastTrackReduction;
  }

  const timelineWeeks = Math.max(6, Math.round(timeline));
  const paddedHigh = Math.round(timelineWeeks * 1.15);

  return {
    timelineWeeks,
    timelineLabel: `${timelineWeeks} - ${paddedHigh} weeks`,
  };
}

export function calculateEstimate(formData) {
  const {
    builtUpArea,
    materialQuality,
    interiorRequirement,
    finishQuality,
    structuralComplexity,
    timelinePreference,
    addons = [],
  } = formData;

  const area = sanitizeNumber(builtUpArea);
  const baseRate = BASE_CONSTRUCTION_RATE[materialQuality] ?? BASE_CONSTRUCTION_RATE.standard;
  const interiorRate = INTERIOR_RATE[interiorRequirement] ?? INTERIOR_RATE.none;
  const finishRate = FINISH_RATE[finishQuality] ?? FINISH_RATE.standard;
  const complexityFactor = COMPLEXITY_MULTIPLIER[structuralComplexity] ?? 1;
  const timelineFactor = TIMELINE_SURCHARGE[timelinePreference] ?? 1;

  const constructionCost = area * baseRate * complexityFactor * timelineFactor;
  const interiorCost = area * (interiorRate + finishRate) * complexityFactor * timelineFactor;

  const extrasCost = addons.reduce((total, addon) => {
    if (addon === 'falseCeiling') {
      return total + area * FALSE_CEILING_RATE;
    }
    const extraCost = EXTRA_COSTS[addon] ?? 0;
    return total + extraCost;
  }, 0);

  const totalBaseCost = constructionCost + interiorCost + extrasCost;

  const marginPercentage = COMPLEXITY_MARGIN[structuralComplexity] ?? COMPLEXITY_MARGIN.moderate;
  const minEstimate = roundCurrency(totalBaseCost);
  const maxEstimate = roundCurrency(totalBaseCost * (1 + marginPercentage / 100));

  const { timelineWeeks, timelineLabel } = calculateTimelineWeeks({
    builtUpArea: area,
    structuralComplexity,
    timelinePreference,
  });

  return {
    minEstimate,
    maxEstimate,
    marginPercentage,
    breakdown: {
      constructionCost: roundCurrency(constructionCost),
      interiorCost: roundCurrency(interiorCost),
      extrasCost: roundCurrency(extrasCost),
      totalBaseCost: roundCurrency(totalBaseCost),
    },
    timelineWeeks,
    timelineLabel,
  };
}

export function formatCurrency(value, locale = 'en-IN') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}


