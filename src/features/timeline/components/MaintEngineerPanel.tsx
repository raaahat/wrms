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
import { Check, CheckCircle } from 'lucide-react';
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
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'sonner';
import { workFinishedByMaintEngr } from '../actions';
import { SubmitButton } from '@/components/submit-button';

export const MaintEngineerPanel = ({
  timelines,
}: {
  timelines: GetTimelineForMaintEngrType;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  async function handleConfirmation(timelineId: string) {
    setSubmitting(true);
    toast.loading('Please wait..', { id: 'work-finished' });
    const { success, message } = await workFinishedByMaintEngr(timelineId);
    if (!success) {
      toast.error(message, { id: 'work-finished' });
    } else {
      toast.success(message, { id: 'work-finished' });
      setDialogOpen(false);
    }
    setSubmitting(false);
  }
  return (
    <>
      <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
        <div className='flex items-center gap-2 px-4'></div>
        <div className=' ml-auto mr-6 flex items-center gap-4'>
          <ModeSwitcher />
          <UserButton />
        </div>
      </header>
      <TimeLineModal />
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 '>
        {timelines.length !== 0 &&
          timelines.map(
            ({
              id: wrId,

              areaId,
              creator,
              timelines: [
                {
                  id: timelineId,
                  maintManager,
                  maintEngrAssignedAt,
                  isolationConfirmedAt,
                  operationEngineer,
                  shiftEngineer,
                  workDoneAt,
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
                  key={wrId}
                  workRequest={{
                    creator: {
                      avatar: creator.imageUrl,
                      name: creator.name,
                      department:
                        creator.designation?.department.shortName || 'None',
                      designation: creator.designation?.title || 'Not set yet',
                    },
                    id: wrId,
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
                        <div className=' '>
                          <AlertTitle>
                            <CheckCircle className='my-auto  size-5 inline-flex mr-4' />
                            Isolation Confirmed!
                          </AlertTitle>
                          <AlertDescription className='flex flex-wrap items-center gap-1 text-sm '>
                            <UserAvatar
                              className=''
                              bagde
                              name={operationEngineer.name}
                              avatar={operationEngineer.imageUrl}
                              department={
                                operationEngineer.designation?.department
                                  .shortName
                              }
                              designaiton={operationEngineer.designation?.title}
                            />
                            confirmed the isolation directed by
                            <UserAvatar
                              bagde
                              name={shiftEngineer.name}
                              avatar={shiftEngineer.imageUrl}
                              department={
                                shiftEngineer.designation?.department.shortName
                              }
                              designaiton={shiftEngineer.designation?.title}
                              className='inline-flex'
                            />{' '}
                            at{' '}
                            <span className='text-xs italic underline'>
                              {format(isolationConfirmedAt, 'dd-MMM-yy, HH:mm')}
                            </span>
                            {!workDoneAt &&
                              'You can start your work and stay safe!'}
                          </AlertDescription>
                        </div>
                      </div>
                      {workDoneAt ? (
                        <WorkFinishedMessage />
                      ) : (
                        <AlertDialogButton
                          dialogOpen={dialogOpen}
                          handleConfirmation={handleConfirmation}
                          setDialogOpen={setDialogOpen}
                          submitting={submitting}
                          timelineId={timelineId}
                        />
                      )}
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

type AlertDialogButtonProps = {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  submitting: boolean;
  handleConfirmation: (id: string) => void;
  timelineId: string;
};
function AlertDialogButton({
  dialogOpen,
  setDialogOpen,
  submitting,
  handleConfirmation,
  timelineId,
}: AlertDialogButtonProps) {
  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button className=' ml-auto mt-4'>I have finished my work</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to mark this work request as 'FINISHED.' Once
            confirmed, the operation team will review the work. They will update
            the status to either 'DONE' if approved or 'U/O' if further action
            is required.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <SubmitButton
            buttonText='Confirm'
            onClick={() => handleConfirmation(timelineId)}
            disabled={submitting}
            isPending={submitting}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Dependencies: pnpm install lucide-react

import { CircleCheck, X } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

export default function WorkFinishedMessage() {
  return (
    // To make the notification fixed, add classes like `fixed bottom-4 right-4` to the container element.
    <div className='mt-4 z-[100] w-full rounded-lg border border-border bg-background px-4 py-3 shadow-lg shadow-black/5'>
      <div className='flex gap-2  items-center'>
        <CircleCheck
          className=' text-emerald-500'
          size={20}
          strokeWidth={2}
          aria-hidden='true'
        />
        <p className='flex-1 text-sm'>
          You finished the work, Operation team will review the work and update
          the status
        </p>
      </div>
    </div>
  );
}
