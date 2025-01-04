import { cn } from '@/lib/utils';
import { WrType } from '@prisma/client';
import { IoHammer } from 'react-icons/io5';
import { MdElectricalServices } from 'react-icons/md';
type Props = {
  type: WrType;
};
const TypeBadge_ = ({ type }: Props) => {
  return (
    <div
      className={cn(
        'flex items-center gap-1 font-geistMono  w-fit rounded-md px-2 text-white capitalize',
        type === 'MECHANICAL' && 'bg-indigo-600',
        type === 'ELECTRICAL' && 'bg-teal-700'
      )}
    >
      {type === 'MECHANICAL' && <IoHammer />}
      {type === 'ELECTRICAL' && <MdElectricalServices />}
      {type.toLowerCase()}
    </div>
  );
};
import React, { memo } from 'react';

export const TypeBadge = memo(TypeBadge_);
