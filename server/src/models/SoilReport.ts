import mongoose, { Schema, type Document, type Types } from 'mongoose';

export interface IMicronutrients {
  zinc?: number;
  iron?: number;
  manganese?: number;
  copper?: number;
  boron?: number;
}

export interface ISoilReport {
  soilSampleId: Types.ObjectId;
  laboratoryId?: Types.ObjectId;
  userId: Types.ObjectId;
  pH?: number;
  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
  organicCarbon?: number;
  electricalConductivity?: number;
  moisture?: number;
  micronutrients?: IMicronutrients;
  interpretation?: string;
  recommendations?: string[];
  suitableCrops?: string[];
  reportFileUrl?: string;
  summary?: {
    soilHealthSummary?: string;
    deficiencies?: string[];
    recommendations?: string[];
    suitableCrops?: string[];
  };
}

export interface ISoilReportDocument extends ISoilReport, Document {
  _id: Types.ObjectId;
  createdAt: Date;
}

const micronutrientsSchema = new Schema<IMicronutrients>(
  {
    zinc: Number,
    iron: Number,
    manganese: Number,
    copper: Number,
    boron: Number,
  },
  { _id: false }
);

const summarySchema = new Schema(
  {
    soilHealthSummary: String,
    deficiencies: [String],
    recommendations: [String],
    suitableCrops: [String],
  },
  { _id: false }
);

const soilReportSchema = new Schema<ISoilReportDocument>(
  {
    soilSampleId: { type: Schema.Types.ObjectId, ref: 'SoilSample', required: true, unique: true },
    laboratoryId: { type: Schema.Types.ObjectId, ref: 'Laboratory' },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    pH: Number,
    nitrogen: Number,
    phosphorus: Number,
    potassium: Number,
    organicCarbon: Number,
    electricalConductivity: Number,
    moisture: Number,
    micronutrients: micronutrientsSchema,
    interpretation: String,
    recommendations: [String],
    suitableCrops: [String],
    reportFileUrl: String,
    summary: summarySchema,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const SoilReport = mongoose.model<ISoilReportDocument>('SoilReport', soilReportSchema);
