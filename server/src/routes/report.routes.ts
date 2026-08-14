import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validateParams } from '../middleware/validate.middleware.js';
import { mongoIdParamSchema } from '../validators/common.validators.js';
import * as reportController from '../controllers/report.controller.js';

const router = Router();

router.use(authenticate);
router.get('/', asyncHandler(reportController.listReports));
router.get('/:id', validateParams(mongoIdParamSchema), asyncHandler(reportController.getReport));

export default router;
