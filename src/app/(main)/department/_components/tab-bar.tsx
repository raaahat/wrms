'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    id: string;
    name: string;
  }[];
}

export function TabbarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex flex-wrap space-x-2', className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.id}
          href={
            item.name === 'Overview'
              ? '/department'
              : `/department/${item.name}`
          }
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            ' capitalize',
            pathname === `/department` && item.name === 'Overview'
              ? 'bg-muted hover:bg-muted'
              : pathname === `/department/${item.name}`
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline',
            'justify-start'
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
