import type { Response } from 'express';
import { Crop } from '../models/Crop.js';
import { Farm } from '../models/Farm.js';
import { ApiError } from '../utils/apiError.js';
import { sendSuccess } from '../utils/response.js';
import { notificationService } from '../services/notification.service.js';
import type { AuthRequest } from '../middleware/auth.middleware.js';
import type { CreateCropInput, UpdateCropInput } from '../validators/crop.validators.js';

async function verifyFarmOwnership(userId: string, farmId: string) {
  const farm = await Farm.findOne({ _id: farmId, userId });
  if (!farm) throw new ApiError(404, 'NOT_FOUND', 'Farm not found');
  return farm;
}

export async function listCrops(req: AuthRequest, res: Response): Promise<void> {
  const crops = await Crop.find({ userId: req.user!._id }).sort({ createdAt: -1 });
  sendSuccess(res, crops);
}

export async function createCrop(req: AuthRequest, res: Response): Promise<void> {
  const body = req.body as CreateCropInput;
  await verifyFarmOwnership(req.user!._id.toString(), body.farmId);

  const crop = await Crop.create({ ...body, userId: req.user!._id });
  sendSuccess(res, crop, 'Crop created', 201);
}

export async function getCrop(req: AuthRequest, res: Response): Promise<void> {
  const crop = await Crop.findOne({ _id: req.params.id, userId: req.user!._id });
  if (!crop) throw new ApiError(404, 'NOT_FOUND', 'Crop not found');
  sendSuccess(res, crop);
}

export async function updateCrop(req: AuthRequest, res: Response): Promise<void> {
  const body = req.body as UpdateCropInput;
  const crop = await Crop.findOneAndUpdate(
    { _id: req.params.id, userId: req.user!._id },
    body,
    { new: true, runValidators: true }
  );
  if (!crop) throw new ApiError(404, 'NOT_FOUND', 'Crop not found');
  sendSuccess(res, crop, 'Crop updated');
}

export async function deleteCrop(req: AuthRequest, res: Response): Promise<void> {
  const crop = await Crop.findOneAndDelete({ _id: req.params.id, userId: req.user!._id });
  if (!crop) throw new ApiError(404, 'NOT_FOUND', 'Crop not found');
  sendSuccess(res, null, 'Crop deleted');
}

export async function listFarmCrops(req: AuthRequest, res: Response): Promise<void> {
  await verifyFarmOwnership(req.user!._id.toString(), req.params.farmId);
  const crops = await Crop.find({ farmId: req.params.farmId, userId: req.user!._id });
  sendSuccess(res, crops);
}

export async function updateCropHealth(req: AuthRequest, res: Response): Promise<void> {
  const { healthStatus, notes } = req.body as { healthStatus: string; notes?: string };
  const crop = await Crop.findOne({ _id: req.params.id, userId: req.user!._id });
  if (!crop) throw new ApiError(404, 'NOT_FOUND', 'Crop not found');

  crop.healthStatus = healthStatus as typeof crop.healthStatus;
  if (notes) crop.notes = notes;
  await crop.save();

  if (healthStatus === 'attention' || healthStatus === 'critical') {
    await notificationService.notifyCropHealthWarning(
      req.user!._id.toString(),
      crop.name,
      crop._id.toString()
    );
  }

  sendSuccess(res, crop, 'Crop health updated');
}
