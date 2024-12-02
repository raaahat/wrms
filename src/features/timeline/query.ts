'use server';

import { db } from '@/lib/prisma';
import { WrType } from '@prisma/client';
import { getSingleAreaFullName } from '../Area/query';

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
        workRequest: {
          include: {
            creator: {
              include: { designation: { include: { department: true } } },
            },
            maintEngr: {
              include: { designation: { include: { department: true } } },
            },
          },
        },
        maintManager: {
          include: { designation: { include: { department: true } } },
        }, // Include Maintenance Manager details
        shiftEngineer: {
          include: { designation: { include: { department: true } } },
        }, // Include Shift Engineer details
        operationEngineer: {
          include: { designation: { include: { department: true } } },
        }, // Include Operation Engineer details
      },
    });

    const resolvedTimelines = await Promise.all(
      timelines.map(async (item) => ({
        ...item,
        workRequest: {
          ...item.workRequest,
          areaName: await getSingleAreaFullName(item.workRequest.areaId),
        },
      }))
    );

    return resolvedTimelines;
  } catch (error) {
    console.error('Error fetching timelines:', error);
    return [];
  }
};
