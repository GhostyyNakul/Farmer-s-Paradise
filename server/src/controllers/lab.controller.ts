import type { Response } from 'express';
import { sendSuccess } from '../utils/response.js';
import { labService } from '../services/lab.service.js';
import type { AuthRequest } from '../middleware/auth.middleware.js';

export async function getNearbyLabs(req: AuthRequest, res: Response): Promise<void> {
  const { lat, lng, radius } = req.query as unknown as {
    lat: number;
    lng: number;
    radius: number;
  };

  const labs = await labService.findNearby(lat, lng, radius);
  sendSuccess(res, labs, `Found ${labs.length} laboratories within ${radius}km`);
}

export async function listLabs(_req: AuthRequest, res: Response): Promise<void> {
  const { Laboratory } = await import('../models/Laboratory.js');
  const labs = await Laboratory.find().sort({ rating: -1 });
  sendSuccess(res, labs);
}

export async function getLab(req: AuthRequest, res: Response): Promise<void> {
  const { Laboratory } = await import('../models/Laboratory.js');
  const lab = await Laboratory.findById(req.params.id);
  if (!lab) {
    const { ApiError } = await import('../utils/apiError.js');
    throw new ApiError(404, 'NOT_FOUND', 'Laboratory not found');
  }
  sendSuccess(res, lab);
}
