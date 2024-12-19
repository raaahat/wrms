'use client';

import { ColumnDef } from '@tanstack/react-table';

import { EmployeeWithDetails } from '../../type';
import { Check, MoreHorizontal, X } from 'lucide-react';
import { useModal } from '@/hooks/use-modal-store';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

import { EmployeeTableColumnHeader } from './employee-table-header';
import UserAvatar from '../UserAvatar';
import { toast } from 'sonner';
import { toggleRole } from '../../actions';

import { RoleBadge } from '../role-bagde';

export const columnsEmployee: ColumnDef<EmployeeWithDetails>[] = [
  {
    id: 'actions',
    cell: ({ row }) => {
      const { onOpen, roles } = useModal();
      const {
        id: employeeId,
        name,
        verified,
        designationId: designation,
        phone,
        email,
        roles: userRoles,
      } = row.original;
      const department = row.original.designation?.departmentId;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
            >
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
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
            {!verified && (
              <DropdownMenuItem
                onSelect={() =>
                  onOpen('grantAccess', {
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
                Grant Access
              </DropdownMenuItem>
            )}
            {roles.length !== 0 && (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Set Role</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {roles.map((item) => (
                      <DropdownMenuCheckboxItem
                        key={item.id}
                        checked={userRoles.some((role) => role.id === item.id)}
                        onCheckedChange={async () => {
                          toast.loading('Setting Role...', {
                            id: 'set-role',
                          });
                          const { success, message } = await toggleRole(
                            employeeId,
                            item.id
                          );
                          if (!success) {
                            toast.error(message, {
                              id: 'set-role',
                            });
                            return;
                          }

                          toast.success(message, {
                            id: 'set-role',
                          });
                        }}
                      >
                        <RoleBadge role={item.name} />
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => (
      <EmployeeTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      const { imageUrl, name, email } = row.original;
      return (
        <UserAvatar
          name={name}
          avatar={imageUrl}
          email={email}
          className='min-w-44'
        />
      );
    },
  },
  {
    id: 'dept-name',
    accessorFn: (info) => info.designation?.department.name,
    header: ({ column }) => (
      <EmployeeTableColumnHeader column={column} title='Department' />
    ),
    cell: ({ row }) => {
      const title = row.getValue('dept-name') as string;
      return <span className=' capitalize '>{title}</span>;
    },
  },
  {
    id: 'designation',
    accessorFn: (info) => info.designation?.title,
    header: ({ column }) => (
      <EmployeeTableColumnHeader column={column} title='Designation' />
    ),
    cell: ({ row }) => {
      const desig = row.original.designation;
      return (
        <div className=' capitalize '>
          {`${desig?.title}(${desig?.shortTitle})`}
        </div>
      );
    },
  },
  {
    id: 'role',
    header: 'Role',
    cell: (info) => {
      return (
        <>
          {info.row.original.roles.length !== 0
            ? info.row.original.roles.map((role) => {
                return <RoleBadge key={role.id} role={role.name} />;
              })
            : 'n/a'}
        </>
      );
    },
    enableSorting: false,
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
            <Check size={20} stroke=' green' />
          ) : (
            <X size={20} stroke='red' />
          )}
        </span>
      );
    },
  },
];
