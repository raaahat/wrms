import { z } from 'zod';

export const EnergyMeterFormSchema = z.object({
  demandMW: z
    .number({ required_error: 'Demand MW is required' })
    .min(-0.0001, 'Value must be greater than 0'), // Ensures non-zero
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

export const energyMeterSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
  hour: z.number().min(0).max(24),
  cumulativeImportMW: z.number(),
  cumulativeExportMW: z.number(),
  cumulativeExportMVar: z.number(),
  demandMW: z.number(),
});
