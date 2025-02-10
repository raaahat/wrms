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

export const EnergyMeterFormSchema = z.object({
  demandMW: z
    .number({ required_error: 'Demand MW is required' })
    .min(0.0001, 'Value must be greater than 0'), // Ensures non-zero
  cumulativeImportMW: z
    .number({ required_error: 'Cumulative Import kW is required' })
    .min(0.0001, 'Value must be greater than 0'), // Ensures non-zero
  cumulativeExportMW: z
    .number({ required_error: 'Cumulative Export kW is required' })
    .min(0.0001, 'Value must be greater than 0'), // Ensures non-zero
  cumulativeExportMVar: z
    .number({ required_error: 'Cumulative Export kVar is required' })
    .min(0.0001, 'Value must be greater than 0'), // Ensures non-zero
});
