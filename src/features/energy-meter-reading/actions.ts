'use server';

import { db } from '@/lib/prisma';
import { z } from 'zod';
import { energyMeterSchema } from './type';
import { revalidatePath } from 'next/cache';

export async function upsertEnergyMeterReading(
  data: z.infer<typeof energyMeterSchema>
) {
  const parsed = energyMeterSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid data',
      errors: parsed.error.flatten(),
    };
  }

  let { date, hour } = data;
  if (hour === 24) {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);
    date = currentDate.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
    hour = 0;
  }

  try {
    await db.energyMeterReading.upsert({
      where: {
        date_hour: { date: new Date(date), hour },
      },
      update: {
        cumulativeImportMW: data.cumulativeImportMW,
        cumulativeExportMW: data.cumulativeExportMW,
        cumulativeExportMVar: data.cumulativeExportMVar,
        demandMW: data.demandMW,
      },
      create: {
        date: new Date(date),
        hour,
        cumulativeImportMW: data.cumulativeImportMW,
        cumulativeExportMW: data.cumulativeExportMW,
        cumulativeExportMVar: data.cumulativeExportMVar,
        demandMW: data.demandMW,
      },
    });

    revalidatePath('/energy-meter-reading');
    return {
      success: true,
      message: 'Energy meter reading upserted successfully',
    };
  } catch (error) {
    return { success: false, message: 'Database error', error };
  }
}
