import mongoose, { Schema, type Document, type Types } from 'mongoose';

export type SoilSampleStatus =
  | 'created'
  | 'submitted'
  | 'received'
  | 'testing'
  | 'report_ready'
  | 'cancelled';

export interface ISoilSample {
  userId: Types.ObjectId;
  farmId: Types.ObjectId;
  laboratoryId?: Types.ObjectId;
  sampleCode: string;
  collectionDate?: Date;
  submittedDate?: Date;
  status: SoilSampleStatus;
  collectionLocation?: {
    latitude?: number;
    longitude?: number;
    address?: string;
  };
  notes?: string;
  sampleImages: string[];
  expectedReportDate?: Date;
}

export interface ISoilSampleDocument extends ISoilSample, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const collectionLocationSchema = new Schema(
  {
    latitude: Number,
    longitude: Number,
    address: String,
  },
  { _id: false }
);

const soilSampleSchema = new Schema<ISoilSampleDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    farmId: { type: Schema.Types.ObjectId, ref: 'Farm', required: true, index: true },
    laboratoryId: { type: Schema.Types.ObjectId, ref: 'Laboratory' },
    sampleCode: { type: String, required: true, unique: true },
    collectionDate: Date,
    submittedDate: Date,
    status: {
      type: String,
      enum: ['created', 'submitted', 'received', 'testing', 'report_ready', 'cancelled'],
      default: 'created',
    },
    collectionLocation: collectionLocationSchema,
    notes: String,
    sampleImages: { type: [String], default: [] },
    expectedReportDate: Date,
  },
  { timestamps: true }
);

export const SoilSample = mongoose.model<ISoilSampleDocument>('SoilSample', soilSampleSchema);
