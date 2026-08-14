import type { Response } from 'express';
import { Notification } from '../models/Notification.js';
import { ApiError } from '../utils/apiError.js';
import { sendSuccess } from '../utils/response.js';
import type { AuthRequest } from '../middleware/auth.middleware.js';

export async function listNotifications(req: AuthRequest, res: Response): Promise<void> {
  const notifications = await Notification.find({ userId: req.user!._id })
    .sort({ createdAt: -1 })
    .limit(100);
  sendSuccess(res, notifications);
}

export async function markAsRead(req: AuthRequest, res: Response): Promise<void> {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, userId: req.user!._id },
    { read: true },
    { new: true }
  );
  if (!notification) throw new ApiError(404, 'NOT_FOUND', 'Notification not found');
  sendSuccess(res, notification, 'Notification marked as read');
}

export async function markAllAsRead(req: AuthRequest, res: Response): Promise<void> {
  await Notification.updateMany({ userId: req.user!._id, read: false }, { read: true });
  sendSuccess(res, null, 'All notifications marked as read');
}
