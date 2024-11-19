import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WrType } from '@prisma/client';

export const TypeTabs = () => {
  return (
    <Tabs>
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value={WrType.MECHANICAL}>Mechanical</TabsTrigger>
        <TabsTrigger value={WrType.ELECTRICAL}>Electrical</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
