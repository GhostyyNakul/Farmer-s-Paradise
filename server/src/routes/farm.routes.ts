import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validateBody, validateParams } from '../middleware/validate.middleware.js';
import { createFarmSchema, updateFarmSchema, mongoIdParamSchema } from '../validators/common.validators.js';
import * as farmController from '../controllers/farm.controller.js';

const router = Router();

router.use(authenticate);
router.get('/', asyncHandler(farmController.listFarms));
router.post('/', validateBody(createFarmSchema), asyncHandler(farmController.createFarm));
router.get('/:id', validateParams(mongoIdParamSchema), asyncHandler(farmController.getFarm));
router.patch('/:id', validateParams(mongoIdParamSchema), validateBody(updateFarmSchema), asyncHandler(farmController.updateFarm));
router.delete('/:id', validateParams(mongoIdParamSchema), asyncHandler(farmController.deleteFarm));

export default router;
