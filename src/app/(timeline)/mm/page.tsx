import { currentProfile } from '@/database/current-profile';
import { MaintManagerPage } from '@/features/timeline/components/maint-manager-page';
import { redirect } from 'next/navigation';
import React from 'react';

const MMpage = async () => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect('/register');
  }
  if (
    profile.roles.some(
      (role) => role.name === 'MManager' || role.name === 'EManager'
    )
  ) {
    return <MaintManagerPage profile={profile} />;
  }
  return <div>No actions required</div>;
};

export default MMpage;
