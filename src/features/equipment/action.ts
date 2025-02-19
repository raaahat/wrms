'use server';
import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { parameterTemplateSchema } from './type';
import { formatZodErrors } from '@/lib/utils';
import { z } from 'zod';

export const deleteParameterTemplate = async (id: string) => {
  try {
    const result = await db.parameterTemplate.delete({
      where: {
        id,
      },
    });
    revalidatePath('/equipment/manage-catagory');
    return result;
  } catch (error) {
    // Handle potential errors here, e.g., log the error or throw it
    console.error('Error deleting parameter template:', error);
    throw error; // Re-throw to propagate the error to the caller
  }
};

export const addSpecForCatagory = async (catagoryId: string, data: unknown) => {
  const parsedData = parameterTemplateSchema.safeParse(data);
  if (!parsedData.success)
    return {
      success: false,
      errors: formatZodErrors(parsedData.error as unknown as z.ZodError),
    };
  return {
    success: true,
  };
};
