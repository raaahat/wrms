'use server';

import { getEmployeeById } from '@/database/current-profile';
import { RegisterEmployeeSchema } from '@/features/employee/register/type';
import { db } from '@/lib/prisma';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';

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
  const { name, phone, departmentId, designationId } = parsedData.data;

  try {
    // Step 1: Check if the designation exists
    const desig = await db.designation.findUnique({
      where: { id: designationId },
      include: { department: true }, // Include related department for comparison
    });

    if (!desig) {
      return {
        success: false,
        message: 'Designation does not exist.',
      };
    }
    if (desig.departmentId !== departmentId) {
      return {
        success: false,
        message: 'Designation does not match the selected department.',
      };
    }
    // Create the new employee in the database
    const newEmployee = await db.employee.create({
      data: {
        userId,
        imageUrl,
        name,
        email,
        phone,
        designationId,
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

export const updateEmployee = async (
  employeeId: string,
  updatedFields: Partial<{
    name: string;
    email: string;
    phone: string;
    departmentId: string;
    designationId: string;
  }>
) => {
  try {
    const employee = await db.employee.findUnique({
      where: { id: employeeId },
      include: {
        designation: true,
      },
    });

    if (!employee) {
      return {
        success: false,
        message: 'Employee does not exist.',
      };
    }
    if (updatedFields.designationId) {
      const designation = await db.designation.findUnique({
        where: { id: updatedFields.designationId },
        include: { department: true },
      });
      if (!designation) {
        return {
          success: false,
          message: 'Designation does not exist.',
        };
      }
      const departmentIdToCheck =
        updatedFields.departmentId ?? employee.designation?.departmentId;
      if (
        departmentIdToCheck &&
        departmentIdToCheck !== designation.departmentId
      ) {
        return {
          success: false,
          message: 'Designation does not match the selected department.',
        };
      }
    }
    // Step 2: Proceed with updating the employee with only modified fields
    const updatedEmployee = await db.employee.update({
      where: { id: employeeId },
      data: {
        name: updatedFields.name,
        phone: updatedFields.phone,
        ...(updatedFields.designationId && {
          designation: {
            connect: { id: updatedFields.designationId },
          },
        }),
      },
    });

    return {
      success: true,
      message: 'Employee updated successfully.',
      data: updatedEmployee,
    };
  } catch (error) {
    console.error('Error updating employee:', error);
    return {
      success: false,
      message: 'Failed to update employee.',
    };
  }
};

export const grantAccess = async (employeeId: string) => {
  const now = new Date();
  const client = await clerkClient();
  const existingUser = await getEmployeeById(employeeId);
  if (!existingUser)
    return {
      success: false,
      message: 'No employee found',
    };
  try {
    await db.employee.update({
      where: {
        id: employeeId,
      },
      data: {
        verified: now,
      },
    });

    await client.users.updateUser(existingUser.userId, {
      publicMetadata: {
        verified: true, // Sync with your database field
      },
    });
    return {
      success: true,
      message: 'Successfully Verified!',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong while granting access',
    };
  }
};
