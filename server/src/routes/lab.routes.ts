import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validateQuery, validateParams } from '../middleware/validate.middleware.js';
import { nearbyLabsQuerySchema, mongoIdParamSchema } from '../validators/common.validators.js';
import * as labController from '../controllers/lab.controller.js';

const router = Router();

router.get('/nearby', validateQuery(nearbyLabsQuerySchema), asyncHandler(labController.getNearbyLabs));
router.get('/', asyncHandler(labController.listLabs));
router.get('/:id', validateParams(mongoIdParamSchema), asyncHandler(labController.getLab));

export default router;
