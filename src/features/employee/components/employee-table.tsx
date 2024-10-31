'use client';
import { DataTable } from '@/components/table/data-table';
import { EmployeeWithDetails } from '../type';
import { columnsEmployee } from './employee-column';

export const EmployeeTable = ({
  employees,
}: {
  employees: EmployeeWithDetails[];
}) => {
  return (
    <DataTable columns={columnsEmployee} data={employees} filterBy="name" />
  );
};
