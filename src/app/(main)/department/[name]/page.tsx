import { db } from '@/lib/prisma';
import { AddDesignationButton } from '@/features/designation/components/add-button';
import { DesignationList } from '@/features/designation/components/designation-list';

type SingleDepartmentProps = {
  params: {
    name: string;
  };
};

const SingleDepartment = async ({ params }: SingleDepartmentProps) => {
  const designations = await db.designation.findMany({
    where: {
      department: {
        name: params.name.replace(/-/g, ' '),
      },
    },
  });
  if (designations.length === 0)
    return (
      <div className=' p-4'>
        <p className=' mb-6'>
          there is no designation available for {params.name} department.
        </p>
        <AddDesignationButton deptName={params.name} />
      </div>
    );
  return (
    <div className=' p-2'>
      <DesignationList designations={designations} deptName={params.name} />
    </div>
  );
};

export default SingleDepartment;
