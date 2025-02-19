import { z } from 'zod';

// Define allowed data types
export const dataTypeEnum = z.enum(['number', 'text']);

// Define the main Zod schema
export const parameterTemplateSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  dataType: dataTypeEnum.refine((val) => val !== undefined, {
    message: 'Data type is required',
  }),
  unit: z.string().optional().nullable(),
  required: z.boolean().default(true),
  order: z
    .string()
    .min(1, 'Order is required')
    .regex(/^\d+$/, 'Order must be a valid number')
    .transform((val) => Number(val))
    .pipe(z.number().int().min(0, 'Order must be a positive integer')),
});

// Infer TypeScript type from schema
export type ParameterTemplate = z.infer<typeof parameterTemplateSchema>;
