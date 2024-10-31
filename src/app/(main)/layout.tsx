import CustomLayout from '@/components/layout/custom-layout';
import { currentProfile } from '@/database/current-profile';
import { redirect } from 'next/navigation';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentProfile();
  if (!user) return redirect('/register');
  return <CustomLayout user={user}>{children}</CustomLayout>;
};

export default DashboardLayout;
