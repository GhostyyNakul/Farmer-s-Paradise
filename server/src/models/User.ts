import mongoose, { Schema, type Document, type Types } from 'mongoose';

export interface ILocation {
  latitude?: number;
  longitude?: number;
  address?: string;
  district?: string;
  state?: string;
  country?: string;
}

export interface IUser {
  name: string;
  phone?: string;
  email: string;
  passwordHash: string;
  profileImage?: string;
  language: string;
  location?: ILocation;
}

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const locationSchema = new Schema<ILocation>(
  {
    latitude: Number,
    longitude: Number,
    address: String,
    district: String,
    state: String,
    country: String,
  },
  { _id: false }
);

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    profileImage: String,
    language: { type: String, default: 'en' },
    location: locationSchema,
  },
  { timestamps: true }
);

export const User = mongoose.model<IUserDocument>('User', userSchema);

export function toPublicUser(user: IUserDocument) {
  return {
    id: user._id.toString(),
    name: user.name,
    phone: user.phone,
    email: user.email,
    profileImage: user.profileImage,
    language: user.language,
    location: user.location,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
