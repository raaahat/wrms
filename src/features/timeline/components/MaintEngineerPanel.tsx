'use client';
import { EmployeeWithDetails } from '@/features/employee/type';
import { WorkRequestCard } from '@/features/work-request/components/wr-card';
import { TimeLineModal } from './TimeLineModal';

import { Button } from '@/components/ui/button';

import { ModeSwitcher } from '@/components/mode-switcher';
import { GetTimelineForMaintEngrType } from '../query';
import UserAvatar from '@/features/employee/components/UserAvatar';
import { format } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export const MaintEngineerPanel = ({
  timelines,
}: {
  profile: EmployeeWithDetails;
  timelines: GetTimelineForMaintEngrType;
}) => {
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

              areaId,
              creator,
              timelines: [
                {
                  maintManager,
                  maintEngrAssignedAt,
                  isolationConfirmedAt,
                  operationEngineer,
                  shiftEngineer,
                },
              ],
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
                    areaId,
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
                    <div className=' rounded-lg px-3 py-3 mt-4 bg-muted '>
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
                  {isolationConfirmedAt &&
                  shiftEngineer &&
                  operationEngineer ? (
                    <>
                      <div className='bg-teal-100 text-green-800 dark:bg-teal-950 dark:text-green-100 w-full rounded-lg p-3 mt-4 flex items-center gap-4 '>
                        <Check className='my-auto  size-8 ' />
                        <div className=' '>
                          <AlertTitle>Isolation Confirmed!</AlertTitle>
                          <AlertDescription className='flex flex-wrap items-center gap-1 text-sm '>
                            <UserAvatar
                              bagde
                              name={operationEngineer.name}
                              avatar={operationEngineer.imageUrl}
                              department={
                                operationEngineer.designation?.department
                                  .shortName
                              }
                              designaiton={operationEngineer.designation?.title}
                            />{' '}
                            confirmed the isolation directed by{' '}
                            <UserAvatar
                              bagde
                              name={shiftEngineer.name}
                              avatar={shiftEngineer.imageUrl}
                              department={
                                shiftEngineer.designation?.department.shortName
                              }
                              designaiton={shiftEngineer.designation?.title}
                            />{' '}
                            at{' '}
                            <span className='text-xs italic underline'>
                              {format(isolationConfirmedAt, 'dd-MMM-yy, HH:mm')}
                            </span>
                            Please continue your work and be safe!
                          </AlertDescription>
                        </div>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button className=' ml-auto mt-4'>
                            I have finished my work
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              The status of the work request will be set to
                              'FINISHED', Operation team will check the work and
                              upon confirmation, the status will be set to
                              'DONE' or 'U/O'.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  ) : (
                    <Button className=' mx-auto mt-4' variant={'outline'}>
                      Waiting for isolation confirmation...
                    </Button>
                  )}
                </WorkRequestCard>
              );
            }
          )}
      </div>
    </>
  );
};
