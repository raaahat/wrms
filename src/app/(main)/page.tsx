import UserAvatar from '@/features/employee/components/UserAvatar';
import { generateAvatar } from '@/lib/utils';

import React from 'react';
const MainPage = async () => {
  console.log('Employee', generateAvatar('Employee'));
  console.log('MManager', generateAvatar('MManager'));
  return (
    <div>
      MainPage
      <UserAvatar name='young man' avatar='/user-avatar/young.avif' />
    </div>
  );
};

export default MainPage;
