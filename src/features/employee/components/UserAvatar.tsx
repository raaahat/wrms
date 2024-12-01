import { ActionTooltip } from '@/components/action-tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn, generateAvatar } from '@/lib/utils';

const UserAvatar = ({
  avatar,
  name,
  designaiton,
  department,
  email,
  className,
  bagde = false,
}: {
  avatar?: string;
  name: string;
  designaiton?: string;
  department?: string;
  email?: string;
  className?: string;
  bagde?: boolean;
}) => {
  const { text, bgColor } = generateAvatar(name);
  if (bagde)
    return (
      <ActionTooltip
        label={`${designaiton || 'not available'}(${
          department?.toUpperCase() || 'none'
        })`}
      >
        <div
          className={cn(
            'bg-primary/10 text-foreground flex gap-1 w-fit rounded-full  px-1 py-1 items-center hover:bg-muted',
            className
          )}
        >
          <Avatar className='h-5 w-5 rounded-full'>
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback
              className={`rounded-lg text-sm text-white`}
              style={{ backgroundColor: bgColor }}
            >
              {text}
            </AvatarFallback>
          </Avatar>
          <span className=' text-xs capitalize pr-1 '>{name}</span>
        </div>
      </ActionTooltip>
    );
  return (
    <div className={cn(' flex gap-2  p-2 items-center  rounded-md', className)}>
      <Avatar className='h-8 w-8 rounded-lg'>
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback
          className={`rounded-lg `}
          style={{ backgroundColor: bgColor }}
        >
          {text}
        </AvatarFallback>
      </Avatar>
      <div className='grid flex-1 text-left text-sm leading-tight'>
        <span className='truncate font-semibold capitalize'>{name}</span>
        {designaiton && department && (
          <span className='truncate text-xs capitalize'>{`${designaiton}(${department})`}</span>
        )}
        {email && <span className='truncate text-xs '>{email}</span>}
      </div>
    </div>
  );
};

export default UserAvatar;
