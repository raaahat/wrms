'use client';

import * as React from 'react';

import { useQuery } from '@tanstack/react-query';

import { useCreateWRstore } from '../hooks/create-wr-store';
import {
  employeeListByDept,
  OpEmployeeListType,
} from '@/features/employee/query';
import { EmployeeComboBox } from './EmployeeComboBox';

export const EmployeePickerComboBox = () => {
  const [open, setOpen] = React.useState(false);
  const { creatorId, setCreatorId } = useCreateWRstore();
  const opEmployeeListQuery = useQuery<OpEmployeeListType>({
    queryKey: ['op-employee'],
    queryFn: () => employeeListByDept('OP'),
  });
  const selectedEmployee = opEmployeeListQuery.data?.find(
    (area) => area.id === creatorId
  );
  function handleSelect(id: string) {
    setCreatorId(id);
    setOpen(false);
  }
  return (
    <EmployeeComboBox
      allEmployeeList={opEmployeeListQuery.data}
      employeeId={creatorId}
      isLoading={opEmployeeListQuery.isLoading}
      onSelection={handleSelect}
      selectedEmployee={selectedEmployee}
    />
  );
};
