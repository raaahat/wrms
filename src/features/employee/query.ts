'use server';
import { db } from '@/lib/prisma';
import { RoleName } from '@prisma/client';

export type OpEmployeeListType = Awaited<ReturnType<typeof employeeListByDept>>;

export const employeeListByDept = async (deptShortName?: string) => {
  const employees = await db.employee.findMany({
    where: {
      verified: {
        not: null,
      },
      designation: {
        department: {
          shortName: deptShortName, // Filter by department name through the department relation
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

export const getEmployeeByRole = async (role: RoleName) => {
  const output = await db.role.findUnique({
    where: {
      name: role,
    },
    select: {
      employees: {
        include: {
          designation: {
            include: {
              department: true,
            },
          },
        },
      },
    },
  });
  return output?.employees;
};
