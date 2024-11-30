'use server';
import { db } from '@/lib/prisma';

export type OpEmployeeListType = Awaited<ReturnType<typeof opEmployeeList>>;

export const opEmployeeList = async () => {
  const departmentName = 'operation';
  const employees = await db.employee.findMany({
    where: {
      verified: {
        not: null,
      },
      designation: {
        department: {
          name: departmentName, // Filter by department name through the department relation
        },
      },
    },
    include: {
      designation: {
        include: {
          department: true, // Optionally include department details
        },
      },
    },
  });

  return employees;
};

export const getRoles = async () => {
  const roles = await db.role.findMany();
  return roles;
};
