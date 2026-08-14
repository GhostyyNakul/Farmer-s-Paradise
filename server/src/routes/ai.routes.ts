import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validateBody, validateParams } from '../middleware/validate.middleware.js';
import { aiChatSchema, analyzeCropSchema } from '../validators/ai.validators.js';
import { mongoIdParamSchema } from '../validators/common.validators.js';
import { aiRateLimiter } from '../middleware/rateLimit.middleware.js';
import { uploadSingleImage } from '../middleware/upload.middleware.js';
import * as aiController from '../controllers/ai.controller.js';

const router = Router();

router.use(authenticate);
router.post('/chat', aiRateLimiter, validateBody(aiChatSchema), asyncHandler(aiController.chat));
router.post(
  '/analyze-crop',
  aiRateLimiter,
  uploadSingleImage,
  validateBody(analyzeCropSchema),
  asyncHandler(aiController.analyzeCrop)
);
router.get('/consultations', asyncHandler(aiController.listConsultations));
router.get('/consultations/:id', validateParams(mongoIdParamSchema), asyncHandler(aiController.getConsultation));

export default router;
