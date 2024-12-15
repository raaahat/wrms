'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useQuery } from '@tanstack/react-query';
import {
  AllAreaWithFullNameType,
  getAllAreaWithFullName,
} from '@/features/Area/query';
import { useCreateWRstore } from '../hooks/create-wr-store';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export const AreaPicker = () => {
  const [open, setOpen] = React.useState(false);
  const { areaId, setAreaId } = useCreateWRstore();
  const allAreaWithFullNameQuery = useQuery<AllAreaWithFullNameType>({
    queryKey: ['all-area'],
    queryFn: () => getAllAreaWithFullName(),
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between'
        >
          {areaId
            ? allAreaWithFullNameQuery.data?.find((area) => area.id === areaId)
                ?.fullName
            : 'Select Equipment/Area...'}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0 '>
        <Command>
          <CommandInput placeholder='Search equipment/area...' />
          <CommandList>
            <CommandEmpty>No equipment/area found.</CommandEmpty>
            <CommandGroup
              onWheel={(e) => e.currentTarget.scrollBy({ top: e.deltaY })}
              className='max-h-60 overflow-auto'
            >
              {allAreaWithFullNameQuery.data?.map((area) => (
                <CommandItem
                  key={area.id}
                  onSelect={() => {
                    setAreaId(area.id);
                    setOpen(false);
                  }}
                >
                  {area.fullName}
                  <Check
                    className={cn(
                      'ml-auto',
                      areaId === area.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
