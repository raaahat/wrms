'use client';
import { EmployeeWithDetails } from '@/features/employee/type';
import { getTimelines } from '../query';
import { WrType } from '@prisma/client';
import { WorkRequestCard } from '@/features/work-request/components/wr-card';
import { TimeLineModal } from './TimeLineModal';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useTimelineModalStore } from '../timeline-modal-store';
import { ModeSwitcher } from '@/components/mode-switcher';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Check } from 'lucide-react';
import { format } from 'date-fns';
import { UserInfo } from '@/features/work-request/type';
import UserAvatar from '@/features/employee/components/UserAvatar';

export const MaintManagerPage = ({
  profile,
}: {
  profile: EmployeeWithDetails;
}) => {
  const isMechManager = profile.roles.some((role) => role.name === 'MManager');
  const isElecManager = profile.roles.some((role) => role.name === 'EManager');
  const type: WrType | undefined = isElecManager
    ? 'ELECTRICAL'
    : isMechManager
    ? 'MECHANICAL'
    : undefined;
  const { openModalWith } = useTimelineModalStore();
  const { data: timelines, isLoading } = useQuery({
    queryKey: ['timelines', type],
    queryFn: () => getTimelines(type),
  });
  if (!timelines) return 'loading...';
  return (
    <>
      <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
        <div className='flex items-center gap-2 px-4'></div>
        <div className=' ml-auto mr-6'>
          <ModeSwitcher />
        </div>
      </header>
      <TimeLineModal />
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 '>
        {timelines.length !== 0 &&
          timelines.map(
            ({
              maintEngrAssignedAt,
              maintManager,
              id,
              workRequest: {
                maintEngr,
                areaName,
                createdAt,
                status,
                title,
                type,
                creator,
                wrNo,
                remarks,
                runningHour,
              },
            }) => {
              const maintEngrForAvatar = maintEngr
                ? {
                    name: maintEngr.name,
                    avatar: maintEngr.imageUrl,
                    department:
                      maintEngr.designation?.department.shortName || 'None',
                    designation: maintEngr.designation?.title || 'Not set yet',
                  }
                : undefined;
              return (
                <WorkRequestCard
                  key={id}
                  workRequest={{
                    id,
                    areaName,
                    creator: {
                      name: creator.name,
                      avatar: creator.imageUrl,
                      department:
                        creator.designation?.department.shortName || 'None',
                      designation: creator.designation?.title || 'Not set yet',
                    },
                    createdAt,
                    status,
                    title,
                    type,
                    wrNo,
                    remarks,
                    runningHour,
                  }}
                >
                  {!maintEngr ? (
                    <Button
                      variant='outline'
                      size='sm'
                      className='rounded-full'
                      onClick={() => openModalWith(type, id)}
                    >
                      Assign Engineer
                    </Button>
                  ) : (
                    <HoverCardInfo
                      timeStamp={maintEngrAssignedAt}
                      user={maintEngrForAvatar}
                    />
                  )}
                </WorkRequestCard>
              );
            }
          )}
      </div>
    </>
  );
};
type HoverProps = {
  timeStamp?: Date | null;
  user?: UserInfo;
};
function HoverCardInfo({ timeStamp, user }: HoverProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant='ghost'
          size={'sm'}
          className='text-white rounded-lg bg-emerald-500 hover:bg-emerald-600 hover:text-white '
        >
          <Check />
          Assigned
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className='w-fit'>
        <div>
          <div className=' flex items-center'>
            <div className='w-fit text-sm'>Maint. Engr: </div>
            {user && (
              <UserAvatar
                name={user.name}
                avatar={user.avatar}
                department={user.department}
                designaiton={user.designation}
              />
            )}
          </div>

          {timeStamp && (
            <span className='text-xs text-muted-foreground'>
              Assigned at {format(timeStamp, 'dd-MMM-yy, HH:mm')}
            </span>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
