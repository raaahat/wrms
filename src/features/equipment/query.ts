'use server';
import { db } from '@/lib/prisma';

export const getCatagories = async () => {
  const catagories = await db.equipmentCategory.findMany({
    include: {
      specifications: true,
    },
  });
  return catagories;
};

export type CatagoriesWithSpec = Awaited<ReturnType<typeof getCatagories>>;

export const getCategoriesWithType = async () => {
  const categories = await db.equipmentCategory.findMany({
    include: {
      EquipmentModels: true,
    },
  });
  const categoryMap = categories.reduce((acc, category) => {
    acc[category.name] = category.EquipmentModels; // Assuming 'name' is the category name
    return acc;
  }, {} as Record<string, (typeof categories)[number]['EquipmentModels']>);

  return categoryMap;
};

export const getCategoryWithSpec = async (name: string) => {
  const category = await db.equipmentCategory.findUnique({
    where: { name },
    include: {
      specifications: true,
    },
  });
  return category;
};
