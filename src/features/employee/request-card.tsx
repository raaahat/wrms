'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const RequestCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Employees</CardTitle>
        <CardDescription>View and manage employees</CardDescription>
      </CardHeader>
    </Card>
  );
};
