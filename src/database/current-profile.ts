'use server';
import { auth } from '@clerk/nextjs/server';
import { db } from '../lib/prisma';
import { RoleName } from '@prisma/client';

export const currentProfile = async () => {
  const { userId } = auth();

  if (!userId) {
    return auth().redirectToSignIn();
  }
  const profile = await db.employee.findUnique({
    where: {
      userId,
    },
    include: {
      designation: {
        include: {
          department: true,
        },
      },
      roles: true,
    },
  });
  return profile;
};

export const getEmployeeById = async (id: string) => {
  const profile = await db.employee.findUnique({
    where: {
      id,
    },
    include: {
      designation: {
        include: {
          department: true,
        },
      },
      roles: true,
    },
  });
  return profile;
};

export const hasRole = async (employeeId: string, role: RoleName) => {
  try {
    const employee = await db.employee.findUnique({
      where: { id: employeeId },
      include: {
        roles: true, // Include roles associated with the employee
      },
    });

    if (!employee) {
      return false;
    }
    if (!employee.verified) return false;

    const hasRole = employee.roles.some((r) => r.name === role);

    return hasRole;
  } catch (error) {
    console.error('Error checking role:', error);
    return false;
  }
};
