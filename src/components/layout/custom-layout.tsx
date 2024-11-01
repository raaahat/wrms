'use client';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { SidebarC } from './collapsible-sidebar';
import { Navbar } from './top-nav-bar';
import { ScrollArea } from '../ui/scroll-area';
import { Employee } from '@prisma/client';

export default function CustomLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user?: Employee;
}) {
  const [expanded, setExpanded] = useState(true); // Track sidebar state

  return (
    <div className="relative md:flex min-h-screen">
      {/* Fixed Sidebar (1) */}
      <div className=" hidden md:block">
        <SidebarC user={user} expanded={expanded} setExpanded={setExpanded} />
      </div>

      {/* Fixed Top Navbar (2) */}
      <header
        className={cn(
          'block md:fixed md:top-0 md:right-0 border-b shadow-sm z-9 transition-all',
          expanded ? 'md:left-[239px]' : 'md:left-[69px]' // Adjust left position based on sidebar width
        )}
      >
        {/* Top navbar content */}
        <Navbar />
      </header>

      {/* Main Content (3) */}
      <main
        className={cn(
          'flex-1 max-h-screen overflow-hidden transition-all',
          expanded ? 'md:ml-[245px]' : 'md:ml-[74px]', // Adjust margin based on sidebar width
          'md:pt-20' // Adjust for the top navbar height
        )}
      >
        {/* Controlled scroll area */}
        <ScrollArea className="h-full p-4">{children}</ScrollArea>
      </main>
    </div>
  );
}
