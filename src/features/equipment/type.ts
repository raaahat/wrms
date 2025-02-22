import { z } from 'zod';

// Define the main Zod schema

export const specificationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  dataType: z.enum(['text', 'number']),
  unit: z.string().optional(),
  required: z.boolean().optional(),
});

export const formSchema = z.object({
  category: z.string().min(1, 'Category name is required'),
  specifications: z.array(specificationSchema),
});
export type SpecificationFormData = z.infer<typeof specificationSchema>;
export type FormData = z.infer<typeof formSchema>;
