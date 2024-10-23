'use server';
import { db } from '@/lib/prisma';

export const addDepartment = async (name: string) => {
  try {
    const newDepartment = await db.department.create({
      data: {
        name: name,
      },
    });

    console.log('Department added:', newDepartment);
  } catch (error) {
    console.error('Error adding department:', error);
  }
};
