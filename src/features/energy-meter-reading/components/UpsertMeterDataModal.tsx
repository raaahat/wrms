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
import { EnergyMeterFormSchema } from '@/features/employee/type';
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
import { Button } from '@/components/ui/button';
import { useEffect } from 'react'; // Add useEffect

export const UpsertMeterDataModal = () => {
  const { upsertModalOpen, closeUpsertModal, hour, currentData } =
    useEngergyMeterStore();
  console.log('currentData', currentData);

  const form = useForm<z.infer<typeof EnergyMeterFormSchema>>({
    resolver: zodResolver(EnergyMeterFormSchema),
    defaultValues: {
      demandMW: 0,
      cumulativeImportMW: 0,
      cumulativeExportMW: 0,
      cumulativeExportMVar: 0,
    },
  });
  console.log('form', form.getValues());
  useEffect(() => {
    form.reset({
      demandMW: currentData?.demandMW ?? 0,
      cumulativeImportMW: currentData?.cumulativeImportMW ?? 0,
      cumulativeExportMW: currentData?.cumulativeExportMW ?? 0,
      cumulativeExportMVar: currentData?.cumulativeExportMVar ?? 0,
    });
  }, [currentData, form.reset]);

  return (
    <Dialog
      open={upsertModalOpen}
      onOpenChange={() => {
        closeUpsertModal();
        form.reset();
      }}
    >
      <DialogContent>
        <div className='flex flex-col gap-2 mt-6'>
          <DialogHeader>
            <DialogTitle className='flex items-center justify-end'>
              <span>{hour}:00 hours Reading</span>
              <span className='ml-auto border rounded-sm py-1 px-3'>
                13-Jan-2025
              </span>
            </DialogTitle>
            <DialogDescription className='text-left'>
              Main Energy Meter data input
            </DialogDescription>
          </DialogHeader>
        </div>
        <Form {...form}>
          <form className='space-y-5'>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='demandMW'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Demand</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
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
                    <FormLabel>Import kW</FormLabel>
                    <FormControl>
                      <div className='flex'>
                        <Input
                          className='-ms-px rounded-e-none shadow-none'
                          {...field}
                        />
                        <span className='min-w-[200px] -z-10 flex items-center rounded-e-lg border border-input bg-background px-3 text-sm text-muted-foreground'>
                          Hourly Import
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
                    <FormLabel>Export kW</FormLabel>
                    <FormControl>
                      <div className='flex'>
                        <Input
                          className='-ms-px rounded-e-none shadow-none'
                          {...field}
                        />
                        <span className='min-w-[200px] -z-10 flex items-center rounded-e-lg border border-input bg-background px-3 text-sm text-muted-foreground'>
                          Hourly Export
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
                    <FormLabel>Export kVar</FormLabel>
                    <FormControl>
                      <div className='flex'>
                        <Input
                          className='-ms-px rounded-e-none shadow-none'
                          {...field}
                        />
                        <span className='min-w-[200px] -z-10 flex items-center rounded-e-lg border border-input bg-background px-3 text-sm text-muted-foreground'>
                          Hourly Export
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type='button' className='w-full'>
              Save Changes
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
