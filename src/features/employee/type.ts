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
  // date: z.date({ required_error: 'Date is required' }),
  // hour: z
  //   .number({ required_error: 'Hour is required' })
  //   .min(0, 'Hour must be between 0 and 23')
  //   .max(23, 'Hour must be between 0 and 23'),
  cumulativeImportMW: z
    .number({ required_error: 'Cumulative Import kW is required' })
    .nonnegative('Must be a non-negative value'),
  cumulativeExportMW: z
    .number({ required_error: 'Cumulative Export kW is required' })
    .nonnegative('Must be a non-negative value'),
  cumulativeExportMVar: z
    .number({ required_error: 'Cumulative Export kVar is required' })
    .nonnegative('Must be a non-negative value'),
  demandMW: z
    .number({ required_error: 'Demand MW is required' })
    .nonnegative('Must be a non-negative value'),
});
