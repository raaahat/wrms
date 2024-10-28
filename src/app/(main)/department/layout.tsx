import { db } from '@/lib/prisma';

import TabbarNav from '@/features/department/components/tab-bar';
import { DeptModalProvider } from '@/features/department/provider/modal-dept';
import { AnimationProvider } from '@/features/department/provider/animation-provider';

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
      <DeptModalProvider />
      <TabbarNav items={tabItem} className=" p-4" />
      <AnimationProvider tabItem={tabItem}>{children}</AnimationProvider>
    </>
  );
};

export default DepartmentLayout;
