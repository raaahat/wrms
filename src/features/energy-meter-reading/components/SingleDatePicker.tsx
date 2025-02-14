'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn, formatDateToISO } from '@/lib/utils';
import { addDays, format } from 'date-fns';
import { ArrowLeft, ArrowRight, CalendarIcon } from 'lucide-react';
import { useEffect, useId, useState } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DatePicker({
  selectedDate,
  start,
  end,
}: {
  selectedDate: string;
  start: Date | null;
  end: Date | null;
}) {
  const router = useRouter();
  const id = useId();
  const today = new Date();
  const parsedDate = new Date(selectedDate);
  const nextDate = formatDateToISO(addDays(parsedDate, +1));
  const prevDate = formatDateToISO(addDays(parsedDate, -1));
  const [month, setMonth] = useState(today);
  const [inputValue, setInputValue] = useState('');

  const handleDayPickerSelect = (dateObj: Date | undefined) => {
    if (dateObj) {
      const date = formatDateToISO(dateObj);
      const params = new URLSearchParams();
      params.set('date', date);
      router.push(`?${params.toString()}`, {
        scroll: false,
      });
      setMonth(new Date(date));
      setInputValue(date);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const params = new URLSearchParams();
      params.set('date', value);
      router.push(`?${params.toString()}`, {
        scroll: false,
      });
      setMonth(new Date(value));
    }
  };

  useEffect(() => {
    setInputValue(selectedDate);
  }, [selectedDate]);

  return (
    <div className='flex items-center gap-2'>
      <Button asChild size={'default'} className='p-2' variant={'outline'}>
        <Link href={`/energy-meter-reading?date=${prevDate}`}>
          <ArrowLeft className='size-5' />
        </Link>
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant={'outline'}
            className={cn(
              'group w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20',
              !selectedDate && 'text-muted-foreground'
            )}
          >
            <span
              className={cn(
                'truncate',
                !selectedDate && 'text-muted-foreground'
              )}
            >
              {selectedDate
                ? format(selectedDate, 'dd MMMM yyyy')
                : 'Pick a date'}
            </span>
            <CalendarIcon
              size={16}
              strokeWidth={2}
              className='shrink-0 text-muted-foreground/80 transition-colors group-hover:text-foreground'
              aria-hidden='true'
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-2' align='start'>
          <div className='flex items-center gap-3'>
            <Label htmlFor={id} className='text-xs'>
              Enter date
            </Label>
            <div className='relative grow'>
              <Input
                id={id}
                type='date'
                value={inputValue}
                onChange={handleInputChange}
                className='peer appearance-none ps-9 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
                aria-label='Select date'
              />
              <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50'>
                <CalendarIcon size={16} strokeWidth={2} aria-hidden='true' />
              </div>
            </div>
          </div>
          <Calendar
            mode='single'
            className='p-2'
            selected={parsedDate}
            onSelect={handleDayPickerSelect}
            month={month}
            onMonthChange={setMonth}
            disabled={[
              { before: start ?? new Date() },
              { after: end ?? new Date() },
            ]}
          />
          <Button
            variant='outline'
            size='sm'
            className='mb-1 mt-2'
            onClick={() => {
              setMonth(today);
            }}
          >
            Today
          </Button>
        </PopoverContent>
      </Popover>
      <Button asChild size={'default'} className='p-2' variant={'outline'}>
        <Link href={`/energy-meter-reading?date=${nextDate}`}>
          <ArrowRight className='size-5' />
        </Link>
      </Button>
    </div>
  );
}
