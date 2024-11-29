import { currentProfile } from '@/database/current-profile';
import UserAvatar from '@/features/employee/components/UserAvatar';
import { db } from '@/lib/prisma';
import React from 'react';
const MainPage = async () => {
  const user = await currentProfile();
  const department = await db.department.findMany();
  console.log(department);

  return (
    <div>
      MainPage
      <UserAvatar name="young man" avatar="/user-avatar/young.avif" />
    </div>
  );
};

export default MainPage;
