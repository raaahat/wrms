import { Prisma } from '@prisma/client';
import { z } from 'zod';
// Define type for employee data including department name and designation title
export type EmployeeWithDetails = Prisma.EmployeeGetPayload<{
  include: {
    designation: {
      include: {
        department: true;
      };
    };
    roles: true;
  };
}>;

export type UserInfo = {
  name: string;
  avatar: string;
  department: string;
  designation: string;
};
