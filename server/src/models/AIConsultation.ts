import mongoose, { Schema, type Document, type Types } from 'mongoose';

export type MessageRole = 'user' | 'assistant' | 'system';

export interface IConsultationMessage {
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface IAIConsultation {
  userId: Types.ObjectId;
  farmId?: Types.ObjectId;
  cropId?: Types.ObjectId;
  messages: IConsultationMessage[];
  images: string[];
  diagnosis?: Record<string, unknown>;
  recommendations?: string[];
}

export interface IAIConsultationDocument extends IAIConsultation, Document {
  _id: Types.ObjectId;
  createdAt: Date;
}

const messageSchema = new Schema<IConsultationMessage>(
  {
    role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const aiConsultationSchema = new Schema<IAIConsultationDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    farmId: { type: Schema.Types.ObjectId, ref: 'Farm' },
    cropId: { type: Schema.Types.ObjectId, ref: 'Crop' },
    messages: { type: [messageSchema], default: [] },
    images: { type: [String], default: [] },
    diagnosis: Schema.Types.Mixed,
    recommendations: [String],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const AIConsultation = mongoose.model<IAIConsultationDocument>(
  'AIConsultation',
  aiConsultationSchema
);
