'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEquipmentModal } from '../store'; // Adjust import path
import { useQuery } from '@tanstack/react-query';
import { getCategoryWithSpec } from '../query'; // Adjust import path
import { Spinner } from '@/components/ui/spinner';

// Define types based on your data shape
type Specification = {
  categoryId: string;
  id: string;
  name: string;
  required: boolean;
  dataType: string; // e.g., "text", "number"
  unit: string | null;
};

type CategoryWithSpec = {
  id: string;
  name: string;
  specifications: Specification[];
};

// Define the shape of the specifications JSON
type SpecificationValue = string | number | { value: number; unit: string };

// Helper to create dynamic schema based on specifications
const createFormSchema = (specifications: Specification[]) => {
  const shape: Record<string, z.ZodTypeAny> = {};

  specifications.forEach((spec) => {
    const key = spec.name.toLowerCase().replace(/\s+/g, ''); // Normalize key (e.g., "Rated Output" -> "ratedoutput")
    if (spec.dataType === 'text') {
      shape[key] = spec.required
        ? z.string().min(1, `${spec.name} is required`)
        : z.string().optional();
    } else if (spec.dataType === 'number') {
      const numberSchema = z
        .number({ invalid_type_error: `${spec.name} must be a number` })
        .min(0, `${spec.name} must be non-negative`);
      shape[key] = spec.required ? numberSchema : numberSchema.optional();
    }
    // Add more dataType cases (e.g., "boolean") if needed
  });

  return z.object(shape);
};

type FormData = Record<string, string | number | undefined>;

const AddEquipmentTypeModal = () => {
  const { isOpen, onClose, type, categoryId } = useEquipmentModal();
  const { isLoading, data, isError } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => getCategoryWithSpec(categoryId as string),
    enabled: categoryId !== undefined,
  });

  const isModalOpen = isOpen && type === 'addEquipmentType';

  // Initialize form with dynamic schema
  const formSchema = data
    ? createFormSchema(data.specifications)
    : z.object({});
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // Reset form defaults when data changes
  useEffect(() => {
    if (data) {
      const defaultValues = data.specifications.reduce((acc, spec) => {
        const key = spec.name.toLowerCase().replace(/\s+/g, '');
        acc[key] = spec.dataType === 'number' ? undefined : '';
        return acc;
      }, {} as FormData);
      form.reset(defaultValues);
    }
  }, [data, form]);

  const onSubmit = (values: FormData) => {
    if (!data) return;

    // Transform form values into the desired JSON structure
    const specificationsJson: Record<string, SpecificationValue> = {};
    data.specifications.forEach((spec) => {
      const key = spec.name.toLowerCase().replace(/\s+/g, '');
      const value = values[key];
      if (value !== undefined) {
        if (spec.dataType === 'number' && spec.unit) {
          specificationsJson[key] = { value: Number(value), unit: spec.unit };
        } else {
          specificationsJson[key] = value;
        }
      }
    });

    const equipmentModelData = {
      modelName: form.getValues('modelName') || 'Unnamed Model', // Assuming modelName is added below
      categoryId: data.id,
      specifications: specificationsJson,
    };

    console.log('Submitting:', equipmentModelData);
    // TODO: Call your server action here, e.g., addEquipmentModel(equipmentModelData)
    onClose(); // Close modal on success (adjust based on actual submission logic)
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Equipment Model</DialogTitle>
        </DialogHeader>
        {isLoading && <Spinner size='large' />}
        {isError && <div className='text-red-600'>Failed to fetch data</div>}
        {data && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              {/* Model Name Field */}
              <FormField
                control={form.control}
                name='modelName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='e.g., Wärtsilä W18V50 Engine'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dynamic Specification Fields */}
              {data.specifications.map((spec) => {
                const fieldName = spec.name.toLowerCase().replace(/\s+/g, '');
                return (
                  <FormField
                    key={spec.id}
                    control={form.control}
                    name={fieldName}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {spec.name} {spec.unit && `(${spec.unit})`}
                          {spec.required && (
                            <span className='text-red-500'>*</span>
                          )}
                        </FormLabel>
                        <FormControl>
                          {spec.dataType === 'text' ? (
                            <Input
                              placeholder={`Enter ${spec.name}`}
                              {...field}
                              value={(field.value as string) || ''}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          ) : spec.dataType === 'number' ? (
                            <Input
                              type='number'
                              placeholder={`Enter ${spec.name}`}
                              {...field}
                              value={field.value as number | undefined}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value
                                    ? Number(e.target.value)
                                    : undefined
                                )
                              }
                            />
                          ) : null}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              })}

              {/* Submit Button */}
              <Button type='submit' className='w-full'>
                Create Equipment Model
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddEquipmentTypeModal;
