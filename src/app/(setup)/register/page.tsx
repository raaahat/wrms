import { currentProfile } from '@/database/current-profile';
import { getDeptWithDesig } from '@/database/department';
import { RegisterForm } from '@/features/register/components/register-form';
import { db } from '@/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const RegisterPage = async () => {
  const user = await currentUser();
  if (!user) {
    return auth().redirectToSignIn();
  }
  const employee = await currentProfile();
  if (!employee) {
    const { deptWithDesig } = await getDeptWithDesig();
    if (!deptWithDesig) return <h1>Something went wrong</h1>;
    const defaultValues = {
      name: `${user.firstName} ${user.lastName}`,
    };
    return (
      <RegisterForm
        defaultValues={defaultValues}
        deptWithDesig={deptWithDesig}
      />
    );
  }
  if (employee.verified) {
    return redirect('/');
  }
  return <div>Pending for verification... </div>;
};

export default RegisterPage;
