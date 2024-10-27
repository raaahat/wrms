import { DataTable } from '@/components/table/data-table';
import { Department } from '@prisma/client';
import { columns } from './columns';

export const DepartmentTable = ({ data }: { data: Department[] }) => {
  return (
    <div className="container mx-auto">
      <DataTable filterBy="name" columns={columns} data={data} />
    </div>
  );
};
