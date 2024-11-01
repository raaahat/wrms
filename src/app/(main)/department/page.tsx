import { db } from '@/lib/prisma';
import { DepartmentTable } from '@/features/department/components/department-table';

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
      shortName: true,
    },
  });
  return (
    <div>
      <DepartmentTable data={departmentList} />
    </div>
  );
};

export default SetupPage;
