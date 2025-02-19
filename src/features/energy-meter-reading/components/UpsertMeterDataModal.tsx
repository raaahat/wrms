'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useEngergyMeterStore } from '../energy-meter-store';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPreviousHourReading } from '../query';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { calculateHourlyExport } from '../utils';
import { SubmitButton } from '@/components/submit-button';
import { EnergyMeterFormSchema, energyMeterSchema } from '../type';
import { useAsyncAction } from '@/hooks/use-async-action';
import { upsertEnergyMeterReading } from '../actions';

import { formatDateToISO } from '@/lib/utils';

export const UpsertMeterDataModal = () => {
  const queryClient = useQueryClient();
  const { isSubmitting, performAction } = useAsyncAction('upsertMeterData');
  const { selectedDate, upsertModalOpen, closeUpsertModal, hour, currentData } =
    useEngergyMeterStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['energyMeterReading', formatDateToISO(selectedDate), hour],
    queryFn: () => getPreviousHourReading(formatDateToISO(selectedDate), hour),
  });
  const form = useForm<z.infer<typeof EnergyMeterFormSchema>>({
    resolver: zodResolver(EnergyMeterFormSchema),
    defaultValues: {
      demandMW: undefined, // Initialize as undefined (blank input)
      cumulativeImportMW: undefined, // Initialize as undefined (blank input)
      cumulativeExportMW: undefined, // Initialize as undefined (blank input)
      cumulativeExportMVar: undefined, // Initialize as undefined (blank input)
    },
  });
  useEffect(() => {
    form.reset({
      demandMW: currentData?.demandMW,
      cumulativeImportMW: currentData?.cumulativeImportMW,
      cumulativeExportMW: currentData?.cumulativeExportMW,
      cumulativeExportMVar: currentData?.cumulativeExportMVar,
    });
  }, [currentData, form]);

  async function handleSubmit(formData: z.infer<typeof EnergyMeterFormSchema>) {
    const data: z.infer<typeof energyMeterSchema> = {
      date: formatDateToISO(selectedDate),
      hour,
      demandMW: formData.demandMW,
      cumulativeImportMW: formData.cumulativeImportMW,
      cumulativeExportMW: formData.cumulativeExportMW,
      cumulativeExportMVar: formData.cumulativeExportMVar,
    };
    const success = await performAction(() => upsertEnergyMeterReading(data));
    if (success) {
      queryClient.invalidateQueries({
        queryKey: ['energyMeterReadings', data.date],
      });
      form.reset();
      closeUpsertModal();
    }
  }
  return (
    <Dialog
      open={upsertModalOpen}
      onOpenChange={() => {
        closeUpsertModal();
        form.reset(); // Reset form when modal closes
      }}
    >
      <DialogContent>
        <div className='flex flex-col gap-2 mt-6'>
          <DialogHeader>
            <DialogTitle className='flex items-center justify-end'>
              <span>{hour}:00 hours Reading</span>
              <span className='ml-auto border rounded-sm py-1 px-3'>
                {format(selectedDate, 'dd-MMM-yyyy')}
              </span>
            </DialogTitle>
            <DialogDescription className='text-left'>
              Main Energy Meter data input
            </DialogDescription>
          </DialogHeader>
        </div>
        <Form {...form}>
          <form
            className='space-y-5'
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='demandMW'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center'>
                      Demand
                      <span className='ml-auto text-muted-foreground italic font-geistMono text-xs opacity-70'>
                        {isLoading ? (
                          <Skeleton className=' w-40 h-4' />
                        ) : data ? (
                          `previous hour: ${data.demandMW}`
                        ) : (
                          'no previous data available'
                        )}
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                        value={field.value ?? ''} // Ensure blank input initially
                        onChange={(e) => {
                          const value = e.target.valueAsNumber;
                          field.onChange(isNaN(value) ? null : value); // Handle blank input
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='cumulativeImportMW'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center'>
                      Import kW
                      <span className='ml-auto text-muted-foreground italic font-geistMono text-xs opacity-70'>
                        {isLoading ? (
                          <Skeleton className=' w-40 h-4' />
                        ) : data ? (
                          `previous hour: ${data.cumulativeImportMW}`
                        ) : (
                          'no previous data available'
                        )}
                      </span>
                    </FormLabel>
                    <FormControl>
                      <div className='flex'>
                        <Input
                          type='number'
                          className='-ms-px rounded-e-none shadow-none'
                          {...field}
                          value={field.value ?? ''} // Ensure blank input initially
                          onChange={(e) => {
                            const value = e.target.valueAsNumber;
                            field.onChange(isNaN(value) ? null : value); // Handle blank input
                          }}
                        />
                        <span className='min-w-[200px] -z-10 flex items-center rounded-e-lg border border-input bg-background px-3 text-sm text-muted-foreground'>
                          Import in MWh:{' '}
                          {data &&
                          form.getValues('cumulativeImportMW') >=
                            data.cumulativeImportMW
                            ? calculateHourlyExport(
                                form.getValues('cumulativeImportMW'),
                                data.cumulativeImportMW
                              ).toFixed(2)
                            : ''}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='cumulativeExportMW'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center'>
                      Export kW
                      <span className='ml-auto text-muted-foreground italic font-geistMono text-xs opacity-70'>
                        {isLoading ? (
                          <Skeleton className=' w-40 h-4' />
                        ) : data ? (
                          `previous hour: ${data.cumulativeExportMW}`
                        ) : (
                          'no previous data available'
                        )}
                      </span>
                    </FormLabel>
                    <FormControl>
                      <div className='flex'>
                        <Input
                          type='number'
                          className='-ms-px rounded-e-none shadow-none'
                          {...field}
                          value={field.value ?? ''} // Ensure blank input initially
                          onChange={(e) => {
                            const value = e.target.valueAsNumber;
                            field.onChange(isNaN(value) ? null : value); // Handle blank input
                          }}
                        />
                        <span className='min-w-[200px] -z-10 flex items-center rounded-e-lg border border-input bg-background px-3 text-sm text-muted-foreground'>
                          Emport in MWh:{' '}
                          {data &&
                          form.getValues('cumulativeExportMW') >=
                            data.cumulativeExportMW
                            ? calculateHourlyExport(
                                form.getValues('cumulativeExportMW'),
                                data.cumulativeExportMW
                              ).toFixed(2)
                            : ''}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='cumulativeExportMVar'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center'>
                      Export kVar
                      <span className='ml-auto text-muted-foreground italic font-geistMono text-xs opacity-70'>
                        {isLoading ? (
                          <Skeleton className=' w-40 h-4' />
                        ) : data ? (
                          `previous hour: ${data.cumulativeExportMVar}`
                        ) : (
                          'no previous data available'
                        )}
                      </span>
                    </FormLabel>
                    <FormControl>
                      <div className='flex'>
                        <Input
                          type='number'
                          className='-ms-px rounded-e-none shadow-none'
                          {...field}
                          value={field.value ?? ''} // Ensure blank input initially
                          onChange={(e) => {
                            const value = e.target.valueAsNumber;
                            field.onChange(isNaN(value) ? null : value); // Handle blank input
                          }}
                        />
                        <span className='min-w-[200px] -z-10 flex items-center rounded-e-lg border border-input bg-background px-3 text-sm text-muted-foreground'>
                          Import in MVar:{' '}
                          {data &&
                          form.getValues('cumulativeExportMVar') >=
                            data.cumulativeExportMVar
                            ? calculateHourlyExport(
                                form.getValues('cumulativeExportMVar'),
                                data.cumulativeExportMVar
                              ).toFixed(2)
                            : ''}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SubmitButton
              buttonText='Save Changes'
              type='submit'
              isPending={form.formState.isSubmitting || isSubmitting}
              disabled={!form.formState.isDirty}
              className='w-full'
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
