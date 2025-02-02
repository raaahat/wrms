'use server';
import { db } from '@/lib/prisma';
import {
  eachMonthOfInterval,
  endOfMonth,
  format,
  parseISO,
  startOfMonth,
} from 'date-fns';

export type EngineDataType = NonNullable<
  Awaited<ReturnType<typeof getEngineDataForDate>>
>[number];

export const getEngineDataForDate = async (date: string) => {
  const engineData = await db.engineData.findMany({
    where: { date: new Date(date) },
    include: { engine: true },
    orderBy: {
      engine: {
        number: 'asc',
      },
    },
  });

  if (engineData.length === 0) return null;

  // Transform data into an object where the engine number is the key
  const groupedData: Record<number, (typeof engineData)[number]> = {};

  for (const entry of engineData) {
    if (entry.engine) {
      groupedData[entry.engine.number] = entry;
    }
  }

  return groupedData;
};

export type EngineTableDataType = Awaited<
  ReturnType<typeof getEngineDataForMonth>
>[string];

export const getEngineDataForMonth = async (month: string) => {
  try {
    // Convert '2025-01' to Date
    const startDate = startOfMonth(parseISO(`${month}-01`));
    const endDate = endOfMonth(startDate);

    const engineData = await db.engineData.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        engine: true, // Assuming engine relation exists
      },
      orderBy: {
        date: 'asc',
      },
    });

    // Group data by date
    const groupedData: Record<
      string,
      { headers: string[]; rows: { name: string; values: any[] }[] }
    > = {};

    engineData.forEach((entry) => {
      const dateKey = entry.date.toISOString().split('T')[0]; // Format as YYYY-MM-DD

      if (!groupedData[dateKey]) {
        groupedData[dateKey] = {
          headers: [],
          rows: [],
        };
      }

      // Ensure engine name appears in headers
      if (!groupedData[dateKey].headers.includes(entry.engine.name)) {
        groupedData[dateKey].headers.push(entry.engine.name);
      }

      // Organize row data by parameter
      Object.entries(entry).forEach(([key, value]) => {
        if (
          key !== 'id' &&
          key !== 'date' &&
          key !== 'engineId' &&
          key !== 'engine'
        ) {
          let row = groupedData[dateKey].rows.find((r) => r.name === key);
          if (!row) {
            row = { name: key, values: [] };
            groupedData[dateKey].rows.push(row);
          }
          row.values.push(value);
        }
      });
    });

    return groupedData;
  } catch (error) {
    console.error('Error fetching engine data:', error);
    return {}; // Ensure function returns an empty object on failure
  }
};

export const getAvailableMonths = async (): Promise<string[]> => {
  // Get the oldest and newest dates from EngineData table
  const oldestEntry = await db.engineData.findFirst({
    orderBy: { date: 'asc' }, // Get the oldest entry
    select: { date: true },
  });

  const newestEntry = await db.engineData.findFirst({
    orderBy: { date: 'desc' }, // Get the newest entry
    select: { date: true },
  });

  if (!oldestEntry || !newestEntry) {
    return []; // No data available
  }

  // Generate months between oldest and newest entries
  const months = eachMonthOfInterval({
    start: oldestEntry.date,
    end: newestEntry.date,
  }).map((date) => format(date, 'yyyy-MM')); // Format: 'YYYY-MM'

  return months;
};
