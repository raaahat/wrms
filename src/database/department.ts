import { db } from '@/lib/prisma';

export const getDeptWithDesig = async () => {
  try {
    const deptWithDesig = await db.department.findMany({
      select: {
        name: true,
        id: true,
        shortName: true,
        designations: true,
      },
    });
    return {
      success: true,
      deptWithDesig,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
    };
  }
};
