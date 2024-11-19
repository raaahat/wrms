import { Mode, WrType } from '@prisma/client';
import { z } from 'zod';

export type CreateWRFormSchemaType = z.infer<typeof CreateWRFormSchema>;
export const CreateWRFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .transform((value) => value.trim().replace(/\s+/g, ' ').toLowerCase()),
  areaId: z.string().min(1, 'Area is required'),
  runningHour: z.number().optional(),
  creatorId: z.string().min(1, 'Creator is required'),
  mode: z.nativeEnum(Mode),
  type: z.nativeEnum(WrType),
  remarks: z
    .string()
    .transform((value) => value.trim().replace(/\s+/g, ' ').toLowerCase())
    .optional(),
});

export type WRdataType = {
  wrNo: string;
  title: string;
  area: {
    id: string;
    name: string;
    parent?: {
      id: string;
      name: string;
      parent: null;
    };
  };
  creator: {
    name: string;
    designation: {
      title: string;
      department: {
        name: string;
      };
    };
  };
};
