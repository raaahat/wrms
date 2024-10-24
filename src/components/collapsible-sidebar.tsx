'use client';
import { cn } from '@/lib/utils';
import {
  ChevronFirst,
  ChevronLast,
  LucideProps,
  MoreVertical,
} from 'lucide-react';
import React from 'react';
import { Settings, BarChart3, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  {
    text: 'Settings',
    icon: Settings,
    active: false,
    alert: false,
    href: '/settings',
  },
  {
    text: 'Department',
    icon: BarChart3,
    active: true,
    alert: false,
    href: '/department',
  },
  {
    text: 'Layout',
    icon: LayoutDashboard,
    active: false,
    alert: true,
    href: '/test',
  },
];
interface SidebarProps {
  expanded: boolean;
  setExpanded: (value: boolean | ((prevState: boolean) => boolean)) => void;
}
export const SidebarC = ({ expanded, setExpanded }: SidebarProps) => {
  const path = usePathname();
  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-screen border-r shadow-sm z-10 transition-all'
      )}
    >
      <nav className="h-full flex flex-col border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <div
            className={cn(
              'flex items-center w-32 overflow-hidden transition-all',
              expanded ? 'w-32' : 'w-0'
            )}
          >
            <img src="logo.svg" alt="" className="size-8 mr-4" />
            <p className="font-bold text-2xl">WRS</p>
          </div>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="text-gray-600 p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <SidebarSection expanded={expanded} path={path} />

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? 'w-40 ml-3' : 'w-0'}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
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
          'relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group',
          active
            ? 'bg-primary/30 text-primary'
            : 'hover:bg-primary/10 text-gray-600'
        )}
      >
        <Icon />
        <span
          className={`overflow-hidden transition-all ${
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
              className={` absolute left-full rounded-md px-2 py-1 ml-6 mt-[-24px] bg-indigo-100 text-indigo-800 invisible text-sm opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
            >
              {text}
            </div>
          )}
        </span>
      </li>
    </Link>
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
    <ul className=" flex-1 px-3">
      {items.map((item) => {
        const active = path === item.href;
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
