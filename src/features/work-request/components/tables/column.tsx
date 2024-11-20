'use client';
import { ColumnDef } from '@tanstack/react-table';
import { GetAllWRType } from '../../query';
import { format } from 'date-fns';
const DATE_FORMAT = 'd-MMM-yy';

export const columnWR: ColumnDef<GetAllWRType>[] = [
  {
    accessorKey: 'wrNo',
    header: 'WR-No',
  },
  {
    id: 'createdAt',
    accessorFn: (info) => format(info.createdAt, DATE_FORMAT),
    header: 'Date',
  },
  {
    id: 'area',
    accessorFn: (info) => info.allParentAreas?.join(' / '),
    // accessorFn: (info) => [info.area.name, info.area.parent?.name],

    header: 'Area',
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'type',
    header: 'Department',
  },
  {
    accessorKey: 'mode',
    header: 'Mode',
  },
  {
    id: 'creator',
    accessorFn: (info) => info.creator.name,
    header: 'Added By',
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
