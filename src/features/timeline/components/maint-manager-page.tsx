import { EmployeeWithDetails } from '@/features/employee/type';
import React from 'react';
import { getTimelines } from '../query';
import { WrType } from '@prisma/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { StatusBadge } from '@/features/work-request/components/status-badge';
import { Button } from '@/components/ui/button';

export const MaintManagerPage = async ({
  profile,
}: {
  profile: EmployeeWithDetails;
}) => {
  const isMechManager = profile.roles.some((role) => role.name === 'MManager');
  const isElecManager = profile.roles.some((role) => role.name === 'EManager');
  const type: WrType | undefined = isElecManager
    ? 'ELECTRICAL'
    : isMechManager
    ? 'MECHANICAL'
    : undefined;
  const timelines = await getTimelines(type);
  console.log(timelines);
  return (
    <div className='p-5'>
      {timelines &&
        timelines.map((data) => (
          <Card key={data.id}>
            <CardHeader>
              <CardTitle className='flex items-center justify-between'>
                <p>{data.workRequest.wrNo}</p>
                <StatusBadge status={data.workRequest.status} />{' '}
              </CardTitle>
              <CardDescription>Title: {data.workRequest.title}</CardDescription>
              <CardContent></CardContent>
              <CardFooter>
                <Button variant={'outline'} size={'sm'} className='rounded-xl'>
                  {' '}
                  Assign an Engineer
                </Button>
              </CardFooter>
            </CardHeader>
          </Card>
        ))}
    </div>
  );
};
