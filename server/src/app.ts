import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import { env } from './config/env.js';
import { generalRateLimiter } from './middleware/rateLimit.middleware.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import farmRoutes from './routes/farm.routes.js';
import { cropRoutes, farmCropRouter } from './routes/crop.routes.js';
import aiRoutes from './routes/ai.routes.js';
import soilRoutes from './routes/soil.routes.js';
import labRoutes from './routes/lab.routes.js';
import reportRoutes from './routes/report.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import { recommendationRoutes, weatherRouter } from './routes/recommendation.routes.js';

export function createApp() {
  const app = express();

  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.use(
    cors({
      origin: env.CLIENT_URL,
      credentials: true,
    })
  );
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(generalRateLimiter);

  app.use('/uploads', express.static(path.resolve('uploads')));

  app.get('/api/health', (_req, res) => {
    res.json({ success: true, data: { status: 'ok', timestamp: new Date().toISOString() } });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/farms', farmRoutes);
  app.use('/api/farms/:farmId/crops', farmCropRouter);
  app.use('/api/crops', cropRoutes);
  app.use('/api/ai', aiRoutes);
  app.use('/api/soil', soilRoutes);
  app.use('/api/labs', labRoutes);
  app.use('/api/reports', reportRoutes);
  app.use('/api/notifications', notificationRoutes);
  app.use('/api/recommendations', recommendationRoutes);
  app.use('/api/weather', weatherRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
