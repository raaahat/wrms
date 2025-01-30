'use client';
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { ChevronRight, Plus, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { FaUserGear } from 'react-icons/fa6';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { TbReportAnalytics } from 'react-icons/tb';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

const items = [
  {
    title: 'Work Requests',
    url: '/work-request',
    icon: MdOutlineWorkOutline,
  },
  {
    title: 'Employee',
    url: '/employee',
    icon: FaUserGear,
  },

  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
  {
    title: 'Report',
    url: '/report',
    icon: TbReportAnalytics,
    items: [
      {
        title: 'Overview',
        url: '/report',
      },
      {
        title: 'Engine Parameters',
        url: '/report/engine-parameters',
      },
    ],
  },
];

export function NavMain() {
  const path = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Application</SidebarGroupLabel>
      <SidebarGroupAction>
        <Plus /> <span className='sr-only'>Add Project</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const active = path.startsWith(item.url);
            return (
              <>
                {item.items ? (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={active}
                    className='group/collapsible'
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          isActive={active}
                        >
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                          <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                      {/* <SidebarMenuButton asChild isActive={active}>
                    <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                    </Link>
                    </SidebarMenuButton> */}
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuButton asChild isActive={active}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
