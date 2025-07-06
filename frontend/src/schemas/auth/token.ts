import { z } from 'zod';

export const tokenResponseSchema = z.object({
  access: z.string().min(10),
  refresh: z.string().min(10),
});

export type TokenResponse = z.infer<typeof tokenResponseSchema>;
