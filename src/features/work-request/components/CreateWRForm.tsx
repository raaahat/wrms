'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mode, WrType } from '@prisma/client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AreaPicker } from './AreaPicker';
import { useCreateWRstore } from '../hooks/create-wr-store';

export const CreateWRFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .transform((value) => value.trim().replace(/\s+/g, ' ').toLowerCase()),
  areaId: z.string().min(1, 'Area is required'),
  runningHour: z.number().optional(),
  creatorId: z.string().min(1, 'Creator is required'),
  mode: z.nativeEnum(Mode),
  type: z.nativeEnum(WrType),
  remarks: z
    .string()
    .transform((value) => value.trim().replace(/\s+/g, ' ').toLowerCase())
    .optional(),
});

type FormValues = z.infer<typeof CreateWRFormSchema>;

export default function CreateWorkRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { areaId, setAreaId } = useCreateWRstore();
  const form = useForm<FormValues>({
    resolver: zodResolver(CreateWRFormSchema),
    defaultValues: {
      title: '',
      areaId: '',
      runningHour: undefined,
      creatorId: '',
      mode: Mode.NORMAL,
      type: WrType.ELECTRICAL,
      remarks: '',
    },
  });
  useEffect(() => {
    if (areaId) form.setValue('areaId', areaId);
  }, [areaId, form]);

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      // Here you would typically send the data to your API
      console.log(data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert('Work request created successfully!');
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while creating the work request.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 m-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2 xl:col-span-1">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title:{form.watch('title')}</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter work request title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="areaId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area</FormLabel>
                <FormControl>
                  <AreaPicker />
                </FormControl>
                <FormDescription>
                  Select or create Equipment / area
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="creatorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Creator</FormLabel>
                <FormControl>
                  <Input placeholder="Select creator" {...field} />
                </FormControl>
                <FormDescription>
                  This will be replaced with a combobox later.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="runningHour"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Running Hour</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter running hour (optional)"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mode</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={Mode.NORMAL}>Normal</SelectItem>
                    <SelectItem value={Mode.STRICT}>Strict</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={WrType.ELECTRICAL}>
                      Electrical
                    </SelectItem>
                    <SelectItem value={WrType.MECHANICAL}>
                      Mechanical
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter remarks (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-fit"
        >
          {isSubmitting ? 'Creating...' : 'Create Work Request'}
        </Button>
      </form>
    </Form>
  );
}
