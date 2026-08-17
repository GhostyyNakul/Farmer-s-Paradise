import type { Response } from 'express';
import { toPublicUser } from '../models/User.js';
import { ApiError } from '../utils/apiError.js';
import { sendSuccess } from '../utils/response.js';
import type { AuthRequest } from '../middleware/auth.middleware.js';

export async function updateProfile(req: AuthRequest, res: Response): Promise<void> {
  if (!req.user) throw new ApiError(401, 'UNAUTHORIZED', 'Not authenticated');

  const allowed = ['name', 'phone', 'profileImage', 'language', 'location'] as const;
  for (const key of allowed) {
    if (req.body[key] !== undefined) {
      (req.user as unknown as Record<string, unknown>)[key] = req.body[key];
    }
  }

  await req.user.save();
  sendSuccess(res, toPublicUser(req.user), 'Profile updated');
}

export async function getProfile(req: AuthRequest, res: Response): Promise<void> {
  if (!req.user) throw new ApiError(401, 'UNAUTHORIZED', 'Not authenticated');
  sendSuccess(res, toPublicUser(req.user), 'Profile retrieved');
}
