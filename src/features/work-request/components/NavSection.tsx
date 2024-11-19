'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { FilterSection } from './FilterSection';
import { Button } from '@/components/ui/button';

export const NavSection = () => {
  const isMobile = useIsMobile();

  if (isMobile)
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open Filters</Button>
        </SheetTrigger>
        <SheetContent>
          <FilterSection />
        </SheetContent>
      </Sheet>
    );
  return <FilterSection />;
};
