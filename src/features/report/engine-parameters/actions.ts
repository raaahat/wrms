'use server';

import { db } from '@/lib/prisma';
import { EngineDataType } from './query';

export const createEntry = async (date: Date) => {
  // Ensure the date is set to midnight UTC to avoid time mismatches
  const normalizedDate = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );

  // Get all engine IDs
  const engines = await db.engine.findMany({
    select: { id: true },
  });

  if (engines.length === 0) {
    return {
      success: false,
      message: 'No engines found in the database',
    };
  }

  const engineIds = engines.map((engine) => engine.id);

  // Check if entries exist for the given date
  const existingEntries = await db.engineData.findMany({
    where: {
      engineId: { in: engineIds },
      date: normalizedDate,
    },
  });

  if (existingEntries.length === engines.length) {
    return {
      success: false,
      message: 'Entry already exists for the given date',
    };
  }

  // Create missing entries
  const newEntries = engines
    .filter(
      (engine) => !existingEntries.some((entry) => entry.engineId === engine.id)
    )
    .map((engine) => ({
      engineId: engine.id,
      date: normalizedDate,
    }));

  await db.engineData.createMany({
    data: newEntries,
  });

  return {
    success: true,
    message: 'Entry created successfully',
  };
};

export const updateEngineData = async (
  date: string,
  engineNumber: number,
  data: Partial<EngineDataType>
) => {
  console.log('Data', data);
  try {
    // Convert string date to Date object
    const formattedDate = new Date(date);

    // Find the engineId for the given engineNumber
    const engine = await db.engine.findUnique({
      where: { number: engineNumber }, // Assuming `number` is unique in the Engine table
      select: { id: true },
    });

    if (!engine) {
      return { success: false, message: 'Engine not found' };
    }

    // Update engine data where engineId matches the found engine
    await db.engineData.updateMany({
      where: { date: formattedDate, engineId: engine.id },
      data,
    });

    return { success: true, message: 'Engine data updated successfully' };
  } catch (error) {
    console.error('Error updating engine data:', error);
    return { success: false, message: 'Failed to update engine data' };
  }
};
