import { z } from 'zod';

export const registerResponseSchema = z.object({
  message: z.string(),
  user: z.object({
    username: z.string(),
    email: z.string().email(),
  }),
});

export type RegisterResponse = z.infer<typeof registerResponseSchema>;
