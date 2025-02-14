import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavUser, NavUserSkeleton } from './nav-user';
import React from 'react';
import { SiWorkplace } from 'react-icons/si';
import { NavMain } from './nav-main';
import Link from 'next/link';
import Image from 'next/image';
import { Logo } from '../layout/logo';

export function AppSidebar({
  user,
}: {
  user: { name: string; email: string; imageUrl: string };
}) {
  return (
    <Sidebar variant='floating' collapsible='icon'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Image
                src='/logo.svg'
                alt='Company logo'
                width={100}
                height={100}
                className='h-[60px]'
              />
              {/* <Link href='#'>
                <SiWorkplace />
                <span className='text-lg tracking-widest dark:text-slate-300 text-slate-700 font-bold'>
                  O&M OIS
                </span>
              </Link> */}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <React.Suspense fallback={<NavUserSkeleton />}>
          <NavUser
            user={{ name: user.name, email: user.email, avatar: user.imageUrl }}
          />
        </React.Suspense>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
