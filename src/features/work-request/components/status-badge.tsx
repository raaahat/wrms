import { Badge } from '@/components/ui/badge';
import { Status } from '@prisma/client';
import React from 'react';
import { getStatusColor, getStatusIcon } from '../constants';

export const StatusBadge = ({ status }: { status: Status }) => {
  const StatusIcon = getStatusIcon(status as Status);
  return (
    <Badge
      className={`${getStatusColor(
        status as Status
      )} text-white px-2 py-[0.011rem] text-[.61rem] font-medium`}
    >
      <StatusIcon className="w-3.5 h-3.5 mr-1" />
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
