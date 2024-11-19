'use server';
import { db } from '@/lib/prisma';
import { getAllAreaWithParentArr } from '../Area/query';

export type GetAllWRType = Awaited<ReturnType<typeof getAllWr>>[number];
export const getAllWr = async () => {
  const allAreas = await getAllAreaWithParentArr();
  const areasMap = new Map(allAreas.map((area) => [area.id, area]));
  const allWr = await db.workRequest.findMany({
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
  });

  return allWr.map((wr) => ({
    ...wr,
    allParentAreas: areasMap.get(wr.areaId)?.parentArr || [],
  }));
};
