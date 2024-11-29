'use client';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  GlobalFilterTableState,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { DataTablePagination } from '@/components/table/pagination';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useFilterStore } from '../../wr-filter-store';
import { WrTableToolbar } from './toolbar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function WRDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const { columnFilters, setColumnFilters } = useFilterStore();

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    ['mode']: false,
  });
  const { globalFilter, setGlobalFilter } = useFilterStore();
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    initialState: {
      pagination: { pageSize: 40 },
    },
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
    },
    globalFilterFn: 'includesString',
    enableRowSelection: true,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  const typeFacets = table.getColumn('type')?.getFacetedUniqueValues();

  useEffect(() => {
    if (typeFacets) useFilterStore.setState({ typeFacetedValues: typeFacets });
  }, [typeFacets]);

  const column = table.getColumn('status');
  if (!column) return;
  return (
    <div className='flex-1 space-y-4'>
      <WrTableToolbar table={table} />

      <div className=' rounded-md border'>
        <ScrollArea className='max-w-[90vw]'>
          <Table className='overflow-auto'>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className='font-sans text-xs'>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className=' py-1' key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
      <DataTablePagination table={table} />
      {/* <pre>{JSON.stringify(table.getState(), null, 2)}</pre> */}
    </div>
  );
}

export function WrSkeleton() {
  return (
    <div className='space-y-4 my-6'>
      <Skeleton className=' h-5' />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              {[1, 2, 3, 4, 5].map((c) => {
                return (
                  <TableHead key={c}>
                    <Skeleton className=' h-5' />
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((row) => (
              <TableRow key={row} className=' border-none'>
                {[1, 2, 3, 4, 5].map((cell) => (
                  <TableCell className=' py-1' key={cell}>
                    <Skeleton className=' h-5' />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
