import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn, generateAvatar } from '@/lib/utils';
import { UserRound } from 'lucide-react';
import React from 'react';

const UserAvatar = ({
  avatar,
  name,
  designaiton,
  department,
  email,
  className,
}: {
  avatar?: string;
  name: string;
  designaiton?: string;
  department?: string;
  email?: string;
  className?: string;
}) => {
  const { text, bgColor } = generateAvatar(name);
  return (
    <div className={cn(' flex gap-2  p-2 items-center', className)}>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback
          className={`rounded-lg `}
          style={{ backgroundColor: bgColor }}
        >
          {/* <UserRound /> */}
          {text}
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold capitalize">{name}</span>
        {designaiton && department && (
          <span className="truncate text-xs capitalize">{`${designaiton}(${department})`}</span>
        )}
        {email && <span className="truncate text-xs ">{email}</span>}
      </div>
    </div>
  );
};

export default UserAvatar;
