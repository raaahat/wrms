import { Badge } from '@/components/ui/badge';
import { Status } from '@prisma/client';
import React from 'react';
import { getStatusColor, getStatusIcon } from '../constants';
import { cn } from '@/lib/utils';
import clsx from 'clsx';

export const StatusBadge = ({
  status,
  className,
}: {
  status: Status;
  className?: string;
}) => {
  const StatusIcon = getStatusIcon(status as Status);
  const color = getStatusColor(status as Status);
  return (
    <Badge
      className={clsx(
        'text-white',
        `bg-${color}`,
        `hover:bg-${color}/80`,
        className
      )}
    >
      <StatusIcon className='w-3.5 h-3.5 mr-1' />
      <span>{status === 'UNDER_OBSERVATION' ? 'U/O' : status}</span>
    </Badge>
  );
  // return (
  //   <Badge
  //     className={`${getStatusColor(
  //       status
  //     )} text-white px-2 py-[0.011rem] text-[.61rem] font-medium`}
  //   >
  //     {status === 'UNDER_OBSERVATION' ? 'U/O' : status}
  //   </Badge>
  // );
};
