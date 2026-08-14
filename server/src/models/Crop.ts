import mongoose, { Schema, type Document, type Types } from 'mongoose';

export type CropHealthStatus = 'healthy' | 'attention' | 'critical' | 'harvested';
export type CropStatus = 'planned' | 'growing' | 'harvested' | 'failed';

export interface ICrop {
  userId: Types.ObjectId;
  farmId: Types.ObjectId;
  name: string;
  variety?: string;
  plantingDate?: Date;
  expectedHarvestDate?: Date;
  area?: number;
  status: CropStatus;
  healthStatus: CropHealthStatus;
  notes?: string;
  images: string[];
}

export interface ICropDocument extends ICrop, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const cropSchema = new Schema<ICropDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    farmId: { type: Schema.Types.ObjectId, ref: 'Farm', required: true, index: true },
    name: { type: String, required: true, trim: true },
    variety: String,
    plantingDate: Date,
    expectedHarvestDate: Date,
    area: Number,
    status: {
      type: String,
      enum: ['planned', 'growing', 'harvested', 'failed'],
      default: 'growing',
    },
    healthStatus: {
      type: String,
      enum: ['healthy', 'attention', 'critical', 'harvested'],
      default: 'healthy',
    },
    notes: String,
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Crop = mongoose.model<ICropDocument>('Crop', cropSchema);
