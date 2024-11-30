'use server';

import { db } from '@/lib/prisma';
import { WrType } from '@prisma/client';

export const getTimelines = async (type?: WrType) => {
  try {
    const timelines = await db.timeLine.findMany({
      where: type
        ? {
            workRequest: {
              type, // Filter WorkRequests by the given type
            },
          }
        : undefined, // No filter applied if type is not provided
      include: {
        workRequest: true, // Include related WorkRequest details
        maintManager: true, // Include Maintenance Manager details
        shiftEngineer: true, // Include Shift Engineer details
        operationEngineer: true, // Include Operation Engineer details
      },
    });

    return timelines;
  } catch (error) {
    console.error('Error fetching timelines:', error);
    return [];
  }
};
