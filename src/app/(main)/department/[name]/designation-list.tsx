'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Separator } from '@/components/ui/separator';
import { Designation } from '@prisma/client';
import { AddDesignationButton } from './add-button';
import { ActionTooltip } from '@/components/action-tooltip';
import { Delete, Edit, Trash, Trash2 } from 'lucide-react';
import { useModal } from '@/hooks/use-modal-store';
type DesignationListProps = {
  designations: Designation[];
  deptName: string;
};
export function DesignationList({
  designations,
  deptName,
}: DesignationListProps) {
  const { onOpen } = useModal();
  return (
    <Card className=" mx-auto max-w-[400px]">
      <CardHeader>
        <CardTitle>Designations</CardTitle>
        <CardDescription>A list of available designation.</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <ul className=" space-y-2">
          {designations.map((des) => (
            <li
              key={des.id}
              className="group flex items-center shadow-sm capitalize px-4 py-1 border border-muted rounded-md"
            >
              <span className="flex mr-1 h-2 w-2 rounded-full bg-sky-500" />
              {des.title}
              <div className=" ml-auto mr-5 hidden group-hover:flex gap-4 ">
                <ActionTooltip label="Edit">
                  <Edit onClick={(e) => {}} className="  size-5" />
                </ActionTooltip>
                <ActionTooltip label="Delete">
                  <Trash2
                    className=" size-5 text-rose-600"
                    onClick={() => {
                      onOpen('deleteDesignation', {
                        designationId: des.id,
                        departmentInfo: {
                          name: deptName,
                        },
                      });
                    }}
                  />
                </ActionTooltip>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex ">
        <AddDesignationButton className="w-full" deptName={deptName} />
      </CardFooter>
    </Card>
  );
}
