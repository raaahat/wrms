'use server';
import { db } from '@/lib/prisma';

export const getDateRangeOfEnergyMeter = async () => {
  const result = await db.energyMeterReading.aggregate({
    _min: {
      date: true, // Get the earliest date
    },
    _max: {
      date: true, // Get the latest date
    },
  });

  return {
    earliestDate: result._min.date,
    latestDate: result._max.date,
  };
};

export const fetchEnergyMeterReadings = async (selectedDate: string) => {
  const date = new Date(selectedDate);

  // Fetch readings for the selected date
  const readings = await db.energyMeterReading.findMany({
    where: { date },
    orderBy: { hour: 'asc' },
  });

  // Fetch next day's 0-hour reading
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);

  const nextDayReading = await db.energyMeterReading.findFirst({
    where: { date: nextDay, hour: 0 },
  });

  // Transform readings into the desired format
  const formattedReadings: Record<
    number,
    {
      id: number;
      date: Date;
      cumulativeImportMW: number;
      cumulativeExportMW: number;
      cumulativeExportMVar: number;
      demandMW: number;
    }
  > = {};

  readings.forEach((reading) => {
    formattedReadings[reading.hour] = {
      id: reading.id,
      date: reading.date,
      cumulativeImportMW: reading.cumulativeImportMW,
      cumulativeExportMW: reading.cumulativeExportMW,
      cumulativeExportMVar: reading.cumulativeExportMVar,
      demandMW: reading.demandMW,
    };
  });

  // Include hour 24 data from the next day's 0-hour reading if available
  if (nextDayReading) {
    formattedReadings[24] = {
      id: nextDayReading.id,
      date: nextDayReading.date,
      cumulativeImportMW: nextDayReading.cumulativeImportMW,
      cumulativeExportMW: nextDayReading.cumulativeExportMW,
      cumulativeExportMVar: nextDayReading.cumulativeExportMVar,
      demandMW: nextDayReading.demandMW,
    };
  }

  return formattedReadings;
};
