'use server';
import { db } from '@/lib/prisma';

export const addDepartment = async (name: string, shortName: string) => {
  try {
    await db.department.create({
      data: {
        name,
        shortName,
      },
    });
    return {
      success: true,
      message: 'Department added successfully!',
    };
  } catch (error) {
    console.error('Error adding department:', error);
    return {
      success: false,
      message: 'Ops.. Something went wrong!',
    };
  }
};

export const deleteDepartment = async (id?: string) => {
  if (!id) return { success: false, message: 'Department Required' };
  try {
    await db.department.delete({
      where: { id },
    });
    return {
      success: true,
      message: 'Department was deleted successfully!',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong!',
    };
  }
};
