import type { NotificationType } from '../models/Notification.js';
import { Notification } from '../models/Notification.js';
import { logger } from '../utils/logger.js';

export interface NotificationPayload {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  metadata?: Record<string, unknown>;
}

export interface NotificationProvider {
  send(payload: NotificationPayload): Promise<void>;
}

class ConsoleNotificationProvider implements NotificationProvider {
  async send(payload: NotificationPayload): Promise<void> {
    logger.info(`[Notification] ${payload.type}: ${payload.title} — ${payload.message}`);
  }
}

class NotificationService {
  private provider: NotificationProvider = new ConsoleNotificationProvider();

  setProvider(provider: NotificationProvider): void {
    this.provider = provider;
  }

  async create(payload: NotificationPayload) {
    const notification = await Notification.create({
      userId: payload.userId,
      type: payload.type,
      title: payload.title,
      message: payload.message,
      metadata: payload.metadata,
    });

    await this.provider.send(payload);
    return notification;
  }

  async notifySoilSampleReceived(userId: string, sampleCode: string) {
    return this.create({
      userId,
      type: 'soil_sample_received',
      title: 'Soil Sample Received',
      message: `Your soil sample ${sampleCode} has been received by the laboratory.`,
      metadata: { sampleCode },
    });
  }

  async notifySoilTestingStarted(userId: string, sampleCode: string) {
    return this.create({
      userId,
      type: 'soil_testing_started',
      title: 'Soil Testing In Progress',
      message: `Analysis has started for sample ${sampleCode}.`,
      metadata: { sampleCode },
    });
  }

  async notifyReportReady(userId: string, sampleCode: string, reportId: string) {
    return this.create({
      userId,
      type: 'report_ready',
      title: 'Soil Report Ready',
      message: `Your soil report for sample ${sampleCode} is now available.`,
      metadata: { sampleCode, reportId },
    });
  }

  async notifyCropHealthWarning(userId: string, cropName: string, cropId: string) {
    return this.create({
      userId,
      type: 'crop_health_warning',
      title: 'Crop Health Alert',
      message: `${cropName} requires attention. Review health status and recommendations.`,
      metadata: { cropId },
    });
  }

  async notifyAiAnalysisCompleted(userId: string, cropName: string) {
    return this.create({
      userId,
      type: 'ai_analysis_completed',
      title: 'AI Analysis Complete',
      message: `Image analysis for ${cropName} is ready to review.`,
      metadata: { cropName },
    });
  }
}

export const notificationService = new NotificationService();
