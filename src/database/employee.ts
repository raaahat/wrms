import { db } from '@/lib/prisma';

export const getAllEmployee = async () => {
  try {
    const employees = await db.employee.findMany({
      include: {
        designation: {
          include: {
            department: true,
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
