import { RoleName } from '@prisma/client';
import { roleConfig } from '../config';

type RoleBadgeProps = {
  role: RoleName;
};
export const RoleBadge: React.FC<RoleBadgeProps> = ({ role }) => {
  const { bgColor, textColor, icon } = roleConfig[role];

  return (
    <span
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      className='inline-flex gap-1 px-2 py-1 rounded-md border border-border text-sm font-medium'
    >
      <span>{icon}</span>
      {role}
    </span>
  );
};
