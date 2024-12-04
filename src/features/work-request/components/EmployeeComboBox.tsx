'use client';
import { Check, ChevronsUpDown } from 'lucide-react';

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
import { Skeleton } from '@/components/ui/skeleton';
import UserAvatar from '@/features/employee/components/UserAvatar';
import { OpEmployeeListType } from '@/features/employee/query';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type EmployeeComboBoxProps = {
  className?: string;
  title?: string;
  employeeId?: string;
  selectedEmployee?: OpEmployeeListType[0];
  allEmployeeList?: OpEmployeeListType;
  isLoading: boolean;
  onSelection: (id: string) => void;
};
export function EmployeeComboBox({
  className,
  title,
  selectedEmployee,
  allEmployeeList,
  isLoading,
  onSelection,
  employeeId,
}: EmployeeComboBoxProps) {
  const [o, setO] = useState(false);
  return (
    <Popover open={o} onOpenChange={setO}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          className={cn(
            'w-full justify-between py-6 cursor-pointer',
            className
          )}
        >
          {selectedEmployee ? (
            <UserAvatar
              name={selectedEmployee.name}
              department={selectedEmployee.designation?.department.shortName}
              designaiton={selectedEmployee.designation?.title}
              avatar={selectedEmployee.imageUrl}
            />
          ) : title ? (
            title
          ) : (
            'Select an engineer...'
          )}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0'>
        <Command>
          <CommandInput placeholder='Search engineer...' />
          {isLoading ? (
            <div className='p-2 space-y-2'>
              <div className='flex gap-2 '>
                <Skeleton className='rounded-full h-8 w-8' />
                <Skeleton className=' flex-1 h-8 ' />
              </div>
              <div className='flex gap-2 '>
                <Skeleton className='rounded-full h-8 w-8' />
                <Skeleton className=' flex-1 h-8 ' />
              </div>
            </div>
          ) : (
            <CommandList>
              <CommandEmpty>No engineer found.</CommandEmpty>
              <CommandGroup>
                {allEmployeeList?.map((employee) => (
                  <CommandItem
                    key={employee.id}
                    onSelect={() => {
                      onSelection(employee.id);
                      setO(false);
                    }}
                    value={employee.name}
                  >
                    <UserAvatar
                      name={employee.name}
                      department={employee.designation?.department.shortName}
                      designaiton={employee.designation?.title}
                      avatar={employee.imageUrl}
                    />

                    <Check
                      className={cn(
                        'ml-auto',
                        employeeId === employee.id ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
