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

export async function getAllAreaWithParentArr() {
  const areas = await db.area.findMany({
    select: {
      id: true,
      name: true,
      parentId: true,
    },
  });
  const areasMap = new Map(areas.map((area) => [area.id, area]));
  const buildParentArr = (area: {
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

    return names;
  };
  const output = areas.map((area) => ({
    id: area.id,
    name: area.name,
    parentArr: buildParentArr(area),
  }));
  return output;
}

export async function getAllAreaWithFullName() {
  const allAreaWithParentArr = await getAllAreaWithParentArr();
  return allAreaWithParentArr.map((item) => ({
    id: item.id,
    fullName: item.parentArr.join(' / '),
  }));
}

export const getSingleAreaFullName = async (areaId: string) => {
  const all = await getAllAreaWithParentArr();
  return all.find((area) => area.id === areaId)?.parentArr.join(', ');
};

export type AllAreaWithFullNameType = Awaited<
  ReturnType<typeof getAllAreaWithFullName>
>;
