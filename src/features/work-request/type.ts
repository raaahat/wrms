import { Mode, WrType } from '@prisma/client';
import { z } from 'zod';

export const CreateWRFormSchema = z.object({
  title: z
    .string()
    .transform((value) => value.trim().replace(/\s+/g, ' ').toLowerCase()),
  areaId: z.string(), //will be a combobox, which i will work on later
  runningHour: z.number().optional(), //user can left it empty
  creatorId: z.string(), //will be a combobox, which i will work on later
  mode: z.nativeEnum(Mode), //const Mode: "NORMAL" | "STRICT"
  type: z.nativeEnum(WrType), //const WrType: "ELECTRICAL" | "MECHANICAL"
  remarks: z
    .string()
    .transform((value) => value.trim().replace(/\s+/g, ' ').toLowerCase())
    .optional(), //user can left it empty
});
