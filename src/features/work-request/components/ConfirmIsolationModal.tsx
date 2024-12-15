import { useWRModal } from '../hooks/modal-store';
import { ScrollArea } from '@/components/ui/scroll-area';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  employeeListByDept,
  getEmployeeByRole,
} from '@/features/employee/query';
import { useState } from 'react';
import { EmployeeComboBox } from './EmployeeComboBox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CheckCircle2, LoaderCircle } from 'lucide-react';
import { cn, wait } from '@/lib/utils';
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
} from '@/components/ui/responsive-modal';
import { assignOPEngr } from '@/features/timeline/actions';
import { toast } from 'sonner';
import { getSingleTimeline, TimeLineType } from '@/features/timeline/query';
import UserAvatar from '@/features/employee/components/UserAvatar';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { SubmitButton } from '@/components/submit-button';

export const ConfirmIsolationModal = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const { isIsolationMolalOpen, closeIsolationModal, timelineId } =
    useWRModal();
  const { data: shiftIncharges, isLoading: isLoadingSI } = useQuery({
    queryKey: ['employee-list', 'shiftIncharge'],
    queryFn: () => getEmployeeByRole('ShiftIncharge'),
  });
  const { data: oPEngrs, isLoading: isLoadingOP } = useQuery({
    queryKey: ['employee-list', 'OP'],
    queryFn: () => employeeListByDept('OP'),
  });
  const { data: timeline } = useQuery({
    queryKey: ['timeline', timelineId],
    queryFn: () => getSingleTimeline(timelineId as string),
    enabled: !!timelineId,
  });

  const {
    data: resultedTimeline,
    mutate,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({
      timelineId,
      shiftInchargeId,
      opEngrId,
    }: {
      timelineId: string;
      shiftInchargeId: string;
      opEngrId: string;
    }) => assignOPEngr(timelineId, shiftInchargeId, opEngrId),
    onSuccess: (data) => {
      setShiftInchargeId(undefined);
      setOpEngrId(undefined);
      queryClient.invalidateQueries({ queryKey: ['timeline', timelineId] });
      if (data.success) {
        toast.success(data.message, {
          id: 'assign-op',
        });

        return;
      }
      toast.error(data.message, { id: 'assign-op' });
    },
    onError: () => {
      toast.error('Something went wrong!', { id: 'assign-op' });
    },
  });

  const [shiftInchargeId, setShiftInchargeId] = useState<string | undefined>(
    timeline?.shiftEngrId as string | undefined
  );
  const selectedSI = shiftIncharges?.find(
    (person) => person.id === shiftInchargeId
  );

  function onSelectSI(id: string) {
    setShiftInchargeId(id);
  }
  const [opEngrId, setOpEngrId] = useState<string | undefined>(
    timeline?.opEngrId as string | undefined
  );
  const selectedOPEngr = oPEngrs?.find((person) => person.id === opEngrId);

  function onSelectOPEngr(id: string) {
    setOpEngrId(id);
  }
  async function onSubmit() {
    toast.loading('Assigning OP engineer...', { id: 'assign-op' });
    if (timelineId && shiftInchargeId && opEngrId) {
      mutate({ timelineId, shiftInchargeId, opEngrId });
    }
  }
  return (
    <ResponsiveModal
      open={isIsolationMolalOpen}
      onOpenChange={closeIsolationModal}
    >
      <ResponsiveModalContent>
        {timeline || !isPending ? (
          <>
            {timeline?.shiftEngineer &&
            timeline.operationEngineer &&
            timeline.opEngrAssignedAt ? (
              <DetailsPage timeline={timeline} />
            ) : (
              <>
                <ResponsiveModalHeader className=' text-2xl mx-6'>
                  Confirm Isolation
                </ResponsiveModalHeader>
                <ScrollArea className=' max-h-[85vh] space-y-6'>
                  <div className=' space-y-6'>
                    <div className='flex items-center '>
                      <Label className='min-w-[140px] pr-4'>
                        Shift Incharge:
                      </Label>
                      <EmployeeComboBox
                        title='Select Shift Incharge...'
                        isLoading={isLoadingSI}
                        allEmployeeList={shiftIncharges}
                        selectedEmployee={selectedSI}
                        onSelection={onSelectSI}
                        employeeId={shiftInchargeId}
                      />
                    </div>
                    <div className='flex items-center '>
                      <Label className='min-w-[140px] pr-4'>
                        Field OP Engineer:
                      </Label>

                      <EmployeeComboBox
                        title='Select Operation Field Engineer...'
                        isLoading={isLoadingOP}
                        allEmployeeList={oPEngrs}
                        selectedEmployee={selectedOPEngr}
                        onSelection={onSelectOPEngr}
                        employeeId={opEngrId}
                      />
                    </div>
                  </div>
                </ScrollArea>
                <ResponsiveModalFooter>
                  {shiftInchargeId && opEngrId && (
                    <SubmitButton
                      buttonText='Assign Engineer'
                      isPending={isPending}
                      disabled={isPending}
                      onClick={onSubmit}
                    />
                  )}
                </ResponsiveModalFooter>
              </>
            )}
          </>
        ) : (
          <div className=' space-y-6'>
            <Skeleton className='h-6 w-40' />
            <Skeleton className='h-5 w-72' />
          </div>
        )}
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

function DetailsPage({ timeline }: { timeline: TimeLineType }) {
  const oPAvatar = { name: timeline.operationEngineer?.name || 'unNamed' };
  const { operationEngineer, shiftEngineer } = timeline;

  const OPUser = (
    <UserAvatar
      name={operationEngineer?.name || 'UnNamed'}
      avatar={operationEngineer?.imageUrl}
      bagde
      department={operationEngineer?.designation?.department.shortName}
      designaiton={operationEngineer?.designation?.title}
    />
  );
  return (
    <>
      <ResponsiveModalHeader className=' text-2xl mx-6'>
        {timeline.isolationConfirmedAt ? (
          <>
            <CheckCircle2 className=' size-20 stroke-emerald-500 mx-auto' />
          </>
        ) : (
          <h1>Waiting for Isolation Confirmation...</h1>
        )}
      </ResponsiveModalHeader>
      {timeline.isolationConfirmedAt && (
        <div className='flex flex-wrap rounded-lg p-2 gap-2 items-center dark:bg-cyan-950 bg-cyan-100'>
          {OPUser} has confirmed the isolation at{' '}
          <span className='text-xs text-muted-foreground'>
            {format(timeline.isolationConfirmedAt, 'dd-MMM-yy, HH:mm')}
          </span>
        </div>
      )}
      <div className='flex flex-wrap items-center gap-2'>
        {' '}
        {OPUser} has been assigned for isolation by{' '}
        <UserAvatar
          name={shiftEngineer?.name || 'UnNamed'}
          avatar={shiftEngineer?.imageUrl}
          bagde
          department={shiftEngineer?.designation?.department.shortName}
          designaiton={shiftEngineer?.designation?.title}
        />{' '}
        {timeline.opEngrAssignedAt && (
          <>
            at{' '}
            <span className='text-xs text-muted-foreground'>
              {format(timeline.opEngrAssignedAt, 'dd-MMM-yy, HH:mm')}
            </span>
          </>
        )}
      </div>
    </>
  );
}
