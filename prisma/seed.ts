import { PrismaClient } from '@prisma/client';

import { departments } from './department';
import { data } from './designation';
import { createUsers } from './employee';

const db = new PrismaClient();

async function seedDepartmentWithDesig() {
  console.log('Seeding database...');
  for (const department of departments) {
    const relatedData = data.find((d) => d.name === department.name);

    if (!relatedData) continue;

    await db.department.upsert({
      where: { id: department.id },
      update: {},
      create: {
        id: department.id,
        name: department.name,
        shortName: department.shortName,
        designations: {
          create: relatedData.designations.map((designation) => ({
            title: designation.title,
            shortTitle: designation.shortTitle,
          })),
        },
      },
    });
  }

  console.log('Seeding completed!');
}

createUsers()
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
