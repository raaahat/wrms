import { db } from '@/lib/prisma';

export const getCatagories = async () => {
  const catagories = await db.equipmentCategory.findMany({
    include: {
      parameters: true,
    },
  });
  return catagories;
};

export type CatagoriesWithSpec = Awaited<ReturnType<typeof getCatagories>>;
