'use server';
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

export async function getAllAreaWithFullName() {
  // Fetch all areas in a single call
  const areas = await db.area.findMany({
    select: {
      id: true,
      name: true,
      parentId: true,
    },
  });

  // Create a map for fast parent lookup
  const areasMap = new Map(areas.map((area) => [area.id, area]));

  // Helper function to build fullName for an area (child-first order)
  const buildFullName = (area: {
    name: string;
    id: string;
    parentId: string | null;
  }) => {
    let names = [area.name];
    let parent = areasMap.get(area.parentId as string);

    while (parent) {
      names.push(parent.name);
      parent = areasMap.get(parent.parentId as string);
    }

    return names.join(' / ');
  };

  // Generate output directly
  const output = areas.map((area) => ({
    id: area.id,
    fullName: buildFullName(area),
  }));

  return output;
}
export type AllAreaWithFullNameType = Awaited<
  ReturnType<typeof getAllAreaWithFullName>
>;
