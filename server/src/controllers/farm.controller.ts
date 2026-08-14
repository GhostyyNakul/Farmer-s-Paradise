import type { Response } from 'express';
import { Farm } from '../models/Farm.js';
import { ApiError } from '../utils/apiError.js';
import { sendSuccess } from '../utils/response.js';
import type { AuthRequest } from '../middleware/auth.middleware.js';

export async function listFarms(req: AuthRequest, res: Response): Promise<void> {
  const farms = await Farm.find({ userId: req.user!._id }).sort({ createdAt: -1 });
  sendSuccess(res, farms);
}

export async function createFarm(req: AuthRequest, res: Response): Promise<void> {
  const farm = await Farm.create({ ...req.body, userId: req.user!._id });
  sendSuccess(res, farm, 'Farm created', 201);
}

export async function getFarm(req: AuthRequest, res: Response): Promise<void> {
  const farm = await Farm.findOne({ _id: req.params.id, userId: req.user!._id });
  if (!farm) throw new ApiError(404, 'NOT_FOUND', 'Farm not found');
  sendSuccess(res, farm);
}

export async function updateFarm(req: AuthRequest, res: Response): Promise<void> {
  const farm = await Farm.findOneAndUpdate(
    { _id: req.params.id, userId: req.user!._id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!farm) throw new ApiError(404, 'NOT_FOUND', 'Farm not found');
  sendSuccess(res, farm, 'Farm updated');
}

export async function deleteFarm(req: AuthRequest, res: Response): Promise<void> {
  const farm = await Farm.findOneAndDelete({ _id: req.params.id, userId: req.user!._id });
  if (!farm) throw new ApiError(404, 'NOT_FOUND', 'Farm not found');
  sendSuccess(res, null, 'Farm deleted');
}
