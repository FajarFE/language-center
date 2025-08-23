import * as z from 'zod';

export const Response = z.object({
  status: z.string(),
  message: z.union([z.string(), z.array(z.string())]),
  data: z.any().optional(),
});

export type Response = z.infer<typeof Response>;
