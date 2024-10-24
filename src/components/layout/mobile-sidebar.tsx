'use client';
import { MenuIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SidebarSection } from './collapsible-sidebar';

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  return (
    <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className=" md:hidden">
          <MenuIcon size={20} className=" text-neutral-500" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className=" p-0">
        <div className="p-4 pb-2 flex justify-between items-center">
          <div
            className={'flex items-center w-32 overflow-hidden transition-all'}
          >
            <img src="logo.svg" alt="" className="size-8 mr-4" />
            <p className="font-bold text-2xl">WRS</p>
          </div>
        </div>
        <SidebarSection path={pathname} expanded={true} />
      </SheetContent>
    </Sheet>
  );
};
