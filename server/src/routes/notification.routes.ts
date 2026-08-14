import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validateParams } from '../middleware/validate.middleware.js';
import { mongoIdParamSchema } from '../validators/common.validators.js';
import * as notificationController from '../controllers/notification.controller.js';

const router = Router();

router.use(authenticate);
router.get('/', asyncHandler(notificationController.listNotifications));
router.patch('/:id/read', validateParams(mongoIdParamSchema), asyncHandler(notificationController.markAsRead));
router.post('/read-all', asyncHandler(notificationController.markAllAsRead));

export default router;
