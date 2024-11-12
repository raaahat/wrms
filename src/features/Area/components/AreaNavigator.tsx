'use client';
import { Button } from '@/components/ui/button';
import { AreaType } from '../query';
import { NestedItem } from './NestedItem';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import { createParentArea, deleteArea } from '../actions/area';
import { Check, Loader2, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAdding } from '../store';
import { cleanUpSpaces } from '@/lib/utils';

export const AreaNavigator = ({ areas }: { areas: AreaType }) => {
  const [isAddingParent, setIsAddingParent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [parentName, setParentName] = useState('');

  const { deletingId, setDeletingId, expand, toggleExpand } = useAdding();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast.loading('Creating an entry...', {
      id: 'create-parent',
    });
    setIsLoading(true);
    const { message, success } = await createParentArea(parentName);
    if (!success)
      toast.error(message, {
        id: 'create-parent',
      });
    if (success) {
      toast.success(message, {
        id: 'create-parent',
      });
      setIsAddingParent(false);
    }
    setIsLoading(false);
  }
  async function handleDelete() {
    toast.loading('Deleting...', {
      id: 'delete',
    });
    setIsLoading(true);
    const { message, success } = await deleteArea(deletingId);
    if (!success)
      toast.error(message, {
        id: 'delete',
      });
    if (success) {
      toast.success(message, {
        id: 'delete',
      });
      setDeletingId('');
    }
    setIsLoading(false);
  }

  return (
    <>
      <Dialog open={deletingId !== ''} onOpenChange={() => setDeletingId('')}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure to Delete?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant={'destructive'} onClick={handleDelete}>
              Delete{isLoading && <Loader2 className=" animate-spin" />}
            </Button>
            <Button onClick={() => setDeletingId('')}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="space-y-5 container min-w-fit max-w-[300px]">
        <div className=" flex items-center">
          <Button onClick={() => setIsAddingParent((prev) => !prev)}>
            {isAddingParent ? 'Cancel' : 'Add'}
          </Button>
          <Button
            variant={'outline'}
            size={'sm'}
            className=" ml-auto"
            onClick={toggleExpand}
          >
            {expand ? 'Collapse all' : 'Expand all'}
          </Button>
        </div>
        {isAddingParent && (
          <form className=" flex items-center" onSubmit={handleSubmit}>
            <Input
              className="mr-2 border pl-4 pr-2 py-1 rounded-lg bg-gray-200 transition-all"
              autoFocus
              onChange={(e) => setParentName(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="rounded-md p-1 bg-teal-400 ml-auto h-[28px] mr-2 "
              disabled={isLoading || cleanUpSpaces(parentName) === ''}
            >
              {isLoading ? (
                <Loader2
                  className="animate-spin text-white"
                  size={20}
                  strokeWidth={3}
                />
              ) : (
                <Check className=" text-white" strokeWidth={2.5} />
              )}
            </button>
            <button
              type="button"
              className="rounded-md p-1 bg-rose-400 ml-auto h-[28px] mr-2 "
              onClick={() => {
                setIsAddingParent(false);
              }}
            >
              <X className=" text-white " strokeWidth={2.5} />
            </button>
          </form>
        )}

        <div className=" flex flex-col gap-2 transition-all duration-1000">
          {areas.map((area) => {
            return (
              <NestedItem
                key={area.id}
                allChildren={area.children}
                name={area.name}
                id={area.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
