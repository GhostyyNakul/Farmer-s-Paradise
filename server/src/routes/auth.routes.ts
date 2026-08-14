import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validateBody } from '../middleware/validate.middleware.js';
import { authRateLimiter } from '../middleware/rateLimit.middleware.js';
import { registerSchema, loginSchema } from '../validators/auth.validators.js';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', authRateLimiter, validateBody(registerSchema), asyncHandler(authController.register));
router.post('/login', authRateLimiter, validateBody(loginSchema), asyncHandler(authController.login));
router.post('/logout', asyncHandler(authController.logout));
router.get('/me', asyncHandler(authController.authenticate), asyncHandler(authController.me));
router.post('/refresh', asyncHandler(authController.refresh));

export default router;
