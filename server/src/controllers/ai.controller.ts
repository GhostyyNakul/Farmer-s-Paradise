import type { Response } from 'express';
import { AIConsultation } from '../models/AIConsultation.js';
import { Crop } from '../models/Crop.js';
import { Farm } from '../models/Farm.js';
import { SoilReport } from '../models/SoilReport.js';
import { ApiError } from '../utils/apiError.js';
import { sendSuccess } from '../utils/response.js';
import { aiService } from '../services/ai.service.js';
import { imageService } from '../services/image.service.js';
import { notificationService } from '../services/notification.service.js';
import type { AuthRequest } from '../middleware/auth.middleware.js';
import type { AiChatInput } from '../validators/ai.validators.js';

export async function chat(req: AuthRequest, res: Response): Promise<void> {
  const body = req.body as AiChatInput;
  const userId = req.user!._id;

  let crop;
  let farm;
  let consultation;

  if (body.consultationId) {
    consultation = await AIConsultation.findOne({ _id: body.consultationId, userId });
    if (!consultation) throw new ApiError(404, 'NOT_FOUND', 'Consultation not found');
  }

  if (body.cropId) {
    crop = await Crop.findOne({ _id: body.cropId, userId });
    if (!crop) throw new ApiError(404, 'NOT_FOUND', 'Crop not found');
  }

  if (body.farmId) {
    farm = await Farm.findOne({ _id: body.farmId, userId });
    if (!farm) throw new ApiError(404, 'NOT_FOUND', 'Farm not found');
  }

  let soilInfo = '';
  if (farm) {
    const report = await SoilReport.findOne({ userId }).sort({ createdAt: -1 });
    if (report) {
      soilInfo = `pH: ${report.pH}, N: ${report.nitrogen}, P: ${report.phosphorus}, K: ${report.potassium}`;
    }
  }

  const previousMessages = consultation?.messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const aiResponse = await aiService.chat({
    userMessage: body.message,
    cropName: crop?.name,
    cropVariety: crop?.variety,
    farmLocation: farm?.location?.address,
    soilInfo: soilInfo || undefined,
    previousMessages,
  });

  const messages = consultation?.messages ?? [];
  messages.push({ role: 'user', content: body.message, timestamp: new Date() });
  messages.push({
    role: 'assistant',
    content: aiResponse.summary,
    timestamp: new Date(),
  });

  if (consultation) {
    consultation.messages = messages;
    consultation.diagnosis = aiResponse;
    consultation.recommendations = aiResponse.recommendedActions;
    await consultation.save();
  } else {
    consultation = await AIConsultation.create({
      userId,
      farmId: farm?._id,
      cropId: crop?._id,
      messages,
      diagnosis: aiResponse,
      recommendations: aiResponse.recommendedActions,
    });
  }

  sendSuccess(res, { consultationId: consultation._id, ...aiResponse }, 'AI response generated');
}

export async function analyzeCrop(req: AuthRequest, res: Response): Promise<void> {
  const { cropId } = req.body as { cropId: string };
  const crop = await Crop.findOne({ _id: cropId, userId: req.user!._id });
  if (!crop) throw new ApiError(404, 'NOT_FOUND', 'Crop not found');

  if (!req.file) {
    throw new ApiError(400, 'VALIDATION_ERROR', 'Image file is required');
  }

  const uploadResult = await imageService.upload(req.file.path);
  crop.images.push(uploadResult.url);
  await crop.save();

  const analysis = await aiService.analyzeCropImage(req.file.path, crop.name, crop.variety);

  await AIConsultation.create({
    userId: req.user!._id,
    cropId: crop._id,
    messages: [
      { role: 'user', content: 'Crop image analysis requested', timestamp: new Date() },
      {
        role: 'assistant',
        content: analysis.possibleIssues.join('; '),
        timestamp: new Date(),
      },
    ],
    images: [uploadResult.url],
    diagnosis: analysis,
  });

  await notificationService.notifyAiAnalysisCompleted(req.user!._id.toString(), crop.name);

  sendSuccess(res, analysis, 'Crop image analyzed');
}

export async function listConsultations(req: AuthRequest, res: Response): Promise<void> {
  const consultations = await AIConsultation.find({ userId: req.user!._id })
    .sort({ createdAt: -1 })
    .limit(50);
  sendSuccess(res, consultations);
}

export async function getConsultation(req: AuthRequest, res: Response): Promise<void> {
  const consultation = await AIConsultation.findOne({
    _id: req.params.id,
    userId: req.user!._id,
  });
  if (!consultation) throw new ApiError(404, 'NOT_FOUND', 'Consultation not found');
  sendSuccess(res, consultation);
}
