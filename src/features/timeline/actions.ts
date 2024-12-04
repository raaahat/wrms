'use server';

import {
  currentProfile,
  getEmployeeById,
  hasRole,
} from '@/database/current-profile';
import { db } from '@/lib/prisma';
import { WrType } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const assignMaintEngineer = async (
  timelineId: string,
  maintEngrId: string
) => {
  const user = await currentProfile();
  if (!user) {
    return redirect('/register');
  }

  const hasRole = (roles: string[]) =>
    user.roles.some((role) => roles.includes(role.name));

  if (!hasRole(['MManager', 'EManager'])) {
    return {
      success: false,
      message: 'Only managers can assign maintenance engineer!',
    };
  }

  const timeline = await db.timeLine.findUnique({
    where: { id: timelineId },
    include: {
      workRequest: true,
    },
  });

  if (!timeline) {
    return {
      success: false,
      message: 'No work request found!',
    };
  }

  const wrType: WrType | undefined = hasRole(['MManager'])
    ? 'MECHANICAL'
    : hasRole(['EManager'])
    ? 'ELECTRICAL'
    : undefined;

  if (!wrType) {
    return {
      success: false,
      message: 'Unauthorized!',
    };
  }

  const dept = wrType === 'ELECTRICAL' ? 'EM' : 'MM';

  if (wrType !== timeline.workRequest.type) {
    return {
      success: false,
      message: 'Department mismatch!',
    };
  }

  if (timeline.shiftEngrId || timeline.workRequest.maintEngrId) {
    return {
      success: false,
      message: 'An Engineer is already assigned!',
    };
  }

  if (timeline.workRequest.status !== 'PLACED') {
    return {
      success: false,
      message: 'Work request status has changed!',
    };
  }

  const maintEngr = await getEmployeeById(maintEngrId);
  if (!maintEngr || maintEngr?.designation?.department.shortName !== dept) {
    return {
      success: false,
      message: 'Assigned Engineer is not valid!',
    };
  }

  // Use a Prisma transaction to ensure atomicity
  try {
    await db.$transaction([
      db.timeLine.update({
        where: { id: timelineId },
        data: {
          maintManager: { connect: { id: user.id } },
          maintEngrAssignedAt: new Date(),
        },
      }),
      db.workRequest.update({
        where: { id: timeline.workRequest.id },
        data: {
          status: 'PENDING',
          maintEngr: {
            connect: {
              id: maintEngr.id,
            },
          },
        },
      }),
    ]);
    revalidatePath('/mm');
    return {
      success: true,
      message: 'Maintenance Engineer assigned successfully!',
    };
  } catch (error) {
    console.error('Error assigning maintenance engineer:', error);
    return {
      success: false,
      message:
        'An error occurred while assigning the engineer. Please try again.',
    };
  }
};

export const assignOPEngr = async (
  timelineId: string,
  shiftInchargeId: string,
  OPEngrId: string
) => {
  try {
    if (!hasRole(shiftInchargeId, 'ShiftIncharge'))
      return {
        success: false,
        message: 'Please select a valid shift incharge',
      };

    const existingTimeline = await db.timeLine.findUnique({
      where: { id: timelineId },
    });
    if (!existingTimeline) {
      return {
        success: false,
        message: 'Timeline not found!',
      };
    }

    const updatedTimeline = await db.timeLine.update({
      where: { id: timelineId },
      data: {
        shiftEngineer: {
          connect: {
            id: shiftInchargeId,
          },
        },
        operationEngineer: {
          connect: {
            id: OPEngrId,
          },
        },
        opEngrAssignedAt: new Date(),
      },
    });

    return {
      success: true,
      message: 'Operation engineer assigned successfully!',
      data: updatedTimeline,
    };
  } catch (error) {
    console.error('Error assigning operation engineer:', error);
    return {
      success: false,
      message: 'An error occurred while assigning the operation engineer.',
    };
  }
};
