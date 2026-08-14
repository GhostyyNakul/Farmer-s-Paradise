import { z } from 'zod';

export const createCropSchema = z.object({
  farmId: z.string().min(1),
  name: z.string().min(1).max(100),
  variety: z.string().optional(),
  plantingDate: z.coerce.date().optional(),
  expectedHarvestDate: z.coerce.date().optional(),
  area: z.number().positive().optional(),
  status: z.enum(['planned', 'growing', 'harvested', 'failed']).optional(),
  healthStatus: z.enum(['healthy', 'attention', 'critical', 'harvested']).optional(),
  notes: z.string().optional(),
  images: z.array(z.string()).optional(),
});

export const updateCropSchema = createCropSchema.partial().omit({ farmId: true });

export const updateCropHealthSchema = z.object({
  healthStatus: z.enum(['healthy', 'attention', 'critical', 'harvested']),
  notes: z.string().optional(),
});

export type CreateCropInput = z.infer<typeof createCropSchema>;
export type UpdateCropInput = z.infer<typeof updateCropSchema>;
