import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const employeesDummyData: {
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
  userId: string;
  departmentName: string;
  designationShortTitle: string;
  verified: string;
}[] = [
  {
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phone: '+1234567890',
    imageUrl: 'user-avatar/red-boy.jpg',
    userId: 'u1',
    departmentName: 'operation',
    designationShortTitle: 'OM',
    verified: '2024-11-28T07:34:59.124Z',
  },
  {
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    phone: '+1234567891',
    imageUrl: 'user-avatar/ai-boy-cartoon.jpg',
    userId: 'u2',
    departmentName: 'mechanical',
    designationShortTitle: 'MM',
    verified: '2024-11-28T07:34:59.124Z',
  },
  {
    name: 'Charlie Davis',
    email: 'charlie.davis@example.com',
    phone: '+1234567892',
    imageUrl: 'user-avatar/ai-man-2.jpg',
    userId: 'u3',
    departmentName: 'electrical',
    designationShortTitle: 'EM',
    verified: '2024-11-28T07:34:59.124Z',
  },
  {
    name: 'Diana Lopez',
    email: 'diana.lopez@example.com',
    phone: '+1234567893',
    imageUrl: 'user-avatar/ai-man.webp',
    userId: 'u4',
    departmentName: 'operation',
    designationShortTitle: 'AM',
    verified: '2024-11-28T07:34:59.124Z',
  },
  {
    name: 'Ethan Green',
    email: 'ethan.green@example.com',
    phone: '+1234567894',
    imageUrl: 'user-avatar/beard-2.png',
    userId: 'u5',
    departmentName: 'mechanical',
    designationShortTitle: 'Sr.AE',
    verified: '2024-11-28T07:34:59.124Z',
  },
  {
    name: 'Fiona White',
    email: 'fiona.white@example.com',
    phone: '+1234567895',
    imageUrl: 'user-avatar/beard-3.png',
    userId: 'u6',
    departmentName: 'electrical',
    designationShortTitle: 'JE',
    verified: '2024-11-28T07:34:59.124Z',
  },
  {
    name: 'George Black',
    email: 'george.black@example.com',
    phone: '+1234567896',
    imageUrl: 'user-avatar/blue-boy.jpg',
    userId: 'u7',
    departmentName: 'plant head',
    designationShortTitle: 'DGM',
    verified: '2024-11-28T07:34:59.124Z',
  },
  {
    name: 'Hannah Brown',
    email: 'hannah.brown@example.com',
    phone: '+1234567897',
    imageUrl: 'user-avatar/glass.webp',
    userId: 'u8',
    departmentName: 'admin',
    designationShortTitle: 'DM',
    verified: '2024-11-28T07:34:59.124Z',
  },
  {
    name: 'Ian Walker',
    email: 'ian.walker@example.com',
    phone: '+1234567898',
    imageUrl: 'user-avatar/young.avif',
    userId: 'u9',
    departmentName: 'operation',
    designationShortTitle: 'JE',
    verified: '2024-11-28T07:34:59.124Z',
  },
  {
    name: 'Julia Adams',
    email: 'julia.adams@example.com',
    phone: '+1234567899',
    imageUrl: 'user-avatar/white-shirt.png',
    userId: 'u10',
    departmentName: 'mechanical',
    designationShortTitle: 'Tech',
    verified: '2024-11-28T07:34:59.124Z',
  },
];

export const createUsers = async () => {
  for (const employee of employeesDummyData) {
    const { departmentName, designationShortTitle, ...employeeData } = employee;

    // Find the department
    const department = await db.department.findUnique({
      where: { name: departmentName },
    });

    if (!department) {
      console.error(
        `Department "${departmentName}" not found for ${employee.name}.`
      );
      continue; // Skip this employee
    }

    // Find the designation within the department
    const designation = await db.designation.findFirst({
      where: {
        shortTitle: designationShortTitle,
        departmentId: department.id,
      },
    });

    if (!designation) {
      console.error(
        `Designation "${designationShortTitle}" not found in department "${departmentName}" for ${employee.name}.`
      );
      continue; // Skip this employee
    }

    // Create the employee
    await db.employee.create({
      data: {
        ...employeeData,
        verified: new Date(employeeData.verified), // Ensure proper date format
        designation: {
          connect: { id: designation.id },
        },
      },
    });

    console.log(`Employee "${employee.name}" created successfully.`);
  }
};
