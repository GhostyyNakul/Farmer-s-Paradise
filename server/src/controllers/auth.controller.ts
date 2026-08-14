import bcrypt from 'bcryptjs';
import type { Response } from 'express';
import { User, toPublicUser } from '../models/User.js';
import { ApiError } from '../utils/apiError.js';
import { sendSuccess } from '../utils/response.js';
import {
  authenticate,
  clearAuthCookies,
  setAuthCookies,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  type AuthRequest,
} from '../middleware/auth.middleware.js';
import type { RegisterInput, LoginInput } from '../validators/auth.validators.js';

export async function register(req: AuthRequest, res: Response): Promise<void> {
  const body = req.body as RegisterInput;
  const existing = await User.findOne({ email: body.email });
  if (existing) {
    throw new ApiError(409, 'EMAIL_EXISTS', 'Email already registered');
  }

  const passwordHash = await bcrypt.hash(body.password, 12);
  const user = await User.create({
    name: body.name,
    email: body.email,
    passwordHash,
    phone: body.phone,
    language: body.language,
    location: body.location,
  });

  const accessToken = signAccessToken(user._id.toString());
  const refreshToken = signRefreshToken(user._id.toString());
  setAuthCookies(res, accessToken, refreshToken);

  sendSuccess(
    res,
    { user: toPublicUser(user), accessToken },
    'Registration successful',
    201
  );
}

export async function login(req: AuthRequest, res: Response): Promise<void> {
  const body = req.body as LoginInput;
  const user = await User.findOne({ email: body.email }).select('+passwordHash');
  if (!user) {
    throw new ApiError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
  }

  const valid = await bcrypt.compare(body.password, user.passwordHash);
  if (!valid) {
    throw new ApiError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
  }

  const accessToken = signAccessToken(user._id.toString());
  const refreshToken = signRefreshToken(user._id.toString());
  setAuthCookies(res, accessToken, refreshToken);

  user.passwordHash = '';
  sendSuccess(res, { user: toPublicUser(user), accessToken }, 'Login successful');
}

export async function logout(_req: AuthRequest, res: Response): Promise<void> {
  clearAuthCookies(res);
  sendSuccess(res, null, 'Logged out successfully');
}

export async function me(req: AuthRequest, res: Response): Promise<void> {
  if (!req.user) throw new ApiError(401, 'UNAUTHORIZED', 'Not authenticated');
  sendSuccess(res, toPublicUser(req.user), 'User profile retrieved');
}

export async function refresh(req: AuthRequest, res: Response): Promise<void> {
  const token = req.cookies?.refreshToken as string | undefined;
  if (!token) {
    throw new ApiError(401, 'UNAUTHORIZED', 'Refresh token required');
  }

  const payload = verifyRefreshToken(token);
  const user = await User.findById(payload.userId);
  if (!user) {
    throw new ApiError(401, 'UNAUTHORIZED', 'User not found');
  }

  const accessToken = signAccessToken(user._id.toString());
  const refreshToken = signRefreshToken(user._id.toString());
  setAuthCookies(res, accessToken, refreshToken);

  sendSuccess(res, { accessToken }, 'Token refreshed');
}

export { authenticate };
