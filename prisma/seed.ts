import { PrismaClient } from '@prisma/client';
// import { areas } from './seed/areas';
// import { departments } from './seed/departments';
// import { designations } from './seed/designations';
// import { employees } from './seed/employees';
// import { workRequests } from './seed/workRequests';

const db = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Seed Departments
  // await db.department.createMany({ data: departments });

  // Seed Designations
  // await db.designation.createMany({ data: designations });

  // Seed Employees
  // await db.employee.createMany({ data: employees });

  // Seed Areas
  // await db.area.createMany({ data: areas });

  // Seed Work Requests

  console.log('Database seeded successfully.');
}

main()
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
