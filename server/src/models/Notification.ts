import mongoose, { Schema, type Document, type Types } from 'mongoose';

export type NotificationType =
  | 'soil_sample_received'
  | 'soil_testing_started'
  | 'report_ready'
  | 'crop_health_warning'
  | 'ai_analysis_completed'
  | 'general';

export interface INotification {
  userId: Types.ObjectId;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  metadata?: Record<string, unknown>;
}

export interface INotificationDocument extends INotification, Document {
  _id: Types.ObjectId;
  createdAt: Date;
}

const notificationSchema = new Schema<INotificationDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: {
      type: String,
      enum: [
        'soil_sample_received',
        'soil_testing_started',
        'report_ready',
        'crop_health_warning',
        'ai_analysis_completed',
        'general',
      ],
      default: 'general',
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    metadata: Schema.Types.Mixed,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Notification = mongoose.model<INotificationDocument>('Notification', notificationSchema);
