import { db } from '@/lib/prisma';

export const getAllEmployee = async () => {
  try {
    const employees = await db.employee.findMany({
      include: {
        department: {
          select: {
            name: true, // Get department name only
          },
        },
        designation: {
          select: {
            title: true, // Get designation title only
          },
        },
      },
    });

    return {
      success: true,
      data: employees,
      message: 'Successful!',
    };
  } catch (error) {
    console.error('Error fetching employees:', error);
    return {
      success: false,
      message: 'Failed to fetch employees.',
    };
  }
};
