import dotenv from 'dotenv';
import { z } from 'zod';
import path from 'path';

const result = dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

console.log('DOTENV:', result.error ? result.error.message : 'loaded');
console.log('ENV CHECK:', {
  mongodb: !!process.env.MONGODB_URI,
  gemini: !!process.env.GEMINI_API_KEY,
  weather: !!process.env.WEATHER_API_KEY,
});

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  MONGODB_URI: z.string().default('mongodb://127.0.0.1:27017/farmers-paradise'),
  JWT_SECRET: z.string().min(16).default('dev-access-secret-change-in-production'),
  JWT_REFRESH_SECRET: z.string().min(16).default('dev-refresh-secret-change-in-production'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  GEMINI_API_KEY: z.string().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  CLIENT_URL: z.string().default('http://localhost:3000'),
  WEATHER_API_KEY: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment configuration:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
