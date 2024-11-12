'use client';
import { Button } from '@/components/ui/button';
import { AreaType } from '../query';
import { NestedItem } from './NestedItem';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import { createParentArea } from '../actions/area';
import { Check, Loader2, X } from 'lucide-react';

export const AreaNavigator = ({ areas }: { areas: AreaType }) => {
  const [isAddingParent, setIsAddingParent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [parentName, setParentName] = useState('');
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

  return (
    <div className="space-y-5">
      <Button onClick={() => setIsAddingParent((prev) => !prev)}>
        {isAddingParent ? 'Cancel' : 'Add'}
      </Button>
      {isAddingParent && (
        <form
          className="max-w-[300px] flex items-center"
          onSubmit={handleSubmit}
        >
          <Input
            className="mr-2 max-w-fit border pl-4 pr-2 py-1 rounded-lg bg-gray-200 transition-all"
            autoFocus
            onChange={(e) => setParentName(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="rounded-md p-1 bg-teal-400 ml-auto h-[28px] mr-2 "
            disabled={isLoading}
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

      <div className=" flex flex-col gap-2 min-w-fit">
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
  );
};
