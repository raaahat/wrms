'use client';
import { ColumnDef, Row } from '@tanstack/react-table';
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
import { wait } from '@/lib/utils';
import { setStatus } from '../../action';
import { toast } from 'sonner';
import { WrTableColumnHeader } from './table-header';
const DATE_FORMAT = 'd-MMM-yy';

export const columnWR: ColumnDef<GetAllWRType>[] = [
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id, status } = row.original;
      const next = nextAvailableStatus(status);
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
              onClick={() => navigator.clipboard.writeText('email')}
            >
              Copy email address
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {}}>edit</DropdownMenuItem>
            {next && (
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
  },
  {
    id: 'createdAt',
    accessorFn: (info) => info.createdAt,
    header: ({ column }) => (
      <WrTableColumnHeader column={column} title="Date" />
    ),
    cell: (info) => {
      return format(info.row.getValue('createdAt'), DATE_FORMAT);
    },
  },
  {
    id: 'area',
    accessorFn: (info) => info.allParentAreas?.join(' / '),
    // accessorFn: (info) => info.allParentAreas,
    header: 'Area',
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    // cell: ({ row }) => {
    //   const allParents = row.getValue('area') as string[];
    //   return allParents.join(' / ');
    // },
    // filterFn: (row: Row<GetAllWRType>, id: string, filterValues: any[]) => {
    //   const columnValue = row.getValue(id) as string;
    //   if (Array.isArray(columnValue)) {
    //     // If the column value is an array, check if any value matches any filter case-insensitively
    //     return filterValues.every((filterValue) =>
    //       columnValue.some(
    //         (val) => val.toLowerCase() === filterValue.toLowerCase()
    //       )
    //     );
    //   }
    //   // If the column value is a string, check inclusion for all filter values case-insensitively
    //   return filterValues.every((filterValue) =>
    //     columnValue.toLowerCase().includes(filterValue.toLowerCase())
    //   );
    // },
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <WrTableColumnHeader className="max-w-16" column={column} title="Dept." />
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
    id: 'creator',
    accessorFn: (info) => info.creator.name,
    header: 'Added By',
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <WrTableColumnHeader column={column} title="Status" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
