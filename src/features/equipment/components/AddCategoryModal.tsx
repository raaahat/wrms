'use client';

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { useEquipmentModal } from '../store';
import { useFieldArray, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormData, formSchema } from '../type';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useAsyncAction } from '@/hooks/use-async-action';
import { addCategory } from '../action';

// const FormSchema = z.object({
//   category: z.string().min(1, 'Category name is required'),
//   specifications: z.array(
//     z.object({
//       name: z.string().min(1, 'Specification name is required'),
//       dataType: z.string().min(1, 'Data type is required'),
//       unit: z.string().optional(),
//       required: z.boolean().default(false),
//     })
//   ),
// });

const AddCategoryModal = () => {
  const { isOpen, onClose, type } = useEquipmentModal();
  const { isSubmitting, performAction } = useAsyncAction('add-category');
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: '',
      specifications: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'specifications',
  });

  const isModalOpen = isOpen && type === 'addCategory';
  const onSubmit = async (data: FormData) => {
    const success = await performAction(() => addCategory(data));
    if (success) {
      onClose();
    }
  };
  //   console.log('Form Data:', data);
  // };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Create Category</DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 overflow-y-auto max-h-[500px]'
          >
            {/* Category Name Field */}
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter category name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Specifications Section */}
            <div>
              <h3 className='text-lg font-semibold mb-2'>Specifications</h3>
              {fields.map((field, index) => {
                // Watch the dataType to conditionally render the unit field
                const dataType = form.watch(`specifications.${index}.dataType`);
                return (
                  <div
                    key={field.id}
                    className='space-y-4 border p-4 rounded-md mb-4'
                  >
                    {/* Specification Name */}
                    <FormField
                      control={form.control}
                      name={`specifications.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter specification name'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Data Type */}
                    <FormField
                      control={form.control}
                      name={`specifications.${index}.dataType`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select data type' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='text'>Text</SelectItem>
                              <SelectItem value='number'>Number</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Unit (shown only if dataType is 'number') */}
                    {dataType === 'number' && (
                      <FormField
                        control={form.control}
                        name={`specifications.${index}.unit`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Unit</FormLabel>
                            <FormControl>
                              <Input placeholder='Enter unit' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* Required Checkbox */}
                    <FormField
                      control={form.control}
                      name={`specifications.${index}.required`}
                      render={({ field }) => (
                        <FormItem className='flex items-center space-x-2'>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className='font-normal'>
                            Required
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    {/* Remove Specification Button */}
                    <Button
                      type='button'
                      variant='destructive'
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </div>
                );
              })}

              {/* Add Specification Button */}
              <Button
                type='button'
                onClick={() =>
                  append({
                    name: '',
                    dataType: 'text',
                    unit: '',
                    required: false,
                  })
                }
              >
                Add Specification
              </Button>
            </div>

            {/* Submit Button */}
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
