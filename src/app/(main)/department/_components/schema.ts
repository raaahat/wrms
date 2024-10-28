import { z } from 'zod';
export const designationNameSchema = z.object({
  name: z
    .string()
    .transform((value) => value.trim().replace(/\s+/g, ' ').toLowerCase()),
});
