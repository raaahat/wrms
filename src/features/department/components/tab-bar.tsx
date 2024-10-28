'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface TabItem {
  id: string;
  name: string;
}

interface AnimatedTabsProps extends React.HTMLAttributes<HTMLElement> {
  items: TabItem[];
}

export default function AnimatedTabs({
  items,
  className,
  ...props
}: AnimatedTabsProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn('flex flex-wrap space-x-2 relative', className)}
      {...props}
    >
      {items.map((item) => {
        const isActive =
          (pathname === '/department' && item.name === 'Overview') ||
          pathname === `/department/${item.name}`;

        return (
          <Link
            key={item.id}
            href={
              item.name === 'Overview'
                ? '/department'
                : `/department/${item.name}`
            }
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'capitalize relative',
              isActive
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground',
              'justify-start'
            )}
          >
            {item.name}
            {isActive && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="activeTab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
