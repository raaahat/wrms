'use client';

import { ColumnDef } from '@tanstack/react-table';

import { EmployeeWithDetails } from '../type';
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

export const columnsEmployee: ColumnDef<EmployeeWithDetails>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
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
    accessorKey: 'department.name',
    header: 'Department',
    cell: ({ row }) => {
      const title = row.original.department.name;
      return <span className=" capitalize ">{title}</span>;
    },
  },
  {
    accessorKey: 'designation.title',
    header: 'Designation',
    cell: ({ row }) => {
      const title = row.original.designation.title;
      return <div className=" capitalize ">{title}</div>;
    },
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
        departmentId: department,
        designationId: designation,
        phone,
        email,
      } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
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
                  },
                })
              }
            >
              edit
            </DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
