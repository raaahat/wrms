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
import { HoverCardInfo } from './HoverCard';

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
                  <div className='ml-auto'>
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
                  </div>
                </WorkRequestCard>
              );
            }
          )}
      </div>
    </>
  );
};
