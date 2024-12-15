'use client';
import { EmployeeWithDetails } from '@/features/employee/type';
import { TimeLineModal } from './TimeLineModal';

import { ModeSwitcher } from '@/components/mode-switcher';
import { GetTimelineForOPEngrType } from '../query';
import { WorkRequestCard } from '@/features/work-request/components/wr-card';

import { Button } from '@/components/ui/button';
import { HoverCardInfo } from './HoverCard';
import { useState } from 'react';
import { confirmIsolation } from '../actions';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { SubmitButton } from '@/components/submit-button';
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

export const OPEngrPanel = ({
  timelines,
}: {
  profile: EmployeeWithDetails;
  timelines: GetTimelineForOPEngrType;
}) => {
  const [submitting, setSubmitting] = useState(false);
  async function handleConfirmation(timelineId: string) {
    setSubmitting(true);
    toast.loading('Please wait..', { id: 'confirm-isolation' });
    const { success, message } = await confirmIsolation(timelineId);
    if (!success) {
      toast.error(message, { id: 'confirm-isolation' });
      setSubmitting(false);
      return;
    }
    toast.success(message, { id: 'confirm-isolation' });
    setSubmitting(false);
  }
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
        {timelines.map(
          ({
            id: timelineId,
            isolationConfirmedAt,
            workRequest: {
              title,
              createdAt,
              status,
              type,
              id,
              runningHour,
              areaId,
              wrNo,
              remarks,
              creator,
            },
          }) => {
            return (
              <WorkRequestCard
                workRequest={{
                  areaId,
                  title,
                  createdAt,
                  status,
                  type,
                  id,
                  runningHour,
                  wrNo,
                  remarks,
                  creator: {
                    avatar: creator.imageUrl,
                    name: creator.name,
                    department:
                      creator.designation?.department.shortName || 'None',
                    designation: creator.designation?.title || 'Not set yet',
                  },
                }}
              >
                <div className=' ml-auto mt-6'>
                  {isolationConfirmedAt ? (
                    <HoverCardInfo timeStamp={isolationConfirmedAt}>
                      you have confirmed isolation
                    </HoverCardInfo>
                  ) : (
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <SubmitButton buttonText='Confirm Isolation' />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            The maintenance team will commence work after
                            receiving your field isolation confirmation. Once
                            confirmed, the status of the work request will be
                            updated to 'ONGOING'.
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
                    // <Button
                    //   onClick={() => handleConfirmation(timelineId)}
                    //   disabled={submitting}
                    // >
                    //   {submitting && <Loader2 />}
                    //   Confirm Isolation
                    //   </Button>
                    //   <SubmitButton buttonText='Confirm Isolation'/>
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
