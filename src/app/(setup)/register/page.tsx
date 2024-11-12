import { currentProfile } from '@/database/current-profile';
import { getDeptWithDesig } from '@/database/department';
import { RegisterForm } from '@/features/employee/register/components/register-form';
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
    if (!deptWithDesig || deptWithDesig?.length === 0)
      return <h1>Something went wrong</h1>;
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
