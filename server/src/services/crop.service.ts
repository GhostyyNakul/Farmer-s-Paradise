import type { ISoilReportDocument } from '../models/SoilReport.js';
import type { IFarmDocument } from '../models/Farm.js';
import { aiService } from './ai.service.js';
import { weatherService } from './weather.service.js';

export interface CropRecommendation {
  crop: string;
  suitability: number;
  reason: string;
  waterRequirement: 'low' | 'medium' | 'high';
  growingPeriod: string;
  soilCompatibility: 'poor' | 'fair' | 'good' | 'excellent';
}

interface CropRule {
  crop: string;
  phMin: number;
  phMax: number;
  nMin: number;
  pMin: number;
  kMin: number;
  waterRequirement: 'low' | 'medium' | 'high';
  growingPeriod: string;
  seasons: string[];
  baseScore: number;
}

const CROP_RULES: CropRule[] = [
  {
    crop: 'Wheat',
    phMin: 6.0,
    phMax: 7.5,
    nMin: 120,
    pMin: 20,
    kMin: 150,
    waterRequirement: 'medium',
    growingPeriod: '110-130 days',
    seasons: ['rabi', 'winter'],
    baseScore: 85,
  },
  {
    crop: 'Mustard',
    phMin: 6.0,
    phMax: 7.5,
    nMin: 80,
    pMin: 15,
    kMin: 100,
    waterRequirement: 'low',
    growingPeriod: '90-105 days',
    seasons: ['rabi', 'winter'],
    baseScore: 82,
  },
  {
    crop: 'Tomato',
    phMin: 6.0,
    phMax: 7.0,
    nMin: 100,
    pMin: 25,
    kMin: 180,
    waterRequirement: 'high',
    growingPeriod: '75-90 days',
    seasons: ['kharif', 'summer', 'zaid'],
    baseScore: 78,
  },
  {
    crop: 'Rice',
    phMin: 5.5,
    phMax: 7.0,
    nMin: 100,
    pMin: 15,
    kMin: 100,
    waterRequirement: 'high',
    growingPeriod: '120-150 days',
    seasons: ['kharif', 'monsoon'],
    baseScore: 80,
  },
  {
    crop: 'Maize',
    phMin: 5.8,
    phMax: 7.5,
    nMin: 130,
    pMin: 20,
    kMin: 120,
    waterRequirement: 'medium',
    growingPeriod: '90-110 days',
    seasons: ['kharif', 'summer'],
    baseScore: 83,
  },
  {
    crop: 'Cotton',
    phMin: 6.0,
    phMax: 8.0,
    nMin: 100,
    pMin: 20,
    kMin: 150,
    waterRequirement: 'medium',
    growingPeriod: '150-180 days',
    seasons: ['kharif', 'summer'],
    baseScore: 75,
  },
];

function scoreCrop(
  rule: CropRule,
  soil: { pH?: number; nitrogen?: number; phosphorus?: number; potassium?: number },
  season?: string
): { score: number; reason: string; compatibility: CropRecommendation['soilCompatibility'] } {
  let score = rule.baseScore;
  const reasons: string[] = [];

  const ph = soil.pH ?? 6.5;
  if (ph >= rule.phMin && ph <= rule.phMax) {
    score += 8;
    reasons.push(`pH ${ph} suits ${rule.crop}`);
  } else {
    score -= 15;
    reasons.push(`pH ${ph} is outside optimal range (${rule.phMin}-${rule.phMax})`);
  }

  if ((soil.nitrogen ?? 0) >= rule.nMin) {
    score += 5;
    reasons.push('adequate nitrogen');
  } else {
    score -= 8;
    reasons.push('nitrogen may need supplementation');
  }

  if ((soil.phosphorus ?? 0) >= rule.pMin) score += 3;
  else score -= 5;

  if ((soil.potassium ?? 0) >= rule.kMin) score += 3;
  else score -= 5;

  if (season && rule.seasons.some((s) => season.toLowerCase().includes(s))) {
    score += 5;
    reasons.push(`suitable for ${season} season`);
  }

  score = Math.min(99, Math.max(40, score));

  let compatibility: CropRecommendation['soilCompatibility'] = 'fair';
  if (score >= 90) compatibility = 'excellent';
  else if (score >= 75) compatibility = 'good';
  else if (score < 60) compatibility = 'poor';

  return { score, reason: reasons.join('; '), compatibility };
}

class CropRecommendationService {
  async recommend(
    farm: IFarmDocument,
    soilReport?: ISoilReportDocument | null,
    season?: string
  ): Promise<CropRecommendation[]> {
    const soil = {
      pH: soilReport?.pH,
      nitrogen: soilReport?.nitrogen,
      phosphorus: soilReport?.phosphorus,
      potassium: soilReport?.potassium,
    };

    let weatherNote = '';
    if (farm.location?.latitude && farm.location?.longitude) {
      const weather = await weatherService.getWeather(
        farm.location.latitude,
        farm.location.longitude
      );
      weatherNote = `Current conditions: ${weather.condition}, ${weather.temperature}°C`;
    }

    const recommendations: CropRecommendation[] = [];

    for (const rule of CROP_RULES) {
      const { score, reason, compatibility } = scoreCrop(rule, soil, season);
      let fullReason = reason;
      if (weatherNote) fullReason += `. ${weatherNote}`;

      if (envHasGemini()) {
        try {
          fullReason = await aiService.explainRecommendation(rule.crop, fullReason);
        } catch {
          // keep rule-based reason
        }
      }

      recommendations.push({
        crop: rule.crop,
        suitability: score,
        reason: fullReason,
        waterRequirement: rule.waterRequirement,
        growingPeriod: rule.growingPeriod,
        soilCompatibility: compatibility,
      });
    }

    return recommendations.sort((a, b) => b.suitability - a.suitability);
  }
}

function envHasGemini(): boolean {
  return Boolean(process.env.GEMINI_API_KEY);
}

export const cropRecommendationService = new CropRecommendationService();
