import { ActionTooltip } from '@/components/action-tooltip';
import { Mode } from '@prisma/client';
import { GoStarFill } from 'react-icons/go';
import { LuStarOff } from 'react-icons/lu';
export const ModeBadge = ({ mode }: { mode: Mode }) => {
  return (
    <>
      {mode === 'STRICT' && (
        <ActionTooltip label='Strict mode'>
          <GoStarFill className='text-yellow-500 size-4' />
        </ActionTooltip>
      )}
    </>
  );
};
