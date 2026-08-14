import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validateBody, validateParams } from '../middleware/validate.middleware.js';
import {
  createCropSchema,
  updateCropSchema,
  updateCropHealthSchema,
} from '../validators/crop.validators.js';
import { mongoIdParamSchema, farmIdParamSchema } from '../validators/common.validators.js';
import * as cropController from '../controllers/crop.controller.js';

const router = Router();

router.use(authenticate);
router.get('/', asyncHandler(cropController.listCrops));
router.post('/', validateBody(createCropSchema), asyncHandler(cropController.createCrop));
router.get('/:id', validateParams(mongoIdParamSchema), asyncHandler(cropController.getCrop));
router.patch('/:id', validateParams(mongoIdParamSchema), validateBody(updateCropSchema), asyncHandler(cropController.updateCrop));
router.delete('/:id', validateParams(mongoIdParamSchema), asyncHandler(cropController.deleteCrop));
router.patch('/:id/health', validateParams(mongoIdParamSchema), validateBody(updateCropHealthSchema), asyncHandler(cropController.updateCropHealth));

export { router as cropRoutes };

const farmCropRouter = Router({ mergeParams: true });
farmCropRouter.use(authenticate);
farmCropRouter.get('/', validateParams(farmIdParamSchema), asyncHandler(cropController.listFarmCrops));

export { farmCropRouter };
