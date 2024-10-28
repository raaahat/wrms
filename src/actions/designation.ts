'use server';
import { designationNameSchema } from '@/features/department/schema';
import { db } from '@/lib/prisma';
import { z } from 'zod';

export const addDesignation = async (
  name: z.infer<typeof designationNameSchema>,
  deptName: string
) => {
  const result = await designationNameSchema.safeParse(name);
  try {
    const department = await db.department.findUnique({
      where: { name: deptName },
    });
    if (!department)
      return {
        success: false,
        message: 'There is no department of that name',
      };
    if (result.success) {
      await db.designation.create({
        data: {
          title: result.data.name,
          department: {
            connect: { id: department.id },
          },
        },
      });
      return {
        success: true,
        message: 'Designation successfully added',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong!',
    };
  }
  return {
    success: false,
    message: 'Something went wrong!',
  };
};

export const deleteDesignation = async (
  designationId?: string,
  departmentName?: string
) => {
  if (!designationId || !departmentName)
    return {
      success: false,
      message: 'nothing to delete',
    };
  try {
    // Find the department by name
    const department = await db.department.findUnique({
      where: { name: departmentName },
    });

    if (!department) {
      return {
        success: false,
        message: 'Department not found',
      };
    }

    // Attempt to delete the designation if it belongs to the found department
    const deletedDesignation = await db.designation.deleteMany({
      where: {
        id: designationId,
        departmentId: department.id,
      },
    });

    if (deletedDesignation.count === 0) {
      return {
        success: false,
        message:
          'Designation not found or does not belong to the specified department',
      };
    }

    return {
      success: true,
      message: 'Designation successfully deleted',
    };
  } catch (error) {
    console.error('Error deleting designation:', error);
    return {
      success: false,
      message: 'Something went wrong!',
    };
  }
};
