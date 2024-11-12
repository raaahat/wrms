'use client';
import { cn } from '@/lib/utils';
import { Check, ChevronDown, Loader2, Plus, X } from 'lucide-react';
import React, { useState } from 'react';
import { AreaType } from '../query';
import { Input } from '@/components/ui/input';
import { useAdding } from '../store';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';
import { createChildArea } from '../actions/area';
interface NestedItemProps {
  name: string;
  allChildren?: AreaType;
  key?: string;
  className?: string;
  id: string;
}
export const NestedItem = ({
  name,
  allChildren,
  className,
  id,
}: NestedItemProps) => {
  const [open, setOpen] = useState(false);

  const hasChildren = allChildren?.length !== 0;

  const {
    parentId,
    setParentId,
    newChild,
    setNewChild,
    isLoading,
    setIsLoading,
  } = useAdding();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast.loading('Creating an entry...', {
      id: 'create',
    });
    setIsLoading(true);
    const { message, success } = await createChildArea(parentId, newChild);
    if (!success)
      toast.error(message, {
        id: 'create',
      });
    if (success) {
      toast.success(message, {
        id: 'create',
      });
      setParentId('');
    }
    setIsLoading(false);
  }

  return (
    <>
      <div
        key={id}
        className={cn(
          'max-w-[300px] flex flex-col border pl-4 pr-2 py-1 rounded-lg bg-gray-200 transition-all',
          className
        )}
      >
        <div className="relative flex group items-center">
          <Plus
            className="cursor-pointer absolute bg-gray-300 hidden group-hover:block right-8 hover:bg-cyan-700 hover:text-white rounded-sm top-1/2 transform  -translate-y-1/2 transition-all"
            size={20}
            onClick={() => {
              setParentId(id);
              setNewChild('');
            }}
          />
          {name}
          <ChevronDown
            onClick={() => setOpen((prev) => !prev)}
            className={cn(
              'ml-auto transition-all invisible hover:cursor-pointer hover:bg-slate-300 rounded-sm',
              hasChildren && 'visible',
              open && '-rotate-90'
            )}
            size={20}
          />
        </div>
        {parentId && parentId === id && (
          <form onSubmit={handleSubmit} className="flex p-2">
            <Input
              name="newName"
              type="text"
              value={newChild}
              onChange={(e) => setNewChild(e.target.value)}
              className="h-[28px] mr-2 max-w-fit"
              autoFocus
              disabled={isLoading}
            />
            <button
              type="submit"
              className="rounded-md p-1 bg-teal-400 ml-auto h-[28px] mr-2 hover:bg-teal-500"
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
                setParentId('');
              }}
            >
              <X className=" text-white " strokeWidth={2.5} />
            </button>
          </form>
        )}

        {hasChildren &&
          allChildren?.map((child) => {
            return (
              <div
                key={child.id}
                className={cn(
                  ' border-l-2 border-gray-300 transition-all ease-linear',
                  !open && 'h-0 opacity-0 pointer-events-none'
                )}
              >
                <NestedItem
                  className="pr-0 pl-2"
                  name={child.name}
                  allChildren={child.children}
                  id={child.id}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};
