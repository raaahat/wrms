'use server';

import { db } from '@/lib/prisma';

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
