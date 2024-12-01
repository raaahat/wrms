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

import { useCreateWRstore } from '../hooks/create-wr-store';
import {
  employeeListByDept,
  OpEmployeeListType,
} from '@/features/employee/query';
import UserAvatar from '@/features/employee/components/UserAvatar';
import { Skeleton } from '@/components/ui/skeleton';

export const EmployeePickerComboBox = () => {
  const [open, setOpen] = React.useState(false);
  const { creatorId, setCreatorId } = useCreateWRstore();
  const opEmployeeListQuery = useQuery<OpEmployeeListType>({
    queryKey: ['op-employee'],
    queryFn: () => employeeListByDept('OP'),
  });
  const selectedEmployee = opEmployeeListQuery.data?.find(
    (area) => area.id === creatorId
  );
  function handleSelect(id: string) {
    setCreatorId(id);
    setOpen(false);
  }
  return (
    <EmployeeComboBox
      allEmployeeList={opEmployeeListQuery.data}
      employeeId={creatorId}
      isLoading={opEmployeeListQuery.isLoading}
      onSelection={handleSelect}
      open={open}
      selectedEmployee={selectedEmployee}
      setOpen={setOpen}
    />
    // <Popover open={open} onOpenChange={setOpen}>
    //   <PopoverTrigger asChild>
    //     <Button
    //       variant='outline'
    //       role='combobox'
    //       aria-expanded={open}
    //       className='w-full justify-between py-6 cursor-pointer'
    //     >
    //       {selectedEmployee ? (
    //         <UserAvatar
    //           name={selectedEmployee.name}
    //           department={selectedEmployee.designation?.department.shortName}
    //           designaiton={selectedEmployee.designation?.title}
    //           avatar={selectedEmployee.imageUrl}
    //         />
    //       ) : (
    //         'Select an operation engineer...'
    //       )}
    //       <ChevronsUpDown className='opacity-50' />
    //     </Button>
    //   </PopoverTrigger>
    //   <PopoverContent className='w-full p-0'>
    //     <Command>
    //       <CommandInput placeholder='Search engineer...' />
    //       {opEmployeeListQuery.isLoading ? (
    //         <div className='p-2 space-y-2'>
    //           <div className='flex gap-2 '>
    //             <Skeleton className='rounded-full h-8 w-8' />
    //             <Skeleton className=' flex-1 h-8 ' />
    //           </div>
    //           <div className='flex gap-2 '>
    //             <Skeleton className='rounded-full h-8 w-8' />
    //             <Skeleton className=' flex-1 h-8 ' />
    //           </div>
    //         </div>
    //       ) : (
    //         <CommandList>
    //           <CommandEmpty>No engineer found.</CommandEmpty>
    //           <CommandGroup>
    //             {opEmployeeListQuery.data?.map((employee) => (
    //               <CommandItem
    //                 key={employee.id}
    //                 onSelect={() => {
    //                   setCreatorId(employee.id);
    //                   setOpen(false)
    //                 }}
    //               >
    //                 <UserAvatar
    //                   name={employee.name}
    //                   department={employee.designation?.department.shortName}
    //                   designaiton={employee.designation?.title}
    //                   avatar={employee.imageUrl}
    //                 />

    //                 <Check
    //                   className={cn(
    //                     'ml-auto',
    //                     creatorId === employee.id ? 'opacity-100' : 'opacity-0'
    //                   )}
    //                 />
    //               </CommandItem>
    //             ))}
    //           </CommandGroup>
    //         </CommandList>
    //       )}
    //     </Command>
    //   </PopoverContent>
    // </Popover>
  );
};
type EmployeeComboBoxProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  employeeId?: string;
  selectedEmployee?: OpEmployeeListType[0];
  allEmployeeList?: OpEmployeeListType;
  isLoading: boolean;
  onSelection: (id: string) => void;
};
export function EmployeeComboBox({
  open,
  setOpen,
  selectedEmployee,
  allEmployeeList,
  isLoading,
  onSelection,
  employeeId,
}: EmployeeComboBoxProps) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between py-6 cursor-pointer'
        >
          {selectedEmployee ? (
            <UserAvatar
              name={selectedEmployee.name}
              department={selectedEmployee.designation?.department.shortName}
              designaiton={selectedEmployee.designation?.title}
              avatar={selectedEmployee.imageUrl}
            />
          ) : (
            'Select an operation engineer...'
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
                    onSelect={() => onSelection(employee.id)}
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
