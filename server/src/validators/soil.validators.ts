import { z } from 'zod';

export const createSoilSampleSchema = z.object({
  farmId: z.string().min(1),
  laboratoryId: z.string().optional(),
  collectionDate: z.coerce.date().optional(),
  submittedDate: z.coerce.date().optional(),
  status: z
    .enum(['created', 'submitted', 'received', 'testing', 'report_ready', 'cancelled'])
    .optional(),
  collectionLocation: z
    .object({
      latitude: z.number().optional(),
      longitude: z.number().optional(),
      address: z.string().optional(),
    })
    .optional(),
  notes: z.string().optional(),
  sampleImages: z.array(z.string()).optional(),
});

export const updateSoilSampleSchema = createSoilSampleSchema.partial();

export type CreateSoilSampleInput = z.infer<typeof createSoilSampleSchema>;
