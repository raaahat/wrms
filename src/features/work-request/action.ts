'use server';

import { db } from '@/lib/prisma';
import { CreateWRFormSchema, CreateWRFormSchemaType } from './type';

export const createWorkRequest = async (formData: CreateWRFormSchemaType) => {
  // Validate input data
  const parsed = CreateWRFormSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      message: 'Validation failed: Please provide valid information 🙏',
    };
  }

  const {
    type,
    title,
    areaId,
    creatorId,
    mode = 'NORMAL',
    remarks,
  } = parsed.data; // Default mode if not provided

  try {
    // Generate year and month strings
    const year = new Date().getFullYear().toString().slice(-2); // Last 2 digits of the year
    const month = String(new Date().getMonth() + 1).padStart(2, '0'); // Month in MM format

    // Determine prefix based on type
    const prefix = type === 'ELECTRICAL' ? 'EM' : 'MM';

    // Find the last WorkRequest for the given type in the current month
    const lastWr = await db.workRequest.findFirst({
      where: {
        type,
        wrNo: {
          startsWith: `${prefix}-${year}${month}`, // Filter by year and month
        },
      },
      orderBy: { createdAt: 'desc' }, // Most recent first
    });

    // Determine the new counter value
    const lastCounter = lastWr?.wrNo?.slice(-3) || '000'; // Extract the counter or default to '000'
    const newCounter = String(Number(lastCounter) + 1).padStart(3, '0');

    // Generate the new `wrNo`
    const wrNo = `${prefix}-${year}${month}${newCounter}`;

    // Create the new WorkRequest
    const newWorkRequest = await db.workRequest.create({
      data: {
        wrNo,
        title,
        type,
        mode,
        remarks,
        area: {
          connect: {
            id: areaId, // Connect to the existing Area
          },
        },
        creator: {
          connect: {
            id: creatorId, // Connect to the existing Employee
          },
        },
      },
    });

    return {
      success: true,
      message: 'Work Request created successfully.',
      data: newWorkRequest,
    };
  } catch (error) {
    console.error('Error creating Work Request:', {
      formData,
      error,
    });
    return {
      success: false,
      message:
        'An error occurred while creating the Work Request. Please try again.',
    };
  }
};