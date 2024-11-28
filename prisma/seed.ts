import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  const departmentsWithDesignations = [
    {
      name: 'mechanical',
      shortName: 'MM',
      designations: [
        {
          title: 'assistant engineer',
          shortTitle: 'AE',
        },
        {
          title: 'junior engineer',
          shortTitle: 'JE',
        },
      ],
    },
    {
      name: 'electrical',
      shortName: 'EM',
      designations: [
        {
          title: 'sr. assistant engineer',
          shortTitle: 'Sr.AE',
        },
        {
          title: 'electrical manager',
          shortTitle: 'EM',
        },
      ],
    },
    {
      name: 'operation',
      shortName: 'OP',
      designations: [
        {
          title: 'sub assistant engineer',
          shortTitle: 'SAE',
        },
        {
          title: 'junior engineer',
          shortTitle: 'JE',
        },
        {
          title: 'operation manager',
          shortTitle: 'OM',
        },
        {
          title: 'assistant shift engineer',
          shortTitle: 'ASE',
        },
      ],
    },
  ];

  async function seedDepartments() {
    for (const department of departmentsWithDesignations) {
      const createdDepartment = await db.department.create({
        data: {
          name: department.name,
          shortName: department.shortName,
        },
      });

      // Seed related designations
      for (const designation of department.designations) {
        await db.designation.create({
          data: {
            title: designation.title,
            shortTitle: designation.shortTitle,
            departmentId: createdDepartment.id, // Link to the created department
          },
        });
      }
    }

    console.log('Departments and designations seeded successfully');
  }

  seedDepartments()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await db.$disconnect();
    });

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
