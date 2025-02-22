'use server';
import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { FormData, formSchema, specificationSchema } from './type';
import { formatZodErrors, generateKey } from '@/lib/utils';
import { z } from 'zod';

export const addCategory = async (formData: FormData) => {
  const parsedData = await formSchema.safeParse(formData);
  if (!parsedData.success) {
    return { success: false, message: 'Provided data is not valid' };
  }
  const data = parsedData.data;
  // type FormData = {
  //   category: string;
  //   specifications: {
  //     name: string;
  //     dataType: 'number' | 'text';
  //     unit?: string | undefined;
  //     required?: boolean | undefined;
  //   }[];
  // };
  try {
    const category = await db.equipmentCategory.create({
      data: {
        name: data.category,
      },
    });
    // If there are specifications, create them all
    if (data.specifications.length > 0) {
      await Promise.all(
        data.specifications.map((spec) =>
          db.specificatonTemplate.create({
            data: {
              categoryId: category.id, // Connect to the newly created category
              name: spec.name,
              dataType: spec.dataType,
              unit: spec.unit, // Will be undefined if not provided
              required: spec.required ?? true, // Default to true if not specified
            },
          })
        )
      );
    }

    // Revalidate the cache for the manage-category page
    revalidatePath('/equipment/manage-category');

    return {
      success: true,
      message: 'Category added successfully!',
    };
  } catch (error) {
    console.error('Error adding category:', error);

    // Check if the error is due to a unique constraint violation (e.g., duplicate category name)
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return {
        success: false,
        message: 'Category name already exists!',
      };
    }

    return {
      success: false,
      message: 'Oops.. Something went wrong!',
    };
  }
};

export const deleteParameterTemplate = async (id: string) => {
  try {
    const result = await db.specificatonTemplate.delete({
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

export const addSpecForCatagory = async (categoryId: string, data: unknown) => {
  const parsedData = specificationSchema.safeParse(data);
  if (!parsedData.success)
    return {
      success: false,
      errors: formatZodErrors(parsedData.error as unknown as z.ZodError),
    };
  try {
    // Check if key already exists
    const existingParameter = await db.specificatonTemplate.findFirst({
      where: {
        categoryId,
        name: parsedData.data.name,
      },
    });

    if (existingParameter) {
      return {
        success: false,
        errors: ['A parameter with this name already exists.'],
      };
    }
    const newParameter = await db.specificatonTemplate.create({
      data: {
        categoryId,
        name: parsedData.data.name.trim(), // Ensure no extra spaces
        dataType: parsedData.data.dataType,
        unit: parsedData.data.unit || null,
        required: parsedData.data.required,
      },
    });
    revalidatePath('/equipment/manage-catagory');
    return {
      success: true,
      data: newParameter,
    };
  } catch (error) {
    console.error('Database error:', error);
    return {
      success: false,
      errors: ['An error occurred while saving data.'],
    };
  }
};
