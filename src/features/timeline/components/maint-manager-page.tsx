import { EmployeeWithDetails } from '@/features/employee/type';
import { getTimelines } from '../query';
import { WrType } from '@prisma/client';
import { WorkRequestCard } from '@/features/work-request/components/wr-card';

export const MaintManagerPage = async ({
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
  const timelines = await getTimelines(type);

  console.log(timelines);
  return (
    <>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {timelines.length !== 0 &&
          timelines.map(
            ({
              id,
              workRequest: {
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
              return (
                <WorkRequestCard
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
                />
              );
            }
          )}
      </div>
    </>
  );
};
