'use server';

import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const toggleRole = async (
  employeeId: string,
  roleId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    // Check if the employee exists
    const employeeExists = await db.employee.findUnique({
      where: { id: employeeId },
      include: {
        roles: true, // Include roles to check existing roles
      },
    });
    if (!employeeExists) {
      throw new Error('Employee not found.');
    }
    if (!employeeExists.verified) {
      return { success: false, message: 'Employee must be verified' };
    }

    // Check if the role exists
    const roleExists = await db.role.findUnique({
      where: { id: roleId },
    });

    if (!roleExists) {
      throw new Error('Role not found.');
    }

    const roleAssigned = employeeExists.roles.some(
      (role) => role.id === roleId
    );

    // Toggle the role
    await db.employee.update({
      where: { id: employeeId },
      data: {
        roles: roleAssigned
          ? {
              disconnect: { id: roleId }, // Remove the role if it exists
            }
          : {
              connect: { id: roleId }, // Assign the role if it doesn't exist
            },
      },
    });
    revalidatePath('/employee');
    return {
      success: true,
      message: roleAssigned
        ? 'Role removed from the employee successfully.'
        : 'Role assigned to the employee successfully.',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Something went wrong',
    };
  }
};
