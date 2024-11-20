'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useFilterStore } from '../wr-filter-store';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

export const TypeTabs = () => {
  const isMobile = useIsMobile();
  const { typeFacetedValues, columnFilters, setFilter, clearFilter } =
    useFilterStore();
  console.log('tabs', columnFilters);
  const active = columnFilters.find((filter) => filter.id === 'type');

  if (isMobile) {
    return (
      <Select
        onValueChange={(value) => {
          if (value === 'all') {
            clearFilter('type');
            return;
          }
          setFilter('type', value);
        }}
      >
        <SelectTrigger>{(active?.value as string) ?? 'All'}</SelectTrigger>
        <SelectContent>
          <SelectItem value="all"> All</SelectItem>
          {typeFacetedValues &&
            Array.from(typeFacetedValues.entries())
              .sort(([, valueA], [, valueB]) => valueB - valueA)
              .map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  <span>{key}</span>
                  <Badge variant={'outline'} className=" ml-2">
                    {value}
                  </Badge>
                </SelectItem>
              ))}
        </SelectContent>
      </Select>
    );
  }
  return (
    <Tabs value={(active?.value as string) ?? ''}>
      <TabsList>
        <TabsTrigger
          value={''}
          onClick={() => {
            clearFilter('type');
          }}
        >
          ALL
        </TabsTrigger>
        {typeFacetedValues &&
          Array.from(typeFacetedValues.entries())
            .sort(([, valueA], [, valueB]) => valueB - valueA)
            .map(([key, value]) => (
              <TabsTrigger
                key={key}
                value={key}
                onClick={() => {
                  setFilter('type', key);
                }}
              >
                <span>{key}</span>
                <Badge variant={'outline'} className=" ml-2">
                  {value}
                </Badge>
              </TabsTrigger>
            ))}
      </TabsList>
    </Tabs>
  );
};
