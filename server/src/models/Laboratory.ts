import mongoose, { Schema, type Document, type Types } from 'mongoose';

export interface ILaboratory {
  name: string;
  description?: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  services: string[];
  pricing?: string;
  averageTurnaround?: string;
  rating: number;
  isVerified: boolean;
  operatingHours?: string;
}

export interface ILaboratoryDocument extends ILaboratory, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const laboratorySchema = new Schema<ILaboratoryDocument>(
  {
    name: { type: String, required: true, trim: true },
    description: String,
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    phone: String,
    email: String,
    services: { type: [String], default: [] },
    pricing: String,
    averageTurnaround: String,
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    isVerified: { type: Boolean, default: false },
    operatingHours: String,
  },
  { timestamps: true }
);

laboratorySchema.index({ latitude: 1, longitude: 1 });

export const Laboratory = mongoose.model<ILaboratoryDocument>('Laboratory', laboratorySchema);
