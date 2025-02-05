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
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import { useDateStore } from '../energy-meter-store';

export default function DatePicker({
  start,
  end,
}: {
  start: Date | null;
  end: Date | null;
}) {
  const id = useId();
  const today = new Date();
  const [month, setMonth] = useState(today);
  const { selectedDate, setSelectedDate } = useDateStore();
  const [inputValue, setInputValue] = useState('');

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue('');
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setMonth(date);
      setInputValue(format(date, 'yyyy-MM-dd'));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const parsedDate = new Date(value);
      setSelectedDate(parsedDate);
      setMonth(parsedDate);
    } else {
      setSelectedDate(undefined);
    }
  };

  useEffect(() => {
    setInputValue(format(selectedDate ?? today, 'yyyy-MM-dd'));
  }, [selectedDate]);

  return (
    <div>
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
            selected={selectedDate}
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
              setSelectedDate(today);
              setMonth(today);
            }}
          >
            Today
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
