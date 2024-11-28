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

import { currentProfile } from '@/database/current-profile';
import { redirect } from 'next/navigation';
import { NavUser, NavUserSkeleton } from './nav-user';
import React from 'react';

import { SiWorkplace } from 'react-icons/si';
import { NavMain } from './nav-main';
import Link from 'next/link';

export async function AppSidebar() {
  const user = await currentProfile();
  if (!user) return redirect('/register');
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <SiWorkplace />
                <span className="text-lg tracking-widest text-slate-300 font-bold">
                  WRMS
                </span>
              </Link>
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
