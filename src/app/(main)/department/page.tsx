import DeptList from '@/components/settings/dept-list';
import { Button } from '@/components/ui/button';

import { db } from '@/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { DepartmentTable } from './_compontents/department-table';
import { Department } from '@prisma/client';

const SetupPage = async ({ data }: { data: Department }) => {
  // const user = await currentUser();

  // if (!user) {
  //   return auth().redirectToSignIn();
  // }

  // const profile = await db.employee.findUnique({
  //   where: {
  //     userId: user.id,
  //   },
  // });
  // if (!profile) {
  //   return redirect('/register');
  // }

  // if (!profile.verified) {
  //   return (
  //     <div>
  //       You are not verified yet. Please wait for confirmation from our head
  //     </div>
  //   );
  // }
  const departmentList = await db.department.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return (
    <div>
      <DepartmentTable data={departmentList} />
    </div>
  );
};

export default SetupPage;
