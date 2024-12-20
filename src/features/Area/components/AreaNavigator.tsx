'use client';
import { Button } from '@/components/ui/button';
import { AreaType } from '../query';
import { NestedItem } from './NestedItem';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

import { createParentArea, deleteArea } from '../actions/area';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAdding } from '../store';
import { cleanUpSpaces } from '@/lib/utils';
import { AccordionBlock } from './accordion';
import { useAsyncAction } from '@/hooks/use-async-action';

export const AreaNavigator = ({ areas }: { areas: AreaType }) => {
  const [isAddingParent, setIsAddingParent] = useState(false);
  const create = useAsyncAction('create-parent');
  const deleteItem = useAsyncAction('delete');

  const [parentName, setParentName] = useState('');

  const { deletingId, setDeletingId } = useAdding();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const success = await create.performAction(() =>
      createParentArea(parentName)
    );
    if (success) {
      setParentName('');
      setIsAddingParent(false);
    }
  }
  async function handleDelete() {
    const success = await deleteItem.performAction(() =>
      deleteArea(deletingId)
    );
    if (success) {
      setDeletingId('');
    }
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
              Delete
              {deleteItem.isSubmitting && <Loader2 className=' animate-spin' />}
            </Button>
            <Button onClick={() => setDeletingId('')}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className='space-y-5 container min-w-fit max-w-[300px]'>
        <div className=' flex items-center'>
          <Button onClick={() => setIsAddingParent((prev) => !prev)}>
            {isAddingParent ? 'Cancel' : 'Add'}
          </Button>
        </div>
        <div className=' flex flex-col gap-2 transition-all duration-1000'>
          {isAddingParent && (
            <form
              className='min-w-[300px] max-w-[350px]'
              onSubmit={handleSubmit}
            >
              <AccordionBlock>
                <Input
                  value={parentName}
                  className='focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 h-full border-none bg-inherit w-full '
                  type='text'
                  autoFocus
                  onChange={(e) => setParentName(e.target.value)}
                  disabled={create.isSubmitting}
                />

                <button
                  type='submit'
                  className=' ml-auto m-2 bg-slate-100 rounded-md px-1 hover:bg-slate-400'
                  disabled={
                    create.isSubmitting || cleanUpSpaces(parentName) === ''
                  }
                >
                  {create.isSubmitting ? (
                    <Loader2
                      className='animate-spin text-white'
                      size={20}
                      strokeWidth={3}
                    />
                  ) : (
                    '✔'
                  )}
                </button>
                <button
                  type='button'
                  className=' ml-auto mr-2 bg-slate-100 rounded-md px-1 hover:bg-slate-400'
                  onClick={() => {
                    setIsAddingParent(false);
                  }}
                >
                  ❌
                </button>
              </AccordionBlock>
            </form>
          )}
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
