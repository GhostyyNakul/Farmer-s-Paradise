import { z } from 'zod';

export const createFarmSchema = z.object({
  name: z.string().min(1).max(100),
  location: z
    .object({
      latitude: z.number().optional(),
      longitude: z.number().optional(),
      address: z.string().optional(),
    })
    .optional(),
  totalArea: z.number().positive().optional(),
  areaUnit: z.string().default('hectares'),
  soilType: z.string().optional(),
  irrigationType: z.string().optional(),
});

export const updateFarmSchema = createFarmSchema.partial();

export const cropRecommendationSchema = z.object({
  farmId: z.string().min(1),
  soilReportId: z.string().optional(),
  season: z.string().optional(),
  location: z
    .object({
      latitude: z.number().optional(),
      longitude: z.number().optional(),
    })
    .optional(),
});

export const nearbyLabsQuerySchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
  radius: z.coerce.number().positive().default(20),
});

export const weatherQuerySchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
});

export const mongoIdParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID'),
});

export const farmIdParamSchema = z.object({
  farmId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid farm ID'),
});
