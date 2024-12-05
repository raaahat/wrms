'use client';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Check } from 'lucide-react';
import { format } from 'date-fns';

import UserAvatar from '@/features/employee/components/UserAvatar';
import { UserInfo } from '@/features/employee/type';

type HoverProps = {
  timeStamp?: Date | null;
  user?: UserInfo;
  children?: React.ReactNode;
};
export function HoverCardInfo({ timeStamp, user, children }: HoverProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant='ghost'
          size={'sm'}
          className='text-white rounded-lg bg-emerald-500 hover:bg-emerald-600 hover:text-white '
        >
          <Check />
          {children ? children : 'Done'}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className='w-fit'>
        <div>
          <div className=' flex items-center'>
            {user && (
              <>
                {' '}
                <div className='w-fit text-sm'>Maint. Engr: </div>
                <UserAvatar
                  name={user.name}
                  avatar={user.avatar}
                  department={user.department}
                  designaiton={user.designation}
                />
              </>
            )}
          </div>

          {timeStamp && (
            <span className='text-xs text-muted-foreground'>
              Done at {format(timeStamp, 'dd-MMM-yy, HH:mm')}
            </span>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
