import { z } from 'zod';
export const designationNameSchema = z.object({
  name: z
    .string()
    .transform((value) => value.trim().replace(/\s+/g, ' ').toLowerCase()),
});

export const DepartmentSchema = z.object({
  name: z
    .string()
    .transform((value) => value.trim().replace(/\s+/g, ' ').toLowerCase()),
});
