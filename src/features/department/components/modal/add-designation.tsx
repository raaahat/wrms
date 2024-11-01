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
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
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
import { addDesignation } from '@/actions/designation';
import { CreateDesignationSchema } from '../../schema';
import { Loader2 } from 'lucide-react';

export const AddDesignationtModal = () => {
  const form = useForm<z.infer<typeof CreateDesignationSchema>>({
    defaultValues: {
      title: '',
      shortTitle: '',
    },
    resolver: zodResolver(CreateDesignationSchema),
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data, isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === 'addDesignation';

  async function onSubmit(values: z.infer<typeof CreateDesignationSchema>) {
    setLoading(true);
    if (!data.departmentInfo?.name) return;
    const { success, message } = await addDesignation(
      values,
      data.departmentInfo?.name
    );
    if (success) {
      toast({
        variant: 'default',
        title: message,
      });
      setLoading(false);
      form.reset();
      onClose();
      router.refresh();
    } else
      toast({
        variant: 'destructive',
        title: message,
      });
    setLoading(false);
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Add Designation for{' '}
            <span className=" capitalize">{data.departmentInfo?.name}</span>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className=" space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter designation title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="shortTitle"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter a short title for the designation"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loading} className=" w-full">
              Add {loading && <Loader2 className=" animate-spin" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
