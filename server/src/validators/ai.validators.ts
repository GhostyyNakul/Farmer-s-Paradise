import { z } from 'zod';

export const aiChatSchema = z.object({
  message: z.string().min(1).max(4000),
  cropId: z.string().optional(),
  farmId: z.string().optional(),
  consultationId: z.string().optional(),
});

export const analyzeCropSchema = z.object({
  cropId: z.string().min(1),
});

export type AiChatInput = z.infer<typeof aiChatSchema>;
