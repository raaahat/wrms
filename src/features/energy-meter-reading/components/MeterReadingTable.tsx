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
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EnergyMeterReading } from '@prisma/client';
import { calculateHourlyExport } from '../utils';

export const MeterReadingTable = () => {
  const { selectedDate, openUpsertModal } = useEngergyMeterStore();
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

  if (!data) {
    return (
      <div className='text-gray-500'>
        No readings available for the selected date.
      </div>
    );
  }

  // Generate rows from 0 to 24
  const hours = Array.from({ length: 25 }, (_, i) => i); // [0, 1, 2, ..., 24]

  return (
    <Table className='border rounded-sm mt-4'>
      <TableHeader>
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
        {hours.map((hour) => {
          const reading = data[hour]; // Get data for the current hour
          const previousReading = hour > 0 ? data[hour - 1] : null;

          // Calculate hourly values
          const hourlyImport = previousReading
            ? calculateHourlyExport(
                reading?.cumulativeImportMW,
                previousReading.cumulativeImportMW
              )
            : 0;
          const hourlyExportMW = previousReading
            ? calculateHourlyExport(
                reading?.cumulativeExportMW,
                previousReading.cumulativeExportMW
              )
            : 0;
          const hourlyExportMVar = previousReading
            ? calculateHourlyExport(
                reading?.cumulativeExportMVar,
                previousReading.cumulativeExportMVar
              )
            : 0;

          return (
            <TableRow key={hour} className='[&>*]:py-1'>
              <TableCell>
                {reading ? (
                  <DropdownMenuButton hour={hour} currentData={reading} />
                ) : (
                  <Button
                    size={'icon'}
                    variant={'ghost'}
                    className='bg-emerald-200 text-emerald-800 hover:bg-emerald-500 dark:bg-emerald-800 dark:text-emerald-200 dark:hover:bg-emerald-500 dark:hover:text-emerald-800 h-6 w-6 p-0 data-[state=open]:bg-muted'
                    onClick={() => openUpsertModal(hour, null)}
                  >
                    <Plus className='size-4' />
                  </Button>
                )}
              </TableCell>
              <TableCell>{hour}:00</TableCell>
              <TableCell>
                {reading ? reading.demandMW.toFixed(0) : '-'}
              </TableCell>
              <TableCell>
                {reading ? reading.cumulativeImportMW.toFixed(3) : '-'}
              </TableCell>
              <TableCell>
                {hour === 0 || !reading ? '-' : hourlyImport.toFixed(2)}
              </TableCell>
              <TableCell>
                {reading ? reading.cumulativeExportMW.toFixed(3) : '-'}
              </TableCell>
              <TableCell>
                {hour === 0 || !reading ? '-' : hourlyExportMW.toFixed(2)}
              </TableCell>
              <TableCell>
                {reading ? reading.cumulativeExportMVar.toFixed(3) : '-'}
              </TableCell>
              <TableCell>
                {hour === 0 || !reading ? '-' : hourlyExportMVar.toFixed(2)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

function DropdownMenuButton({
  hour,
  currentData,
}: {
  hour: number;
  currentData: EnergyMeterReading;
}) {
  const { openUpsertModal } = useEngergyMeterStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={'icon'}
          variant={'ghost'}
          className='h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <MoreHorizontal className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => openUpsertModal(hour, currentData)}>
          edit
        </DropdownMenuItem>
        <DropdownMenuItem>delete{/* delete TODO: */}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
