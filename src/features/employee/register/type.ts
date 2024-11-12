import { z } from 'zod';

export const RegisterEmployeeSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .transform((value) => value.trim().replace(/\s+/g, ' ').toLowerCase()),
  departmentId: z.string().min(1, 'Department is required'),
  designationId: z.string().min(1, 'Designation is required'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, "Phone number can't exceed 15 digits")
    .regex(/^\d+$/, 'Phone number must contain only numbers'),
});

export type DeptWithDesig = {
  id: string;
  name: string;
  shortName: string;
  designations: {
    id: string;
    title: string;
    shortTitle: string;
    departmentId: string;
  }[];
}[];
