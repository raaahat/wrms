'use client';
import { Button } from '@/components/ui/button';
import { useWRModal } from '../hooks/modal-store';
import {
  ResponsiveModal,
  ResponsiveModalContent,
} from '@/components/ui/responsive-modal';
import { Activity, FileText, CircleCheckBig } from 'lucide-react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowDownRight, ArrowUpRight, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { StatusBadge } from './status-badge';
import { TypeBadge } from './TypeBadge';
import { ModeBadge } from './ModeBadge';
import { useSingleTimeline } from '../hooks/use-single-timeline';
import { GetAllWRType } from '../query';
import { Skeleton } from '@/components/ui/skeleton';
import { getStatusIcon } from '../constants';
import UserAvatar from '@/features/employee/components/UserAvatar';
import { Status } from '@prisma/client';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const TABS = ['Details', 'Timeline'] as const;

export const ViewDetailsModal = () => {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>(TABS[0]);

  const { isOpen, type, onClose } = useWRModal();
  const isModalOpen = isOpen && type === 'viewWr';
  const isMobile = useIsMobile();

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className=' pointer-events-auto md:min-w-[90vw] lg:min-w-[80vw] xl:min-w-[70vw] '>
        <ScrollArea className='max-h-[85vh]  '>
          {isMobile ? (
            <>
              <div className=' border-b'>
                {TABS.map((tab) => {
                  return (
                    <Button
                      variant={'ghost'}
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        'capitalize mx-1 text-muted-foreground',
                        activeTab === tab &&
                          'bg-muted text-primary border-b-2 border-primary'
                      )}
                    >
                      {tab}
                    </Button>
                  );
                })}
              </div>
              {activeTab === 'Details' && <Details />}
              {activeTab === 'Timeline' && <Timeline />}
            </>
          ) : (
            <div className='flex w-full h-full'>
              <Details className='bg-yellow-400 basis-[40%] flex-grow' />

              <Timeline className='basis-[60%] flex-grow' />
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

function Details({ className }: { className?: string }) {
  const { data } = useWRModal();
  const workRequest = data.wrInfo;
  if (!workRequest) return null;
  return (
    <Card className='bg-secondary border-none '>
      <CardHeader>
        <CardTitle className='flex justify-between items-center'>
          <h2 className='text-xl font-semibold flex items-center gap-1'>
            {workRequest.wrNo} <ModeBadge mode={workRequest.mode} />
          </h2>
          <StatusBadge status={workRequest.status} />
        </CardTitle>
        <CardDescription>{workRequest.title}</CardDescription>
        <TypeBadge type={workRequest.type} />
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 gap-2 text-sm'>
          <div className='flex items-center gap-1 text-muted-foreground'>
            <MapPin className='w-4 h-4' />
            <span>{workRequest.allParentAreas.join(', ')}</span>
          </div>
          <div className='flex items-center gap-1 text-muted-foreground'>
            <Clock className='w-4 h-4' />
            <span>{format(workRequest.createdAt, 'dd MMM yy, HH:mm')}</span>
          </div>
          {workRequest.runningHour && (
            <div className='flex items-center gap-1 text-muted-foreground'>
              <Activity className='w-4 h-4' />
              <span>{workRequest.runningHour} hrs</span>
            </div>
          )}
        </div>
        {workRequest.remarks && (
          <div className='mt-2 flex items-start gap-1 text-muted-foreground'>
            <FileText className='w-4 h-4 mt-1 flex-shrink-0' />
            <p className='text-sm line-clamp-2'>{workRequest.remarks}</p>
          </div>
        )}
        {workRequest.referredFromId && (
          <InfoItem
            icon={ArrowUpRight}
            label='Referred From'
            value={workRequest.referredFromId}
          />
        )}
        {workRequest.referredToId && (
          <InfoItem
            icon={ArrowDownRight}
            label='Referred To'
            value={workRequest.referredToId}
          />
        )}
      </CardContent>
    </Card>
  );
}
function Timeline({ className }: { className?: string }) {
  const { data } = useWRModal();
  const workRequest = data.wrInfo;
  if (!workRequest) return 'nothing to show';
  if (workRequest.mode === 'NORMAL')
    return <NormalTimeline className={className} workRequest={workRequest} />;
  if (workRequest.mode === 'STRICT' && workRequest.timelines[0].id)
    return (
      <StrictTimeline
        className={className}
        workRequest={workRequest}
        timelineId={workRequest.timelines[0].id}
      />
    );
}

function NormalTimeline({
  workRequest,
  className,
}: {
  workRequest: GetAllWRType;
  className?: string;
}) {
  return (
    <Card className={cn(' w-full border-none ml-6', className)}>
      <CardHeader>
        <CardTitle>Timeline</CardTitle>
        <CardDescription>Work Request Timeline</CardDescription>
      </CardHeader>
      <CardContent>Timeline</CardContent>
    </Card>
  );
}

function StrictTimeline({
  workRequest,
  className,
  timelineId,
}: {
  workRequest: GetAllWRType;
  className?: string;
  timelineId: string;
}) {
  const { timeline, isLoading } = useSingleTimeline(timelineId);
  if (!timeline || isLoading)
    return (
      <>
        <Card className={cn('h-full w-full border-none ml-6', className)}>
          <CardHeader>
            <CardTitle>
              <Skeleton className=' h-5  w-20' />
            </CardTitle>
            <CardDescription>
              <Skeleton className=' h-4 w-60' />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className=' h-5 w-16' />
          </CardContent>
        </Card>
      </>
    );

  const isPending = timeline.maintManagerId && timeline.maintEngrAssignedAt;
  const isOngoing =
    timeline.shiftEngrId &&
    timeline.opEngrAssignedAt &&
    timeline.opEngrAssignedAt;

  const { name, designation, imageUrl } = workRequest.creator;
  const creator = {
    name,
    department: designation?.department.shortName,
    designation: designation?.title,
    avatar: imageUrl,
  };

  const maintManager = {
    name: timeline.maintManager?.name || 'Maintenance Manager',
    department: timeline.maintManager?.designation?.department.shortName,
    designation: timeline.maintManager?.designation?.title,
    avatar: timeline.maintManager?.imageUrl,
  };

  const maintEngr = {
    name: workRequest.maintEngr?.name || 'Maintenance Engineer',
    department: workRequest.maintEngr?.designation?.department.shortName,
    designation: workRequest.maintEngr?.designation?.title,
    avatar: workRequest.maintEngr?.imageUrl,
  };

  const shiftIncharge = {
    name: timeline.shiftEngineer?.name || 'Shift Incharge',
    department: timeline.shiftEngineer?.designation?.department.shortName,
    designation: timeline.shiftEngineer?.designation?.title,
    avatar: timeline.shiftEngineer?.imageUrl,
  };
  const opEngr = {
    name: timeline.operationEngineer?.name || 'Operation Engineer',
    department: timeline.operationEngineer?.designation?.department.shortName,
    designation: timeline.operationEngineer?.designation?.title,
    avatar: timeline.operationEngineer?.imageUrl,
  };

  let shouldRender = true;

  return (
    <Card className={cn(' w-full border-none ml-6', className)}>
      <CardHeader>
        <CardTitle>Timeline</CardTitle>
        <CardDescription>Work Request Timeline</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <ol className='relative border-l border-gray-200 dark:border-gray-700'>
          <TimelineItem
            icon={getStatusIcon('PLACED')}
            status='PLACED'
            time={workRequest.createdAt}
            title='Work Request Created'
          >
            <span className='inline-flex items-center align-middle'>
              <UserAvatar bagde {...creator} />
            </span>
            placed the work request
          </TimelineItem>
          {shouldRender && (
            <>
              {isPending ? (
                <TimelineItem
                  icon={getStatusIcon('PENDING')}
                  status='PENDING'
                  time={timeline.maintEngrAssignedAt as Date}
                  title='Assigned to Maintenance Engineer'
                >
                  <span className='inline-flex items-center align-middle'>
                    <UserAvatar bagde {...maintManager} />
                  </span>
                  assigned
                  <span className='inline-flex items-center align-middle'>
                    <UserAvatar bagde {...maintEngr} />
                  </span>
                  for this work
                </TimelineItem>
              ) : (
                <TimelineItem
                  icon={getStatusIcon('PENDING')}
                  title='Waiting for Maintenance Manager Approval'
                >
                  Maintenance Manager will assign the work request to a
                  maintenance engineer
                </TimelineItem>
              )}
            </>
          )}
          {(shouldRender = shouldRender && !!isPending)}
          {shouldRender && (
            <>
              {isOngoing ? (
                <TimelineItem
                  icon={getStatusIcon('ONGOING')}
                  status='ONGOING'
                  time={timeline.opEngrAssignedAt as Date}
                  title='Isolation Confirmed'
                >
                  {' '}
                  Shift Incharge
                  <span className='inline-flex items-center align-middle'>
                    <UserAvatar bagde {...shiftIncharge} />
                  </span>
                  and Operation Engineer{' '}
                  <span className='inline-flex items-center align-middle'>
                    <UserAvatar bagde {...opEngr} />
                  </span>{' '}
                  has confirmed the isolation{' '}
                  {timeline.opEngrAssignedAt && (
                    <>
                      at{' '}
                      <time className='text-primary text-sm'>
                        {format(timeline.opEngrAssignedAt, 'dd MMM yy, HH:mm')}
                      </time>
                    </>
                  )}
                </TimelineItem>
              ) : (
                <TimelineItem
                  icon={getStatusIcon('ONGOING')}
                  title='Waiting for Isolation Confirmation'
                >
                  Operation Engineer will confirm the isolation
                </TimelineItem>
              )}
            </>
          )}
          {(shouldRender = shouldRender && !!isOngoing)}

          {shouldRender && (
            <>
              {timeline.workDoneAt ? (
                <TimelineItem
                  icon={getStatusIcon('FINISHED')}
                  status='FINISHED'
                  time={timeline.workDoneAt as Date}
                  title='Work Finished'
                >
                  Work has been finished by{' '}
                  <span className='inline-flex items-center align-middle'>
                    <UserAvatar bagde {...maintEngr} />
                  </span>{' '}
                  at{' '}
                  <time className='text-primary text-sm'>
                    {format(timeline.workDoneAt, 'dd MMM yy, HH:mm')}
                  </time>
                </TimelineItem>
              ) : (
                <TimelineItem
                  icon={getStatusIcon('DONE')}
                  title='Waiting for the Work to be Finished by Maintenance'
                >
                  Maintenance Engineer will confirm the work done
                </TimelineItem>
              )}
            </>
          )}
          {(shouldRender = shouldRender && !!timeline.workDoneAt)}

          {shouldRender && (
            <>
              {workRequest.status === 'FINISHED' ? (
                <TimelineItem
                  icon={getStatusIcon(workRequest.status)}
                  title='Waiting for Operation Team Review'
                >
                  The Operation Team will review the completed work and update
                  the status accordingly.
                </TimelineItem>
              ) : (
                <TimelineItem
                  icon={getStatusIcon(workRequest.status)}
                  title='Work Request Closed'
                >
                  The status of the work request is now
                  <span className='mx-1 inline-flex items-center align-middle'>
                    <StatusBadge status={workRequest.status} />
                  </span>
                </TimelineItem>
              )}
            </>
          )}
        </ol>
      </CardContent>
    </Card>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className='flex items-center gap-3'>
      <div className=' p-2 rounded-full'>
        <Icon className='w-4 h-4' />
      </div>
      <div>
        <span className='text-sm  block'>{label}</span>
        <p className='text-sm font-medium '>{value}</p>
      </div>
    </div>
  );
}

function TimelineItem({
  time,
  title,
  icon,
  children,
  status,
}: {
  status?: Status;
  time?: Date;
  title: string;
  icon: React.ElementType<any, keyof JSX.IntrinsicElements>;
  children?: React.ReactNode;
}) {
  const Icon = icon;
  return (
    <li className='mb-10 ml-6'>
      <span className='absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-8 ring-white dark:ring-gray-900 dark:bg-gray-700'>
        <Icon />
      </span>
      <h3 className='flex items-center mb-1 pt-1 text-lg font-semibold text-gray-900 dark:text-white'>
        {title}
        {time ? (
          <CircleCheckBig className='w-6 h-6 ml-2 text-emerald-500' />
        ) : (
          <span className='bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 ml-3'>
            Current
          </span>
        )}
      </h3>
      {time && (
        <span className='flex items-center gap-1 mb-2'>
          <time className='text-sm font-normal leading-none text-muted-foreground '>
            {format(time, 'dd MMM yy, HH:mm')}
          </time>
          {status && <StatusBadge status={status} />}
        </span>
      )}

      <p className='mb-4 text-base font-normal text-gray-500 dark:text-gray-400'>
        {children}
      </p>
    </li>
  );
}
