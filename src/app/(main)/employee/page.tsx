import { getDeptWithDesig } from '@/database/department';
import { getAllEmployee } from '@/database/employee';
import { DepartmentProvider } from '@/features/department/provider/department-provider';
import { EmployeeTable } from '@/features/employee/components/employee-table';
import { RequestCard } from '@/features/employee/components/request-card';

const AllPage = async () => {
  const { data: employees, success } = await getAllEmployee();
  const { deptWithDesig } = await getDeptWithDesig();
  if (!success || !deptWithDesig) return <h1> Failed to load data</h1>;
  if (!employees) return <h1> There is no employee</h1>;

  return (
    <>
      <DepartmentProvider deptWithDesig={deptWithDesig} />
      <EmployeeTable employees={employees} />;
    </>
  );
};

export default AllPage;
