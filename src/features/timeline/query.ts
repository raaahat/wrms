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

export const getTimelineActivity = async (id: string) => {
  try {
    return await db.employee.findUnique({
      where: { id },
      select: {
        wrIssuedTo: {
          where: {
            mode: 'STRICT', // Filter only strict mode WRs
            timelines: {
              some: {}, // Ensure only WRs that have associated timelines are included
            },
          },

          include: {
            creator: {
              include: { designation: { include: { department: true } } },
            },
            timelines: {
              include: {
                maintManager: {
                  include: { designation: { include: { department: true } } },
                },
                operationEngineer: {
                  include: { designation: { include: { department: true } } },
                },
                shiftEngineer: {
                  include: { designation: { include: { department: true } } },
                },
              },
            },
          },
        },
        operationTimeLines: {
          include: {
            workRequest: {
              include: {
                maintEngr: {
                  include: {
                    designation: {
                      include: {
                        department: true,
                      },
                    },
                  },
                },
                creator: {
                  include: {
                    designation: {
                      include: {
                        department: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        shiftTimeLines: true,
        managedTimeLines: true,
      },
    });
  } catch (error) {
    console.error('Error fetching timeline activity:', error);
    return undefined;
  }
};

export type GetTimelineForMaintEngrType = NonNullable<
  Awaited<ReturnType<typeof getTimelineActivity>>
>['wrIssuedTo'];
export type GetTimelineForOPEngrType = NonNullable<
  Awaited<ReturnType<typeof getTimelineActivity>>
>['operationTimeLines'];

export const getSingleTimeline = async (id: string) => {
  try {
    return db.timeLine.findUnique({
      where: { id },
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
        },
        shiftEngineer: {
          include: { designation: { include: { department: true } } },
        },
        operationEngineer: {
          include: {
            designation: { include: { department: true } },
          },
        },
      },
    });
  } catch (error) {
    return undefined;
  }
};
export type TimeLineType = NonNullable<
  Awaited<ReturnType<typeof getSingleTimeline>>
>;
