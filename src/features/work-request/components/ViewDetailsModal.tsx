'use client';
import { Button } from '@/components/ui/button';
import { useWRModal } from '../hooks/modal-store';
import {
  ResponsiveModal,
  ResponsiveModalContent,
} from '@/components/ui/responsive-modal';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  MapPin,
  Wrench,
} from 'lucide-react';
import { format } from 'date-fns';

const TABS = ['Details', 'Timeline'] as const;

export const ViewDetailsModal = () => {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>(TABS[0]);

  const { isOpen, type, onClose } = useWRModal();
  const isModalOpen = isOpen && type === 'viewWr';
  const isMobile = useIsMobile();
  return (
    <ResponsiveModal open={isModalOpen} onOpenChange={onClose}>
      <ResponsiveModalContent className=' pointer-events-auto lg:min-w-[600px]'>
        <ScrollArea className=' max-h-[85vh] '>
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
            <>
              <div className='flex'>
                <Details className='w-60' />
                <Timeline className='flex-1' />
              </div>
            </>
          )}
        </ScrollArea>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

function Details({ className }: { className?: string }) {
  const { data } = useWRModal();
  const workRequest = data.wrInfo;
  if (!workRequest) return null;
  return (
    <div className={cn('bg-purple-900 w-full h-60', className)}>
      <InfoItem
        icon={Clock}
        label='Created'
        value={format(workRequest.createdAt, 'PPpp')}
      />
      <InfoItem
        icon={MapPin}
        label='Area'
        value={workRequest.allParentAreas.join(', ')}
      />
      <InfoItem icon={Wrench} label='Type' value={workRequest.type} />
      <InfoItem icon={AlertTriangle} label='Mode' value={workRequest.mode} />
      {workRequest.runningHour && (
        <InfoItem
          icon={Activity}
          label='Running Hour'
          value={workRequest.runningHour}
        />
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
      <div>
        Work Request sdgs Lorem ipsum dolor sit amet consectetur, adipisicing
        elit. Numquam illo explicabo, expedita delectus porro vitae tenetur quis
        iste amet est.
      </div>
    </div>
  );
}
function Timeline({ className }: { className?: string }) {
  return (
    <div className={cn('bg-teal-900 w-full h-60', className)}>Timeline</div>
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
      <div className='bg-blue-100 p-2 rounded-full'>
        <Icon className='w-4 h-4 text-blue-500' />
      </div>
      <div>
        <span className='text-sm text-gray-500 block'>{label}</span>
        <p className='text-sm font-medium text-gray-700'>{value}</p>
      </div>
    </div>
  );
}
