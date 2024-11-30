'use server';
import { auth } from '@clerk/nextjs/server';
import { db } from '../lib/prisma';

export const currentProfile = async () => {
  const { userId } = auth();

  if (!userId) {
    return auth().redirectToSignIn();
  }
  const profile = await db.employee.findUnique({
    where: {
      userId,
    },
    include: {
      designation: {
        include: {
          department: true,
        },
      },
      roles: true,
    },
  });
  return profile;
};
