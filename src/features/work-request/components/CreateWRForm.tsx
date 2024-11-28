'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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

import { AreaPicker } from './AreaPicker';
import { useCreateWRstore } from '../hooks/create-wr-store';
import { EmployeePickerComboBox } from './EmployeePickerComboBox';
import { CreateWRFormSchema, CreateWRFormSchemaType } from '../type';
import { createWorkRequest } from '../action';
import { toast } from 'sonner';
import { useWRModal } from '../hooks/modal-store';
import { useQueryClient } from '@tanstack/react-query';

export default function CreateWorkRequestForm() {
  const queryClient = useQueryClient();
  const { areaId, setAreaId, setCreatorId, creatorId } = useCreateWRstore();
  const { onClose } = useWRModal();
  const form = useForm<CreateWRFormSchemaType>({
    resolver: zodResolver(CreateWRFormSchema),
    defaultValues: {
      title: '',
      areaId: '',
      runningHour: undefined,
      creatorId: '',
      mode: Mode.NORMAL,
      type: undefined,
      remarks: '',
    },
  });
  useEffect(() => {
    if (areaId) form.setValue('areaId', areaId);
  }, [areaId, form]);
  useEffect(() => {
    if (creatorId) form.setValue('creatorId', creatorId);
  }, [creatorId, form]);

  async function onSubmit(formData: CreateWRFormSchemaType) {
    toast.loading('Creating Work Request...', {
      id: 'create-wr',
    });
    const { success, message } = await createWorkRequest(formData);
    if (!success) {
      toast.error(message, {
        id: 'create-wr',
      });
      return;
    }

    form.reset();
    setAreaId('');
    setCreatorId('');
    toast.success(message, {
      id: 'create-wr',
    });
    queryClient.invalidateQueries({ queryKey: ['workRequests'] });
    onClose();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 m-6 flex flex-col"
      >
        <div className="flex-1 grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2 xl:col-span-1">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
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
                  This will be the equipment or place of the work
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
                <FormLabel>Added By</FormLabel>
                <FormControl>
                  <EmployeePickerComboBox />
                </FormControl>
                <FormDescription>
                  Opreation Engineer who is creating this work request
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
          disabled={form.formState.isSubmitting}
          className=" w-full md:w-fit md:ml-auto"
        >
          {form.formState.isSubmitting ? 'Creating...' : 'Create Work Request'}
        </Button>
      </form>
    </Form>
  );
}
