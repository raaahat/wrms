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
  console.log('column filters: ', columnFilters);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    ['mode']: false,
  });
  const [globalFilter, setGlobalFilter] = useState('');
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

  const column = table.getColumn('creator');
  if (!column) return;
  const creatorArr = Array.from(column.getFacetedUniqueValues().keys()).sort();
  const selectedValues = new Set(column?.getFilterValue() as string[]);
  return (
    <div className="space-y-4">
      {creatorArr.map((person) => {
        const isSelected = selectedValues.has(person);
        return (
          <div key={person}>
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => {
                if (isSelected) {
                  selectedValues.delete(person);
                } else {
                  selectedValues.add(person);
                }
                const filterValues = Array.from(selectedValues);
                column?.setFilterValue(
                  filterValues.length ? filterValues : undefined
                );
              }}
            />
            {person}
          </div>
        );
      })}
      <Select
        onValueChange={(value) => {
          table.getColumn('creator')?.setFilterValue(value);
        }}
      >
        <SelectTrigger>
          {table.getColumn('creator')?.getFilterValue() as string}
        </SelectTrigger>
        <SelectContent>
          {creatorArr.map((person) => (
            <SelectItem value={person} key={person}>
              {person}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        value={globalFilter ?? ''}
        onChange={(value) => setGlobalFilter(String(value.target.value))}
        className="p-2 font-lg shadow border border-block"
        placeholder="Search all columns..."
      />
      <div className="rounded-md border">
        <Table>
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
      <pre>{JSON.stringify(table.getState(), null, 2)}</pre>
      <br />
    </div>
  );
}
