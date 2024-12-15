import { currentProfile } from '@/database/current-profile';
import { redirect } from 'next/navigation';

const MainPage = async () => {
  const profile = await currentProfile();
  if (!profile || !profile.verified) return redirect('/register');
  return <div>MainPage</div>;
};

export default MainPage;
