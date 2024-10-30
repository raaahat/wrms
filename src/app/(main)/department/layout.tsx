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

  const navItem = [
    {
      title: 'overview',
      href: '/department',
    },
    ...deptList.map((dept) => {
      return {
        title: dept.name,
        href: `/department/${dept.name}`,
      };
    }),
  ];

  return (
    <>
      <DeptModalProvider />
      <TabbarNav items={navItem} className=" p-4" />
      <AnimationProvider tabItem={navItem}>{children}</AnimationProvider>
    </>
  );
};

export default DepartmentLayout;
