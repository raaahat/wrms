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
