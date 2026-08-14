import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { authenticate } from '../middleware/auth.middleware.js';
import * as userController from '../controllers/user.controller.js';

const router = Router();

router.use(authenticate);
router.get('/profile', asyncHandler(userController.getProfile));
router.patch('/profile', asyncHandler(userController.updateProfile));

export default router;
