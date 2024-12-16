'use client';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Clock,
  MapPin,
  PenToolIcon as Tool,
  Activity,
  FileText,
} from 'lucide-react';

import { StatusBadge } from './status-badge';
import UserAvatar from '@/features/employee/components/UserAvatar';
import { WorkRequestCardProps } from '@/features/timeline/types';
import { useQuery } from '@tanstack/react-query';
import { getSingleAreaFullName } from '@/features/Area/query';

export function WorkRequestCard({
  workRequest: {
    areaId,
    createdAt,
    creator,
    status,
    title,
    type,
    wrNo,
    remarks,
    runningHour,
  },
  children,
}: WorkRequestCardProps) {
  const { data: areaFullName, isLoading } = useQuery({
    queryKey: ['area', areaId],
    queryFn: () => getSingleAreaFullName(areaId as string),
    enabled: !!areaId,
  });
  const areaName = isLoading ? 'loading...' : areaFullName;
  return (
    <Card className='w-full max-w-lg hover:shadow-lg transition-shadow duration-300'>
      <CardHeader className='pb-2'>
        <div className='flex justify-between items-center mb-2'>
          <CardTitle className='text-lg font-bold '>{wrNo}</CardTitle>
          <StatusBadge status={status} className='' />
        </div>
        <h3 className='text-base font-semibold capitalize'>{title}</h3>
      </CardHeader>
      <CardContent className='pb-2'>
        <div className='grid grid-cols-2 gap-2 text-sm'>
          <div className='flex items-center gap-1 text-muted-foreground'>
            <MapPin className='w-4 h-4' />
            <span>{areaName}</span>
          </div>
          <div className='flex items-center gap-1 text-muted-foreground'>
            <Clock className='w-4 h-4' />
            <span>{format(createdAt, 'dd MMM yy, HH:mm')}</span>
          </div>
          <div className='flex items-center gap-1 text-muted-foreground'>
            <Tool className='w-4 h-4' />
            <span className='capitalize'>{type.toLowerCase()}</span>
          </div>
          {runningHour && (
            <div className='flex items-center gap-1 text-muted-foreground'>
              <Activity className='w-4 h-4' />
              <span>{runningHour} hrs</span>
            </div>
          )}
        </div>
        {remarks && (
          <div className='mt-2 flex items-start gap-1 text-muted-foreground'>
            <FileText className='w-4 h-4 mt-1 flex-shrink-0' />
            <p className='text-sm line-clamp-2'>{remarks}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className=' flex flex-col pt-2 items-start '>
        <div className='flex items-center'>
          <span className='text-sm text-muted-foreground'>WR created by</span>
          <UserAvatar
            name={creator.name}
            avatar={creator.avatar}
            bagde
            department={creator.department}
            designaiton={creator.designation}
          />
        </div>

        {children}
      </CardFooter>
    </Card>
  );
}
