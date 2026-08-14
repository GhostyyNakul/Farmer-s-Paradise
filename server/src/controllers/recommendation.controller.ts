import type { Response } from 'express';
import { Farm } from '../models/Farm.js';
import { SoilReport } from '../models/SoilReport.js';
import { ApiError } from '../utils/apiError.js';
import { sendSuccess } from '../utils/response.js';
import { cropRecommendationService } from '../services/crop.service.js';
import { weatherService } from '../services/weather.service.js';
import type { AuthRequest } from '../middleware/auth.middleware.js';

export async function getCropRecommendations(req: AuthRequest, res: Response): Promise<void> {
  const { farmId, soilReportId, season } = req.body as {
    farmId: string;
    soilReportId?: string;
    season?: string;
  };

  const farm = await Farm.findOne({ _id: farmId, userId: req.user!._id });
  if (!farm) throw new ApiError(404, 'NOT_FOUND', 'Farm not found');

  let soilReport = null;
  if (soilReportId) {
    soilReport = await SoilReport.findOne({ _id: soilReportId, userId: req.user!._id });
    if (!soilReport) throw new ApiError(404, 'NOT_FOUND', 'Soil report not found');
  }

  const recommendations = await cropRecommendationService.recommend(farm, soilReport, season);
  sendSuccess(res, recommendations, 'Crop recommendations generated');
}

export async function getWeather(req: AuthRequest, res: Response): Promise<void> {
  const { lat, lng } = req.query as unknown as { lat: number; lng: number };
  const weather = await weatherService.getWeather(lat, lng);
  sendSuccess(res, weather, weather.isMock ? 'Mock weather data (development)' : 'Weather retrieved');
}
