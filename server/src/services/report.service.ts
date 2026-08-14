import type { ISoilReportDocument } from '../models/SoilReport.js';

export interface SoilInterpretation {
  soilHealthSummary: string;
  deficiencies: string[];
  recommendations: string[];
  suitableCrops: string[];
  nutrientLevels: Record<string, string>;
}

function classifyNitrogen(value?: number): string {
  if (value === undefined) return 'Unknown';
  if (value < 100) return 'Low';
  if (value < 180) return 'Medium';
  return 'High';
}

function classifyPhosphorus(value?: number): string {
  if (value === undefined) return 'Unknown';
  if (value < 20) return 'Low';
  if (value < 35) return 'Medium';
  return 'High';
}

function classifyPotassium(value?: number): string {
  if (value === undefined) return 'Unknown';
  if (value < 150) return 'Low';
  if (value < 250) return 'Medium';
  return 'High';
}

function classifyPh(value?: number): string {
  if (value === undefined) return 'Unknown';
  if (value < 5.5) return 'Acidic';
  if (value < 6.2) return 'Slightly Acidic';
  if (value <= 7.5) return 'Neutral';
  return 'Alkaline';
}

export function generateSoilInterpretation(report: ISoilReportDocument): SoilInterpretation {
  const nutrientLevels: Record<string, string> = {
    pH: classifyPh(report.pH),
    nitrogen: classifyNitrogen(report.nitrogen),
    phosphorus: classifyPhosphorus(report.phosphorus),
    potassium: classifyPotassium(report.potassium),
    organicCarbon: report.organicCarbon && report.organicCarbon >= 1.2 ? 'Adequate' : 'Low',
    moisture: report.moisture && report.moisture >= 24 ? 'Adequate' : 'Low',
  };

  const deficiencies: string[] = [];
  if (nutrientLevels.nitrogen === 'Low') deficiencies.push('Nitrogen (N)');
  if (nutrientLevels.phosphorus === 'Low') deficiencies.push('Phosphorus (P)');
  if (nutrientLevels.potassium === 'Low') deficiencies.push('Potassium (K)');
  if (nutrientLevels.organicCarbon === 'Low') deficiencies.push('Organic carbon');

  const recommendations: string[] = [];
  if (deficiencies.includes('Nitrogen (N)')) {
    recommendations.push('Consider organic compost or approved nitrogen sources based on local guidance.');
  }
  if (deficiencies.includes('Phosphorus (P)')) {
    recommendations.push('Improve phosphorus availability with balanced organic amendments.');
  }
  if (deficiencies.includes('Potassium (K)')) {
    recommendations.push('Monitor potassium levels; consider crop residue return or approved K sources.');
  }
  if (nutrientLevels.pH === 'Acidic' || nutrientLevels.pH === 'Slightly Acidic') {
    recommendations.push('pH is slightly acidic — lime application may help after local soil expert consultation.');
  }
  if (recommendations.length === 0) {
    recommendations.push('Maintain current soil management practices and periodic monitoring.');
  }

  const suitableCrops: string[] = [];
  const ph = report.pH ?? 6.5;
  if (ph >= 6.0 && ph <= 7.5) {
    suitableCrops.push('Wheat', 'Mustard', 'Tomato', 'Maize');
  } else if (ph < 6.0) {
    suitableCrops.push('Potato', 'Rice', 'Tea');
  } else {
    suitableCrops.push('Barley', 'Cotton', 'Sugarcane');
  }

  const soilHealthSummary =
    deficiencies.length === 0
      ? 'Soil nutrient profile is generally balanced with good growing potential.'
      : `Soil shows deficiencies in ${deficiencies.join(', ')}. Targeted management can improve productivity.`;

  return {
    soilHealthSummary,
    deficiencies,
    recommendations,
    suitableCrops,
    nutrientLevels,
  };
}
