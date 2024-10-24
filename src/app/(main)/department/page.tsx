import DeptList from '@/components/settings/dept-list';
import { Button } from '@/components/ui/button';

import { db } from '@/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const SetupPage = async () => {
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
      <DeptList dept={departmentList} />;<div className="h-[2000px]"></div>
    </div>
  );
};

export default SetupPage;
