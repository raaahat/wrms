import { buttonVariants } from '@/components/ui/button';
import { db } from '@/lib/prisma';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { TabbarNav } from './_components/tab-bar';

const DepartmentLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const deptList = await db.department.findMany();
  const tabItem = [
    {
      id: '0',
      name: 'Overview',
    },
    ...deptList,
  ];

  return (
    <>
      <TabbarNav items={tabItem} className=" p-4" />
      {children}
    </>
  );
};

export default DepartmentLayout;
