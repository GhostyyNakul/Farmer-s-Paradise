import type { Response } from 'express';
import { SoilSample } from '../models/SoilSample.js';
import { Farm } from '../models/Farm.js';
import { Laboratory } from '../models/Laboratory.js';
import { ApiError } from '../utils/apiError.js';
import { sendSuccess } from '../utils/response.js';
import {
  generateSampleCode,
  getSampleProgress,
  estimateReportDate,
} from '../services/soil.service.js';
import { notificationService } from '../services/notification.service.js';
import type { AuthRequest } from '../middleware/auth.middleware.js';
import type { CreateSoilSampleInput } from '../validators/soil.validators.js';

async function verifyFarm(userId: string, farmId: string) {
  const farm = await Farm.findOne({ _id: farmId, userId });
  if (!farm) throw new ApiError(404, 'NOT_FOUND', 'Farm not found');
  return farm;
}

function formatSample(sample: typeof SoilSample.prototype) {
  return {
    ...sample.toObject(),
    progress: getSampleProgress(sample.status),
  };
}

export async function createSample(req: AuthRequest, res: Response): Promise<void> {
  const body = req.body as CreateSoilSampleInput;
  await verifyFarm(req.user!._id.toString(), body.farmId);

  if (body.laboratoryId) {
    const lab = await Laboratory.findById(body.laboratoryId);
    if (!lab) throw new ApiError(404, 'NOT_FOUND', 'Laboratory not found');
  }

  const sampleCode = await generateSampleCode();
  const submittedDate = body.submittedDate ?? new Date();

  const sample = await SoilSample.create({
    ...body,
    userId: req.user!._id,
    sampleCode,
    submittedDate,
    status: body.status ?? 'submitted',
    expectedReportDate: estimateReportDate(submittedDate),
  });

  if (sample.status === 'submitted') {
    await notificationService.notifySoilSampleReceived(
      req.user!._id.toString(),
      sample.sampleCode
    );
  }

  sendSuccess(res, formatSample(sample), 'Soil sample created', 201);
}

export async function listSamples(req: AuthRequest, res: Response): Promise<void> {
  const samples = await SoilSample.find({ userId: req.user!._id })
    .populate('laboratoryId', 'name address averageTurnaround')
    .sort({ createdAt: -1 });
  sendSuccess(res, samples.map(formatSample));
}

export async function getSample(req: AuthRequest, res: Response): Promise<void> {
  const sample = await SoilSample.findOne({
    _id: req.params.id,
    userId: req.user!._id,
  }).populate('laboratoryId', 'name address averageTurnaround phone email');

  if (!sample) throw new ApiError(404, 'NOT_FOUND', 'Soil sample not found');
  sendSuccess(res, formatSample(sample));
}

export async function updateSample(req: AuthRequest, res: Response): Promise<void> {
  const sample = await SoilSample.findOne({ _id: req.params.id, userId: req.user!._id });
  if (!sample) throw new ApiError(404, 'NOT_FOUND', 'Soil sample not found');

  const previousStatus = sample.status;
  Object.assign(sample, req.body);
  await sample.save();

  if (previousStatus !== 'received' && sample.status === 'received') {
    await notificationService.notifySoilSampleReceived(
      req.user!._id.toString(),
      sample.sampleCode
    );
  }
  if (previousStatus !== 'testing' && sample.status === 'testing') {
    await notificationService.notifySoilTestingStarted(
      req.user!._id.toString(),
      sample.sampleCode
    );
  }

  sendSuccess(res, formatSample(sample), 'Soil sample updated');
}
