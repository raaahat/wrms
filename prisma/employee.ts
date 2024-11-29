import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const employee = {
  id: 'ae6f2cc6-7959-486a-a33f-8cfe6bee7f2e',
  userId: 'user_2nWTchpKnAqNIgMEZ0ATZZeYVfX',
  imageUrl:
    'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybldUY2hYWXVsWXVIREY0cTRDTGlWWmVoS0UifQ',
  name: 'tareq emam rahat',
  email: 'pubgliterahat@gmail.com',
  phone: '01777659971',
  designationId: '7540088e-c777-45c6-ba57-10e55478d9b5',
  verified: '2024-11-28T07:34:59.124Z',
  createdAt: '2024-11-28T07:34:59.124Z',
  updatedAt: '2024-11-28T08:04:07.621Z',
  designation: {
    id: '7540088e-c777-45c6-ba57-10e55478d9b5',
    title: 'junior engineer',
    shortTitle: 'JE',
    departmentId: 'ef68e1a4-28b0-45ab-b8b6-66ff07223f18',
    department: {
      id: 'ef68e1a4-28b0-45ab-b8b6-66ff07223f18',
      name: 'operation',
      shortName: 'OP',
    },
  },
};

const employeesDummyData: {
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
  userId: string;
  designationId: string;
  verified: string;
}[] = [
  {
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phone: '+1234567890',
    imageUrl: 'https://via.placeholder.com/150?text=Alice',
    userId: 'u1',
    designationId: 'b3dca62a-88ae-49bf-a10b-f1b13232cdb4',
    verified: '2024-11-28T07:34:59.124Z',
  },
  {
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    phone: '+1234567891',
    imageUrl: 'https://via.placeholder.com/150?text=Bob',
    userId: 'u2',
    designationId: '14a57227-3279-415c-9b5b-b4e752c4c5a8',
    verified: '2024-11-28T07:34:59.124Z',
  },
  {
    name: 'Charlie Davis',
    email: 'charlie.davis@example.com',
    phone: '+1234567892',
    imageUrl: 'https://via.placeholder.com/150?text=Charlie',
    userId: 'u3',
    designationId: 'f407eb8d-9051-4ebe-916c-7b0e5aef5352',
    verified: '2024-11-28T07:34:59.124Z',
  },
  {
    name: 'Diana Lopez',
    email: 'diana.lopez@example.com',
    phone: '+1234567893',
    imageUrl: 'https://via.placeholder.com/150?text=Diana',
    userId: 'u4',
    designationId: '58c18b0d-4d05-43f8-b41b-3393b0372660',
    verified: '2024-11-28T07:34:59.124Z',
  },
  {
    name: 'Ethan Green',
    email: 'ethan.green@example.com',
    phone: '+1234567894',
    imageUrl: 'https://via.placeholder.com/150?text=Ethan',
    userId: 'u5',
    designationId: '0b685939-a9aa-4513-bdba-c7bae95f3160',
    verified: '2024-11-28T07:34:59.124Z',
  },
  {
    name: 'Fiona White',
    email: 'fiona.white@example.com',
    phone: '+1234567895',
    imageUrl: 'https://via.placeholder.com/150?text=Fiona',
    userId: 'u6',
    designationId: '77518fe1-be1a-4ca7-99ab-7bf0413eaf3b',
    verified: '2024-11-28T07:34:59.124Z',
  },
  {
    name: 'George Black',
    email: 'george.black@example.com',
    phone: '+1234567896',
    imageUrl: 'https://via.placeholder.com/150?text=George',
    userId: 'u7',
    designationId: '4161a195-fcd6-4ed6-b40c-906b0e84c7d6',
    verified: '2024-11-28T07:34:59.124Z',
  },
  {
    name: 'Hannah Brown',
    email: 'hannah.brown@example.com',
    phone: '+1234567897',
    imageUrl: 'https://via.placeholder.com/150?text=Hannah',
    userId: 'u8',
    designationId: '277bae83-545a-4714-aa0d-5e53b689582f',
    verified: '2024-11-28T07:34:59.124Z',
  },
  {
    name: 'Ian Walker',
    email: 'ian.walker@example.com',
    phone: '+1234567898',
    imageUrl: 'https://via.placeholder.com/150?text=Ian',
    userId: 'u9',
    designationId: 'f481db38-241d-43df-a83f-75f77142fe23',
    verified: '2024-11-28T07:34:59.124Z',
  },
  {
    name: 'Julia Adams',
    email: 'julia.adams@example.com',
    phone: '+1234567899',
    imageUrl: 'https://via.placeholder.com/150?text=Julia',
    userId: 'u10',
    designationId: 'bb9fad47-831a-4138-903a-37f639d3ae9d',
    verified: '2024-11-28T07:34:59.124Z',
  },
];

export const createUsers = async () => {
  await db.employee.createMany({
    data: employeesDummyData,
  });
};
