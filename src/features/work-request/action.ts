'use server';

import { db } from '@/lib/prisma';
import { CreateWRFormSchema, CreateWRFormSchemaType } from './type';
import { revalidatePath } from 'next/cache';
import { Status } from '@prisma/client';
import { nextAvailableStatus } from './constants';

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
  } = parsed.data;

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

    // Use Prisma transaction to ensure atomicity
    const [newWorkRequest, newTimeLine] = await db.$transaction(
      async (prisma) => {
        // Create the new WorkRequest
        const createdWorkRequest = await prisma.workRequest.create({
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

        // If mode is "STRICT", create a new entry in the TimeLine table
        let createdTimeLine = null;
        if (mode === 'STRICT') {
          createdTimeLine = await prisma.timeLine.create({
            data: {
              wrId: createdWorkRequest.id,
            },
          });
        }

        return [createdWorkRequest, createdTimeLine];
      }
    );

    // Revalidate the work-request path
    revalidatePath('/work-request');

    return {
      success: true,
      message: 'Work Request created successfully.',
      data: { workRequest: newWorkRequest, timeLine: newTimeLine },
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

export const setStatus = async (id: string, status: Status) => {
  const existingWr = await db.workRequest.findUnique({
    where: {
      id,
    },
  });
  if (!existingWr)
    return {
      success: false,
      message: 'No WR found',
    };
  const nextStatus = nextAvailableStatus(existingWr.status);
  if (!nextStatus)
    return {
      success: false,
      message: 'Nothing need to change',
    };
  if (!nextStatus.includes(status))
    return {
      success: false,
      message: 'Invalid status transition',
    };
  try {
    await db.workRequest.update({
      where: { id },
      data: {
        status,
        workStartedAt: status === 'ONGOING' ? new Date() : undefined,
        workFinishConfrimedAt:
          existingWr.status === 'ONGOING' || existingWr.status === 'FINISHED'
            ? new Date()
            : undefined,
      },
    });
    revalidatePath('/work-request');
    revalidatePath('/mm');
    return {
      success: true,
      message: `Status updated to ${status}`,
    };
  } catch (error) {
    console.error('Error updating status:', error);
    return {
      success: false,
      message: 'Failed to update status',
    };
  }
};
