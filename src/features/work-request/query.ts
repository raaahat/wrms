'use server';
import { db } from '@/lib/prisma';
import { getAllAreaWithParentArr } from '../Area/query';

export type GetAllWRType = Awaited<ReturnType<typeof getAllWr>>[number];
export const getAllWr = async (dateRange: { from: Date; to?: Date }) => {
  const now = new Date();
  const range = {
    from: dateRange.from,
    to: dateRange.to || now,
  };

  const allAreas = await getAllAreaWithParentArr();
  const areasMap = new Map(allAreas.map((area) => [area.id, area]));

  const allWr = await db.workRequest.findMany({
    where: {
      createdAt: {
        gte: range.from, // Start date
        lte: range.to, // End date
      },
    },
    include: {
      creator: {
        include: {
          designation: {
            include: {
              department: true,
            },
          },
        },
      },
      maintEngr: {
        include: {
          designation: {
            include: {
              department: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return allWr.map((wr) => ({
    ...wr,
    allParentAreas: areasMap.get(wr.areaId)?.parentArr || [],
  }));
};
