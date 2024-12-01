'use client';
import { ColumnDef } from '@tanstack/react-table';
import { GetAllWRType } from '../../query';
import { format } from 'date-fns';
import {
  DropdownMenu,
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
import { MoreHorizontal } from 'lucide-react';
import { nextAvailableStatus } from '../../constants';
import { setStatus } from '../../action';
import { toast } from 'sonner';
import { WrTableColumnHeader } from './table-header';
import { StatusBadge } from '../status-badge';
import UserAvatar from '@/features/employee/components/UserAvatar';
import { useQueryClient } from '@tanstack/react-query';
const DATE_FORMAT = 'd-MMM-yy';

export const columnWR: ColumnDef<GetAllWRType>[] = [
  {
    id: 'actions',
    cell: ({ row }) => {
      const queryClient = useQueryClient();
      const { id, status, mode } = row.original;
      const next = nextAvailableStatus(status);
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
              onClick={() => navigator.clipboard.writeText('email')}
            >
              Copy email address
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {}}>edit</DropdownMenuItem>
            {next.length !== 0 && mode !== 'STRICT' && (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Set status</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {next.map((item) => (
                      <DropdownMenuItem
                        key={item}
                        onSelect={async () => {
                          toast.loading('Setting Status...', {
                            id: 'set-status',
                          });
                          const { success, message } = await setStatus(
                            id,
                            item
                          );
                          if (!success) {
                            toast.error(message, {
                              id: 'set-status',
                            });
                            return;
                          }
                          queryClient.invalidateQueries({
                            queryKey: ['workRequests'],
                          });
                          toast.success(message, {
                            id: 'set-status',
                          });
                        }}
                      >
                        {item}
                      </DropdownMenuItem>
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
    accessorKey: 'wrNo',
    header: 'WR-NO',
    cell({ row }) {
      return row.original.mode === 'STRICT'
        ? `${row.original.wrNo}(*)`
        : row.original.wrNo;
    },
  },

  {
    id: 'createdAt',
    accessorFn: (info) => info.createdAt,
    header: ({ column }) => (
      <WrTableColumnHeader column={column} title='Date' />
    ),
    cell: (info) => {
      return format(info.row.getValue('createdAt'), DATE_FORMAT);
    },
  },

  {
    id: 'area',
    accessorFn: (info) => info.allParentAreas,
    header: 'Area',
    filterFn: (row, id, filterValues) => {
      const columnValue = row.getValue(id); // Get array value

      if (!Array.isArray(columnValue)) return false; // Ensure it's an array

      // Check if any item in the array matches any filter value
      return filterValues.some((filterValue: string) =>
        columnValue.some(
          (val) => val.toLowerCase() === filterValue.toLowerCase()
        )
      );
    },
    cell: ({ row }) => {
      const allParents = row.getValue('area') as string[];
      return allParents.join(' / ');
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <WrTableColumnHeader className='max-w-16' column={column} title='Dept.' />
    ),
    cell: ({ row }) => {
      return `${(row.getValue('type') as string)[0]}M`;
    },
    size: 180,
  },
  {
    accessorKey: 'mode',
    header: 'Mode',
    enableHiding: false,
  },
  {
    id: 'maintEngr',
    accessorFn: (info) => info.maintEngr?.name,
    header: 'Assigned',
    cell: ({ row }) => {
      if (!row.original.maintEngr) return '-';
      const { name, imageUrl, designation: des } = row.original.maintEngr;
      return (
        <UserAvatar
          name={name}
          avatar={imageUrl}
          designaiton={des?.title}
          department={des?.department.shortName}
        />
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'creator',
    accessorFn: (info) => info.creator.name,
    header: 'Added By',
    cell: ({ row }) => {
      const { name, imageUrl, designation: des } = row.original.creator;
      return (
        <UserAvatar
          name={name}
          avatar={imageUrl}
          designaiton={des?.title}
          department={des?.department.shortName}
        />
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <WrTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      return (
        <StatusBadge
          className=' px-2 py-[0.011rem] text-[.61rem] font-medium'
          status={row.getValue('status')}
        />
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
