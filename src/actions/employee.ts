'use server';
import { RegisterEmployeeSchema } from '@/features/register/type';
import { db } from '@/lib/prisma';
import { auth, currentUser } from '@clerk/nextjs/server';

export const registerEmployee = async (data: unknown) => {
  // Validate the input data
  const user = await currentUser();

  if (!user) {
    return auth().redirectToSignIn();
  }
  const parsedData = RegisterEmployeeSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: 'Invalid input data',
      errors: parsedData.error.errors, // Optional: Include validation errors
    };
  }
  const userId = user.id;
  const email = user.emailAddresses[0].emailAddress;
  const imageUrl = user.imageUrl;
  const { name, phone, department, designation } = parsedData.data;

  try {
    // Create the new employee in the database
    const newEmployee = await db.employee.create({
      data: {
        userId,
        imageUrl,
        name,
        email,
        phone,
        departmentId: department,
        designationId: designation,
      },
    });

    return {
      success: true,
      message: 'Employee registered successfully',
      employee: newEmployee, // Optional: return the created employee data
    };
  } catch (error) {
    console.error('Error registering employee:', error);
    return {
      success: false,
      message: 'Failed to register employee. Please try again later.',
    };
  }
};
