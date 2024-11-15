'use client';
import { Button } from '@/components/ui/button';
import { currentProfile } from '@/database/current-profile';
import UserAvatar from '@/features/employee/components/UserAvatar';
import { useWRModal } from '@/features/work-request/hooks/modal-store';
import { redirect } from 'next/navigation';

const WRpage = () => {
  // const user = await currentProfile();
  // if (!user) return redirect('/register');
  const { onOpen } = useWRModal();
  return (
    <div>
      <Button onClick={() => onOpen('createWR')}>Create WR</Button>
      {/* <div>
        <UserAvatar
          name={user.name}
          department={user.designation?.department.shortName}
          designaiton={user.designation?.title}
        />
      </div> */}
    </div>
  );
};

export default WRpage;
