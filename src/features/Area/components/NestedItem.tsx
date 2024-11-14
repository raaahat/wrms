'use client';
import {
  Accordion,
  AccordionBlock,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/features/Area/components/accordion';
import React, { useEffect, useState } from 'react';
import { AreaType } from '../query';
import { Input } from '@/components/ui/input';
import { useAdding } from '../store';
import { toast } from 'sonner';
import { createChildArea } from '../actions/area';
import { ActionTooltip } from '@/components/action-tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Loader2, MoreHorizontal, SquarePlus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cleanUpSpaces, cn } from '@/lib/utils';
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
    setDeletingId,
    expand,
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

  useEffect(() => {
    setOpen(expand);
  }, [expand, setOpen]);

  return (
    <>
      {hasChildren ? (
        <Accordion
          key={id}
          type="multiple"
          className="w-full bg-slate-200 rounded-md"
        >
          <AccordionItem value={id}>
            <AccordionTrigger>
              <div className="group flex items-center justify-between w-full h-full">
                {name}
                <Menu
                  className="hidden group-hover:block bg-slate-300 hover:bg-slate-400 h-full rounded-md size-6 p-1 mr-1"
                  id={id}
                  canDelete={!hasChildren}
                />
              </div>
            </AccordionTrigger>

            <AccordionContent>
              {parentId && parentId === id && (
                <form className=" max-w-[240px]" onSubmit={handleSubmit}>
                  <AccordionBlock>
                    <Input
                      autoFocus
                      value={newChild}
                      className=" focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 h-full border-none bg-inherit w-full"
                      type="text"
                      onChange={(e) => setNewChild(e.target.value)}
                      disabled={isLoading}
                    />

                    <button
                      type="submit"
                      className=" ml-auto m-2 bg-slate-100 rounded-md px-1 hover:bg-slate-400"
                      disabled={isLoading || cleanUpSpaces(newChild) === ''}
                    >
                      {isLoading ? (
                        <Loader2
                          className="animate-spin text-white"
                          size={20}
                          strokeWidth={3}
                        />
                      ) : (
                        '✔'
                      )}
                    </button>
                    <button
                      type="button"
                      className=" ml-auto mr-2 bg-slate-100 rounded-md px-1 hover:bg-slate-400"
                      onClick={() => {
                        setParentId('');
                      }}
                    >
                      ❌
                    </button>
                  </AccordionBlock>
                </form>
              )}
              {allChildren?.map((child) => {
                return (
                  <NestedItem
                    key={child.id}
                    name={child.name}
                    allChildren={child.children}
                    id={child.id}
                  />
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <>
          <AccordionBlock>
            <div className="group flex items-center justify-between w-full h-full">
              {name}
              <Menu
                className="hidden group-hover:block bg-slate-300 hover:bg-slate-400 h-full rounded-md size-6 p-1 mr-1"
                id={id}
                canDelete={!hasChildren}
              />
            </div>
          </AccordionBlock>
          {parentId && parentId === id && (
            <form
              className=" max-w-[240px] -translate-y-3 px-3"
              onSubmit={handleSubmit}
            >
              <AccordionBlock>
                <Input
                  autoFocus
                  value={newChild}
                  className=" focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 h-full border-none bg-inherit w-full"
                  type="text"
                  onChange={(e) => setNewChild(e.target.value)}
                  disabled={isLoading}
                />

                <button
                  type="submit"
                  className="disabled:cursor-not-allowed ml-auto m-2 bg-slate-100 rounded-md px-1 hover:bg-slate-400 "
                  disabled={isLoading || cleanUpSpaces(newChild) === ''}
                >
                  {isLoading ? (
                    <Loader2
                      className="animate-spin text-white"
                      size={20}
                      strokeWidth={3}
                    />
                  ) : (
                    '✔'
                  )}
                </button>
                <button
                  type="button"
                  className=" ml-auto mr-2 bg-slate-100 rounded-md px-1 hover:bg-slate-400"
                  onClick={() => {
                    setParentId('');
                  }}
                >
                  ❌
                </button>
              </AccordionBlock>
            </form>
          )}
        </>
      )}
      {/* <div
        key={id}
        className={cn(
          ' flex flex-col border pl-4 pr-2 pt-2 pb-1 rounded-lg bg-gray-200 transition-all',
          className
        )}
      >
        <div className="relative flex group items-center justify-between transition-all">
          <p>{name}</p>
          <div className=" flex gap-2">
            {!hasChildren && (
              <ActionTooltip label="Delete" side="top">
                <span>
                  <TbTrashXFilled
                    className="transition-all cursor-pointer invisible group-hover:visible right-8 text-rose-400 hover:text-red-700 rounded-sm"
                    size={20}
                    onClick={() => {
                      setDeletingId(id);
                    }}
                  />
                </span>
              </ActionTooltip>
            )}
            <ActionTooltip label="Add" side="top">
              <Plus
                className="cursor-pointer bg-gray-300 invisible group-hover:visible right-8 hover:bg-cyan-700 hover:text-white rounded-sm transition-all"
                size={20}
                onClick={() => {
                  setParentId(id);
                  setNewChild('');
                }}
              />
            </ActionTooltip>
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
        </div>
        {parentId && parentId === id && (
          <form onSubmit={handleSubmit} className="flex p-2">
            <Input
              name="newName"
              type="text"
              value={newChild}
              onChange={(e) => setNewChild(e.target.value)}
              className="h-[28px] mr-2 "
              autoFocus
              disabled={isLoading}
            />
            <button
              type="submit"
              className="rounded-md p-1 bg-teal-400 ml-auto h-[28px] mr-2 hover:bg-teal-500"
              disabled={isLoading || cleanUpSpaces(newChild) === ''}
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
                  ' border-l-2 border-gray-300 transition-transform ease-in',
                  !open && 'h-0 opacity-0 pointer-events-none'
                )}
              >
                <NestedItem
                  className="pr-0 pl-2 pt-0"
                  name={child.name}
                  allChildren={child.children}
                  id={child.id}
                />
              </div>
            );
          })}
      </div> */}
    </>
  );
};

function Menu({
  id,
  className,
  canDelete,
}: {
  id: string;
  className?: string;
  canDelete: boolean;
}) {
  const { setNewChild, setDeletingId, setParentId } = useAdding();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal className={className} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={() => {
            setParentId(id);
            setNewChild('');
          }}
        >
          Add
          <DropdownMenuShortcut>
            <SquarePlus />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        {canDelete && (
          <DropdownMenuItem
            className=" text-rose-700 hover:bg-red-200"
            onClick={() => {
              setDeletingId(id);
            }}
          >
            Delete
            <DropdownMenuShortcut>
              <Trash2 />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
