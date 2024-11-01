import { z } from 'zod';
export const CreateDesignationSchema = z.object({
  title: z
    .string()
    .transform((value) => value.trim().replace(/\s+/g, ' ').toLowerCase()),
  shortTitle: z
    .string()
    .transform((value) => value.trim().replace(/\s+/g, ' ')),
});

export const DepartmentSchema = z.object({
  name: z
    .string()
    .transform((value) => value.trim().replace(/\s+/g, ' ').toLowerCase()),
  shortName: z.string().transform((value) => value.trim().replace(/\s+/g, ' ')),
});
