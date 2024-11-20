'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { FilterSection } from './FilterSection';
import { Button } from '@/components/ui/button';
import { useWRModal } from '../hooks/modal-store';
import { Menu } from 'lucide-react';

export const NavSection = () => {
  const isMobile = useIsMobile();

  if (isMobile)
    return (
      <div className=" flex justify-between">
        <AddWrButton />
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <FilterSection />
          </SheetContent>
        </Sheet>
      </div>
    );
  return (
    <div className=" flex justify-between">
      <FilterSection />
      <AddWrButton />
    </div>
  );
};

function AddWrButton() {
  const { onOpen } = useWRModal();
  return <Button onClick={() => onOpen('createWR')}>Add WR</Button>;
}
