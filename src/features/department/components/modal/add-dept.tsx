'use client';
import { z } from 'zod';
import { useModal } from '@/hooks/use-modal-store';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { addDepartment } from '@/actions/department';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { DepartmentSchema } from '../../schema';
import { Loader2 } from 'lucide-react';
import { useAsyncAction } from '@/hooks/use-async-action';

export const AddDepartmentModal = () => {
  const form = useForm<z.infer<typeof DepartmentSchema>>({
    defaultValues: {
      name: '',
      shortName: '',
    },
    resolver: zodResolver(DepartmentSchema),
  });
  const { isSubmitting: loading, performAction } =
    useAsyncAction('createDepartment');
  const router = useRouter();
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === 'createDepartment';

  async function onSubmit(values: z.infer<typeof DepartmentSchema>) {
    const success = await performAction(() =>
      addDepartment(values.name, values.shortName)
    );

    if (success) {
      form.reset();
      onClose();
      router.refresh();
    }
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Add Department
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className=' space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name='name'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      placeholder='Enter Department name'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='shortName'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      placeholder='Enter a short name for the department'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' disabled={loading} className=' w-full'>
              Add {loading && <Loader2 className=' animate-spin' />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
