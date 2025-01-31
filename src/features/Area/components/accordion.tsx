'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn('', className)} {...props} />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header
    className={cn('flex shadow-md  rounded-lg', className)}
  >
    <div className=" w-full pl-4 ">{children}</div>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        ' ml-auto hover:bg-slate-400 dark:hover:bg-slate-600 p-2 rounded-lg font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180'
      )}
      {...props}
    >
      <ChevronDown className=" h-4 w-4 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className=" overflow-clip text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div
      className={cn(
        ' relative mx-2 my-1 px-2 pb-2 pt-0 rounded-lg space-y-1',
        className
      )}
    >
      <div className="absolute top-1 bottom-1 left-0 w-[2px] bg-slate-300 rounded-full"></div>
      {children}
    </div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

export function AccordionBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className=" shadow-sm bg-slate-200 dark:bg-slate-800 rounded-lg">
      <div className=" w-full my-auto h-8 pl-4  flex items-center">
        {children}
      </div>
    </div>
  );
}
