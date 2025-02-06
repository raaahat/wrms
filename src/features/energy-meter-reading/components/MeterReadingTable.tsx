'use client';

import { useQuery } from '@tanstack/react-query';
import { useEngergyMeterStore } from '../energy-meter-store';
import { fetchEnergyMeterReadings } from '../query';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { Dot, Menu, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const MeterReadingTable = () => {
  const { selectedDate } = useEngergyMeterStore();
  const stringDate = format(selectedDate, 'yyyy-MM-dd');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['energyMeterReadings', stringDate],
    queryFn: () => fetchEnergyMeterReadings(stringDate),
  });

  if (isLoading) {
    return <Skeleton className='h-32 w-full' />;
  }

  if (isError) {
    return <div className='text-red-500'>Failed to load data.</div>;
  }

  return (
    <Table className='border rounded-sm mt-4'>
      <TableHeader className='sticky top-0 z-10 '>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Hour</TableHead>
          <TableHead>Demand (MW)</TableHead>
          <TableHead>Import Meter (MW)</TableHead>
          <TableHead>Import (MW)</TableHead>
          <TableHead>Meter Export (MW)</TableHead>
          <TableHead>Export (MW)</TableHead>
          <TableHead>Meter Export (MVar)</TableHead>
          <TableHead>Export (MVar)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 25 }, (_, hour) => hour).map((hour) => {
          const reading = data?.[hour];
          const previousReading = hour > 0 ? data?.[hour - 1] : null;

          const hourlyImport =
            previousReading && reading
              ? reading.cumulativeImportMW - previousReading.cumulativeImportMW
              : null;
          const hourlyExportMW =
            previousReading && reading
              ? reading.cumulativeExportMW - previousReading.cumulativeExportMW
              : null;
          const hourlyExportMVar =
            previousReading && reading
              ? reading.cumulativeExportMVar -
                previousReading.cumulativeExportMVar
              : null;

          return (
            <TableRow key={hour} className='[&>*]:py-2'>
              <TableCell>
                <Button
                  size={'icon'}
                  variant={'ghost'}
                  className='h-8 w-8 p-0 data-[state=open]:bg-muted'
                >
                  <MoreHorizontal className='size-4' />
                </Button>
              </TableCell>
              <TableCell>{hour}:00</TableCell>
              <TableCell>
                {reading ? reading.demandMW.toFixed(2) : '-'}
              </TableCell>
              <TableCell>
                {reading ? reading.cumulativeImportMW.toFixed(2) : '-'}
              </TableCell>
              <TableCell>
                {hour === 0 || !reading
                  ? '-'
                  : hourlyImport?.toFixed(2) ?? 'n/a'}
              </TableCell>
              <TableCell>
                {reading ? reading.cumulativeExportMW.toFixed(2) : '-'}
              </TableCell>
              <TableCell>
                {hour === 0 || !reading
                  ? '-'
                  : hourlyExportMW?.toFixed(2) ?? 'n/a'}
              </TableCell>
              <TableCell>
                {reading ? reading.cumulativeExportMVar.toFixed(2) : '-'}
              </TableCell>
              <TableCell>
                {hour === 0 || !reading
                  ? '-'
                  : hourlyExportMVar?.toFixed(2) ?? 'n/a'}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
