'use client';
import { useModal } from '@/hooks/use-modal-store';
import { Button } from '../ui/button';
import { Department } from '@prisma/client';

type DepartmentList = {};

const DeptList = ({ dept }: { dept: Department[] }) => {
  const { onOpen } = useModal();
  return (
    <div>
      {dept.length === 0 ? (
        <div>There is no department to show</div>
      ) : (
        <div>
          welcome
          {dept.map((item) => (
            <li key={item.id}> {item.name}</li>
          ))}
        </div>
      )}

      <div>
        <Button onClick={() => onOpen('invite')}> Add Department</Button>
      </div>
    </div>
  );
};

export default DeptList;
