import { db } from '@/lib/prisma';
import { Area } from '@prisma/client';
export interface AreaWithChild extends Area {
  children?: AreaWithChild[];
}

const fetchAreasRecursively = async (
  parentId: string | null = null
): Promise<AreaWithChild[]> => {
  const areas = await db.area.findMany({
    where: { parentId },
    include: {
      children: {
        orderBy: {
          name: 'asc',
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });

  for (const area of areas) {
    area.children = await fetchAreasRecursively(area.id);
  }
  return areas;
};

export const getAreas = async () => {
  return fetchAreasRecursively(null);
};

export type AreaType = Awaited<ReturnType<typeof getAreas>>;
