import { currentProfile } from '@/database/current-profile';
import { redirect } from 'next/navigation';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { Separator } from '@/components/ui/separator';

import { ModeSwitcher } from '@/components/mode-switcher';
const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentProfile();
  if (!user) return redirect('/register');
  return (
    <SidebarProvider>
      <AppSidebar
        user={{ name: user.name, email: user.email, imageUrl: user.imageUrl }}
      />
      <SidebarInset>
        <div className='flex flex-col h-screen'>
          <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
            <div className='flex items-center gap-2 px-4'>
              <SidebarTrigger className='-ml-1' />
              <Separator orientation='vertical' className='mr-2 h-4' />
              {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
            </div>
            <div className=' ml-auto mr-6'>
              <ModeSwitcher />
            </div>
          </header>
          <main>{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
