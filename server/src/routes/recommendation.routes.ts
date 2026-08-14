import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validateBody, validateQuery } from '../middleware/validate.middleware.js';
import { cropRecommendationSchema, weatherQuerySchema } from '../validators/common.validators.js';
import * as recommendationController from '../controllers/recommendation.controller.js';

const router = Router();

router.post('/crops', authenticate, validateBody(cropRecommendationSchema), asyncHandler(recommendationController.getCropRecommendations));

const weatherRouter = Router();
weatherRouter.get('/', validateQuery(weatherQuerySchema), asyncHandler(recommendationController.getWeather));

export { router as recommendationRoutes, weatherRouter };
