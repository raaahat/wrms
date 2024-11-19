'use client';
import { ColumnDef } from '@tanstack/react-table';
import { GetAllWRType } from '../../query';

export const columnWR: ColumnDef<GetAllWRType>[] = [
  {
    accessorKey: 'wrNo',
    header: 'WR-No',
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
    header: 'Type',
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
