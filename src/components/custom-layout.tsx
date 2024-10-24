'use client';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { SidebarC } from './collapsible-sidebar';
import { Navbar } from './top-nav-bar';

export default function CustomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(true); // Track sidebar state

  return (
    <div className="relative min-h-screen">
      {/* Fixed Sidebar (1) */}
      <div className=" hidden md:block">
        <SidebarC expanded={expanded} setExpanded={setExpanded} />
      </div>

      {/* Fixed Top Navbar (2) */}
      <header
        className={cn(
          'md:fixed top-0 right-0 border-b shadow-sm z-1 transition-all',
          expanded ? 'md:left-[245px]' : 'md:left-[74px]' // Adjust left position based on sidebar width
        )}
      >
        {/* Top navbar content */}
        <Navbar />
      </header>

      {/* Main Content (3) */}
      <main
        className={cn(
          ' p-4 transition-all',
          expanded ? 'md:ml-[245px]' : 'md:ml-[74px]', // Adjust left margin based on sidebar width
          'md:mt-20'
        )}
      >
        {children}
      </main>
    </div>
  );
}
