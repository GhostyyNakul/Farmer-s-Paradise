import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validateBody, validateParams } from '../middleware/validate.middleware.js';
import { createSoilSampleSchema, updateSoilSampleSchema } from '../validators/soil.validators.js';
import { mongoIdParamSchema } from '../validators/common.validators.js';
import * as soilController from '../controllers/soil.controller.js';

const router = Router();

router.use(authenticate);
router.post('/samples', validateBody(createSoilSampleSchema), asyncHandler(soilController.createSample));
router.get('/samples', asyncHandler(soilController.listSamples));
router.get('/samples/:id', validateParams(mongoIdParamSchema), asyncHandler(soilController.getSample));
router.patch('/samples/:id', validateParams(mongoIdParamSchema), validateBody(updateSoilSampleSchema), asyncHandler(soilController.updateSample));

export default router;
