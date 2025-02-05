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
