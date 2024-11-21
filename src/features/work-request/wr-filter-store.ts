import { ColumnFiltersState } from '@tanstack/react-table';
import { create } from 'zustand';

type FilterStoreProps = {
  typeFacetedValues: Map<string, number> | undefined;
  columnFilters: ColumnFiltersState;

  globalFilter: string;
  setGlobalFilter: (updaterOrValue: string | ((old: string) => string)) => void;
  setColumnFilters: (
    updaterOrValue:
      | ColumnFiltersState
      | ((old: ColumnFiltersState) => ColumnFiltersState)
  ) => void;
  setFilter: (id: string, value: string) => void;
  clearFilter: (id: string) => void;
};

export const useFilterStore = create<FilterStoreProps>((set) => ({
  typeFacetedValues: undefined,
  columnFilters: [],
  globalFilter: '',
  setGlobalFilter: (updaterOrValue) =>
    set((state) => ({
      globalFilter:
        typeof updaterOrValue === 'function'
          ? updaterOrValue(state.globalFilter)
          : updaterOrValue,
    })),
  setColumnFilters: (updaterOrValue) =>
    set((state) => ({
      columnFilters:
        typeof updaterOrValue === 'function'
          ? updaterOrValue(state.columnFilters)
          : updaterOrValue,
    })),
  setFilter: (id, value) =>
    set((state) => {
      const existingFilter = state.columnFilters.find((item) => item.id === id);
      if (existingFilter)
        return {
          columnFilters: state.columnFilters.map((item) =>
            item.id === id ? { id, value } : item
          ),
        };
      return {
        columnFilters: [...state.columnFilters, { id, value }],
      };
    }),
  clearFilter(id) {
    return set((state) => ({
      columnFilters: state.columnFilters.filter((item) => item.id !== id),
    }));
  },
}));
