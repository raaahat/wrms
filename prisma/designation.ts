import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export const data: {
  name: string;
  designations: { title: string; shortTitle: string }[];
}[] = [
  {
    name: 'operation',
    designations: [
      {
        title: 'Engine Assistant',
        shortTitle: 'EA',
      },
      {
        title: 'Sub Assistant Engineer',
        shortTitle: 'SAE',
      },
      {
        title: 'Junior Engineer',
        shortTitle: 'JE',
      },
      {
        title: 'Assistant Engineer',
        shortTitle: 'AE',
      },
      {
        title: 'Assistant Shift Engineer',
        shortTitle: 'ASE',
      },
      {
        title: 'Assistant Manager',
        shortTitle: 'AM',
      },
      {
        title: 'Sr. Assistant Manager',
        shortTitle: 'Sr.AM',
      },
      {
        title: 'Deputy Manager',
        shortTitle: 'DM',
      },
      {
        title: 'Operation Manager',
        shortTitle: 'OM',
      },
      {
        title: 'Sr. Operation Manager',
        shortTitle: 'Sr.OM',
      },
    ],
  },
  {
    name: 'electrical',
    designations: [
      {
        title: 'Technician Helper',
        shortTitle: 'TH',
      },
      {
        title: 'Technician',
        shortTitle: 'Tech',
      },
      {
        title: 'Sr. Technician',
        shortTitle: 'Sr.Tech',
      },
      {
        title: 'Sub Assistant Engineer',
        shortTitle: 'SAE',
      },
      {
        title: 'Junior Engineer',
        shortTitle: 'JE',
      },
      {
        title: 'Assistant Engineer',
        shortTitle: 'AE',
      },
      {
        title: 'Sr. Assistant Engineer',
        shortTitle: 'Sr.AE',
      },
      {
        title: 'Assistant Manager',
        shortTitle: 'AM',
      },
      {
        title: 'Sr. Assistant Manager',
        shortTitle: 'Sr.AM',
      },
      {
        title: 'Deputy Manager',
        shortTitle: 'DM',
      },
      {
        title: 'Sr. Deputy Manager',
        shortTitle: 'Sr.DM',
      },
      {
        title: 'Electrical Manager',
        shortTitle: 'EM',
      },
      {
        title: 'Sr. Electrical Manager',
        shortTitle: 'Sr.EM',
      },
    ],
  },
  {
    name: 'mechanical',
    designations: [
      {
        title: 'Technician Helper',
        shortTitle: 'TH',
      },
      {
        title: 'Technician',
        shortTitle: 'Tech',
      },
      {
        title: 'Sr. Technician',
        shortTitle: 'Sr.Tech',
      },
      {
        title: 'Sub Assistant Engineer',
        shortTitle: 'SAE',
      },
      {
        title: 'Junior Engineer',
        shortTitle: 'JE',
      },
      {
        title: 'Assistant Engineer',
        shortTitle: 'AE',
      },
      {
        title: 'Sr. Assistant Engineer',
        shortTitle: 'Sr.AE',
      },
      {
        title: 'Assistant Manager',
        shortTitle: 'AM',
      },
      {
        title: 'Sr. Assistant Manager',
        shortTitle: 'Sr.AM',
      },
      {
        title: 'Deputy Manager',
        shortTitle: 'DM',
      },
      {
        title: 'Sr. Deputy Manager',
        shortTitle: 'Sr.DM',
      },
      {
        title: 'Mechanical Manager',
        shortTitle: 'MM',
      },
      {
        title: 'Sr. Mechanical Manager',
        shortTitle: 'Sr.MM',
      },
    ],
  },
  {
    name: 'plant head',
    designations: [
      {
        title: 'Deputy General Manager',
        shortTitle: 'DGM',
      },
    ],
  },
  {
    name: 'admin',
    designations: [
      {
        title: 'Assistant Manager',
        shortTitle: 'AM',
      },
      {
        title: 'Sr. Assistant Manager',
        shortTitle: 'Sr.AM',
      },
      {
        title: 'Deputy Manager',
        shortTitle: 'DM',
      },
      {
        title: 'Sr. Deputy Manager',
        shortTitle: 'Sr.DM',
      },
    ],
  },
];
