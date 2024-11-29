import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();
export const departments: { id: string; name: string; shortName: string }[] = [
  {
    id: '548609a7-4a7d-429b-b11e-eda6f2d0b0cc',
    name: 'admin',
    shortName: 'AD',
  },
  {
    id: '5d59a9a7-ecbd-488a-aa25-4400f6d101e0',
    name: 'plant head',
    shortName: 'PH',
  },
  {
    id: '7efd6df4-8ee2-4260-85e0-b7da106b74fe',
    name: 'electrical',
    shortName: 'EM',
  },
  {
    id: 'cf690a97-6210-44de-8d05-81538abb3af1',
    name: 'mechanical',
    shortName: 'MM',
  },
  {
    id: 'ef68e1a4-28b0-45ab-b8b6-66ff07223f18',
    name: 'operation',
    shortName: 'OP',
  },
];

export async function createdDepartments() {
  await db.department.createMany({
    data: departments,
  });
}
