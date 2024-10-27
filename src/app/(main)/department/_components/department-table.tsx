'use client';
import { DataTable } from '@/components/table/data-table';
import { Department } from '@prisma/client';
import { columns } from './columns';
import { useModal } from '@/hooks/use-modal-store';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';

export const DepartmentTable = ({ data }: { data: Department[] }) => {
  const { onOpen } = useModal();
  return (
    <div className="container mx-auto">
      <Button
        onClick={() => {
          onOpen('createDepartment');
        }}
      >
        <PlusCircleIcon />
        Add Department
      </Button>
      <DataTable filterBy="name" columns={columns} data={data} />
    </div>
  );
};
