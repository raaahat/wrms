'use client';
import { EmployeeWithDetails } from '@/features/employee/type';
import { WorkRequestCard } from '@/features/work-request/components/wr-card';
import { TimeLineModal } from './TimeLineModal';

import { Button } from '@/components/ui/button';

import { ModeSwitcher } from '@/components/mode-switcher';
import { HoverCardInfo } from './HoverCard';
import { GetTimelineForMaintEngrType } from '../query';
import UserAvatar from '@/features/employee/components/UserAvatar';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { getSingleAreaFullName } from '@/features/Area/query';

export const MaintEngineerPanel = ({
  timelines,
}: {
  profile: EmployeeWithDetails;
  timelines: GetTimelineForMaintEngrType;
}) => {
  const { data: areaFullName, isLoading } = useQuery({
    queryKey: ['area', timelines[0].areaId],
    queryFn: () => getSingleAreaFullName(timelines[0].areaId),
  });
  const areaName = isLoading ? 'loading...' : areaFullName;
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
              id,
              creator,
              timelines: [{ maintManager, maintEngrAssignedAt }],
              createdAt,
              status,
              title,
              type,
              wrNo,
              remarks,
              runningHour,
            }) => {
              return (
                <WorkRequestCard
                  key={id}
                  workRequest={{
                    creator: {
                      avatar: creator.imageUrl,
                      name: creator.name,
                      department:
                        creator.designation?.department.shortName || 'None',
                      designation: creator.designation?.title || 'Not set yet',
                    },
                    id,
                    areaName,
                    createdAt,
                    status,
                    title,
                    type,
                    wrNo,
                    remarks,
                    runningHour,
                  }}
                >
                  {maintManager && maintEngrAssignedAt && (
                    <div className=' rounded-lg bg-muted px-2 py-1 mt-4 bg-emerald-100 dark:bg-emerald-900'>
                      <p className='flex flex-wrap items-center gap-1 text-sm '>
                        You have been assigned for this task by
                        <UserAvatar
                          bagde
                          name={maintManager.name}
                          avatar={maintManager.imageUrl}
                          department={
                            maintManager.designation?.department.shortName
                          }
                          designaiton={maintManager.designation?.title}
                        />
                        at{' '}
                        <span className='text-xs italic underline'>
                          {format(maintEngrAssignedAt, 'dd-MMM-yy, HH:mm')}
                        </span>
                      </p>
                    </div>
                  )}
                  <Button className=' mx-auto mt-4' variant={'outline'}>
                    Waiting for isolation confirmation...
                  </Button>
                </WorkRequestCard>
              );
            }
          )}
      </div>
    </>
  );
};
