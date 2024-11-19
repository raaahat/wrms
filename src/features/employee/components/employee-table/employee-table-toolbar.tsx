import { Table } from '@tanstack/react-table';
import { EmployeeTableViewOptions } from './employee-table-view-options';
import { Input } from '@/components/ui/input';
import { departments } from './data';
import { EmployeeTableFacetedFilter } from './employee-table-faceted-filter';
import { Button } from '@/components/ui/button';
import { Cross2Icon } from '@radix-ui/react-icons';

type EmployeeTableToolbarProps<TData> = {
  table: Table<TData>;
};
export function EmployeeTableToolbar<TData>({
  table,
}: EmployeeTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('dept-name') && (
          <EmployeeTableFacetedFilter
            column={table.getColumn('dept-name')}
            title="Department"
            options={departments}
          />
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
      <EmployeeTableViewOptions table={table} />
    </div>
  );
}
