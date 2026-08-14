import mongoose, { Schema, type Document, type Types } from 'mongoose';

export interface IFarmLocation {
  latitude?: number;
  longitude?: number;
  address?: string;
}

export interface IFarm {
  userId: Types.ObjectId;
  name: string;
  location?: IFarmLocation;
  totalArea?: number;
  areaUnit: string;
  soilType?: string;
  irrigationType?: string;
}

export interface IFarmDocument extends IFarm, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const farmLocationSchema = new Schema<IFarmLocation>(
  {
    latitude: Number,
    longitude: Number,
    address: String,
  },
  { _id: false }
);

const farmSchema = new Schema<IFarmDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true },
    location: farmLocationSchema,
    totalArea: Number,
    areaUnit: { type: String, default: 'hectares' },
    soilType: String,
    irrigationType: String,
  },
  { timestamps: true }
);

export const Farm = mongoose.model<IFarmDocument>('Farm', farmSchema);
