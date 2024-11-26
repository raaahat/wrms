'use server';
import { db } from '@/lib/prisma';
import { getAllAreaWithParentArr } from '../Area/query';
import { wait } from '@/lib/utils';

export type GetAllWRType = Awaited<ReturnType<typeof getAllWr>>[number];
export const getAllWr = async (dateRange?: { from: Date; to: Date }) => {
  await wait(5);
  // Default to last 30 days if dateRange is not provided
  const now = new Date();
  const defaultDateRange = {
    from: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30),
    to: now,
  };

  const range = dateRange || defaultDateRange;

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
