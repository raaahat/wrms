import { Table } from '@tanstack/react-table';

import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useFilterStore } from '../../wr-filter-store';
import { WrTableFacetedFilter } from './faceted-filter';
import { WrTableViewOptions } from './view-option';

type EmployeeTableToolbarProps<TData> = {
  table: Table<TData>;
};
export function WrTableToolbar<TData>({
  table,
}: EmployeeTableToolbarProps<TData>) {
  const { globalFilter, setGlobalFilter } = useFilterStore();
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="search all..."
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value.target.value))}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('status') && (
          <WrTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
          />
        )}
        {table.getColumn('area') && (
          <WrTableFacetedFilter column={table.getColumn('area')} title="Area" />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <WrTableViewOptions table={table} />
    </div>
  );
}
