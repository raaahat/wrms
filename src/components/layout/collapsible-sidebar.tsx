'use client';
import { cn } from '@/lib/utils';
import {
  ChevronFirst,
  ChevronLast,
  LucideProps,
  MoreVertical,
} from 'lucide-react';

import { Settings, BarChart3, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { Employee } from '@prisma/client';

import { Logo } from './logo';

const items = [
  {
    text: 'Work Requests',
    icon: BarChart3,
    active: true,
    alert: false,
    href: '/work-request',
  },
  {
    text: 'Department',
    icon: BarChart3,
    active: true,
    alert: false,
    href: '/department',
  },
  {
    text: 'Employee',
    icon: LayoutDashboard,
    active: false,
    alert: true,
    href: '/employee',
  },
  {
    text: 'Settings',
    icon: Settings,
    active: false,
    alert: false,
    href: '/settings',
  },
];
interface SidebarProps {
  expanded: boolean;
  user?: Employee;
  setExpanded: (value: boolean | ((prevState: boolean) => boolean)) => void;
}
export const SidebarC = ({ expanded, setExpanded, user }: SidebarProps) => {
  const path = usePathname();
  return (
    <aside className={cn('fixed top-0 left-0 h-screen z-10 transition-all')}>
      <nav className="h-full flex flex-col shadow-centered">
        <div className="p-4 pb-2 flex justify-between items-center">
          <div
            className={cn(
              'flex items-center w-32 overflow-hidden transition-all',
              expanded ? 'w-32' : 'w-0'
            )}
          >
            <Logo />
          </div>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="shadow-md text-gray-600 p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <SidebarSection expanded={expanded} path={path} />

        <UserInfo user={user} expanded={expanded} />
      </nav>
    </aside>
  );
};

export const SidebarSection = ({
  path,
  expanded,
}: {
  path: string;
  expanded: boolean;
}) => {
  return (
    <ul className=" flex-1 px-3 ">
      {items.map((item) => {
        const active = path.startsWith(item.href);
        return (
          <SidebarItem
            key={item.text}
            icon={item.icon}
            active={active}
            alert={item.alert}
            expanded={expanded}
            href={item.href}
            text={item.text}
          />
        );
      })}
    </ul>
  );
};

type SidebarItemProps = {
  text: string;
  expanded: boolean;
  href: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  active: boolean;
  alert: boolean;
  key: string;
};
const SidebarItem = ({
  text,
  expanded,
  href,
  icon,
  active,
  alert,
}: SidebarItemProps) => {
  const Icon = icon;
  return (
    <Link key={text} href={href}>
      <li
        className={cn(
          'relative flex items-center my-1 py-2 px-3 font-medium rounded-md cursor-pointer transition-colors group',
          active
            ? 'bg-primary/20 text-primary/90'
            : 'hover:bg-primary/10 text-gray-600'
        )}
      >
        <Icon size={18} />
        <span
          className={`h-5 overflow-clip transition-all ${
            expanded ? 'w-40 ml-3' : 'w-0'
          }`}
        >
          {text}
          {alert && (
            <div
              className={cn(
                'absolute top-2 right-2 w-2 h-2 rounded bg-primary/70'
              )}
            />
          )}
          {!expanded && (
            <div
              className={` absolute left-full rounded-md px-2 py-1 ml-6 mt-[-24px] bg-neutral-100 text-neutral-800 invisible text-sm opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
            >
              {text}
            </div>
          )}
        </span>
      </li>
    </Link>
  );
};

function UserInfo({ expanded, user }: { expanded: boolean; user?: Employee }) {
  return (
    <div className={cn('border-t flex p-3', !expanded && 'p-0')}>
      <div className=" flex-1 flex justify-center">
        <UserButton />
      </div>

      <div
        className={cn(
          'flex justify-between items-center overflow-hidden transition-all',
          expanded ? 'w-40 ml-3' : 'w-0 '
        )}
      >
        <div className="leading-4">
          <h4 className="font-semibold capitalize">
            {user?.name || 'unknown'}
          </h4>
          <span className="text-xs text-gray-600">
            {user?.email || 'no email'}
          </span>
        </div>
        <MoreVertical size={20} />
      </div>
    </div>
  );
}
