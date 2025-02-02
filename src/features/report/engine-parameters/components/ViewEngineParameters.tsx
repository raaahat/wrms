'use client';

import { useQuery } from '@tanstack/react-query';
import { AddDataButton } from './add-data-button';
import EngineDataTable from './EngineDataTable';
import { getAvailableMonths, getEngineDataForMonth } from '../query';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEngineParametersStore } from '../engine-par-store';
import { formatDate, formatMonthForUser, getDaysInMonth } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { createEntry } from '../actions';
import { Plus } from 'lucide-react';

const ViewEngineParameters = () => {
  const { selectedMonth, setSelectedMonth, onOpen } =
    useEngineParametersStore();
  const days = getDaysInMonth(selectedMonth);

  const availableMonthsQuery = useQuery({
    queryKey: ['available-months'],
    queryFn: () => getAvailableMonths(),
  });
  const { data } = useQuery({
    queryKey: ['engine-data', selectedMonth],
    queryFn: () => getEngineDataForMonth(selectedMonth),
  });
  async function handleCreateEntry(date: string) {
    const normalizedDate = new Date(date);
    const { success, message } = await createEntry(normalizedDate);
  }
  return (
    <div>
      <Select
        value={selectedMonth}
        onValueChange={(value) => setSelectedMonth(value)}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Select a month' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select A Month</SelectLabel>

            {availableMonthsQuery.data?.map((month) => (
              <SelectItem key={month} value={month}>
                {formatMonthForUser(month)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <br />
      <div className='p-4'>
        <Accordion
          type='single'
          collapsible
          className='w-full -space-y-px max-w-[900px]'
        >
          {data &&
            days.map((day) => (
              <AccordionItem
                value={day}
                className='border bg-background px-4 py-1 first:rounded-t-lg last:rounded-b-lg'
              >
                <div>
                  {!data[day] ? (
                    <div className='flex items-center justify-between w-full text-muted-foreground'>
                      <span className=' font-geistMono'>{formatDate(day)}</span>
                      <span>no data available</span>
                      <Button
                        variant={'outline'}
                        size={'sm'}
                        className='h-7 text-green-500'
                        onClick={() => handleCreateEntry(day)}
                      >
                        <Plus /> Add
                      </Button>
                    </div>
                  ) : (
                    <>
                      <AccordionTrigger className='py-2 hover:no-underline'>
                        <span className=' font-geistMono'>
                          {formatDate(day)}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className='pb-2 '>
                        <EngineDataTable
                          key={day}
                          engineDataByDate={data[day]}
                        />
                        <Button onClick={() => onOpen(day)}>Edit</Button>
                      </AccordionContent>
                    </>
                  )}
                </div>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ViewEngineParameters;
