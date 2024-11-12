'use server';

import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const createChildArea = async (parentId: string, newChild: string) => {
  try {
    await db.area.create({
      data: {
        name: newChild,
        parentId,
      },
    });
    revalidatePath('/settings');
    return {
      success: true,
      message: 'Equipment/Area added successfully 🎉',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong 😭',
    };
  }
};
export const createParentArea = async (parentName: string) => {
  try {
    await db.area.create({
      data: {
        name: parentName,
      },
    });
    revalidatePath('/settings');
    return {
      success: true,
      message: 'Equipment/Area added successfully 🎉',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong 😭',
    };
  }
};

export const deleteArea = async (id: string) => {
  try {
    const areaWithChildren = await db.area.findUnique({
      where: { id },
      include: { children: true },
    });
    if (!areaWithChildren) {
      return {
        success: false,
        message: 'Area not found.',
      };
    }
    if (areaWithChildren.children.length > 0) {
      return {
        success: false,
        message: 'Cannot delete area with existing children.',
      };
    }
    await db.area.delete({
      where: {
        id,
      },
    });
    revalidatePath('/settings');
    return {
      success: true,
      message: 'Equipment/Area has been deleted 🎉',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong 😭',
    };
  }
};
