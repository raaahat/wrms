'use client';

import { ColumnDef } from '@tanstack/react-table';

import { EmployeeWithDetails } from '../../type';
import Image from 'next/image';
import { Check, MoreHorizontal, X } from 'lucide-react';
import { useModal } from '@/hooks/use-modal-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { EmployeeTableColumnHeader } from './employee-table-header';

export const columnsEmployee: ColumnDef<EmployeeWithDetails>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => (
      <EmployeeTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const { imageUrl, name, email } = row.original;
      return (
        <div className="flex scale-90 md:scale-100">
          <Image
            className=" flex-shrink-0 w-fit rounded-full"
            src={imageUrl}
            height={35}
            width={35}
            alt="user icon"
          />
          <div className="flex-1 ml-3 flex flex-col ">
            <p className=" capitalize text-base"> {name}</p>
            <p className=" text-muted-foreground truncate"> {email}</p>
          </div>
        </div>
      );
    },
  },
  {
    id: 'dept-name',
    accessorFn: (info) => info.designation?.department.name,
    header: ({ column }) => (
      <EmployeeTableColumnHeader column={column} title="Department" />
    ),
    cell: ({ row }) => {
      const title = row.getValue('dept-name') as string;
      return <span className=" capitalize ">{title}</span>;
    },
  },
  {
    id: 'designation',
    accessorFn: (info) => info.designation?.title,
    header: ({ column }) => (
      <EmployeeTableColumnHeader column={column} title="Designation" />
    ),
    cell: ({ row }) => {
      const desig = row.original.designation;
      return (
        <div className=" capitalize ">
          {`${desig?.title}(${desig?.shortTitle})`}
        </div>
      );
    },
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: (info) => info.getValue(),
    enableSorting: false,
  },
  {
    accessorKey: 'verified',
    header: 'Verified',
    cell: ({ row }) => {
      return (
        <span>
          {row.getValue('verified') ? (
            <Check size={20} stroke=" green" />
          ) : (
            <X size={20} stroke="red" />
          )}
        </span>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { onOpen } = useModal();
      const {
        id: employeeId,
        name,
        verified,
        designationId: designation,
        phone,
        email,
      } = row.original;
      const department = row.original.designation?.departmentId;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(email)}
            >
              Copy email address
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                onOpen('updateEmployee', {
                  userInfo: {
                    employeeId,
                    department,
                    designation,
                    name,
                    phone,
                    verified,
                  },
                })
              }
            >
              edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
