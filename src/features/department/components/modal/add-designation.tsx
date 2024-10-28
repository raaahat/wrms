'use client';
import { z } from 'zod';
import { useModal } from '@/hooks/use-modal-store';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { addDepartment } from '@/actions/department';
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
import { designationNameSchema } from '../../schema';
import { Loader2 } from 'lucide-react';

export const AddDesignationtModal = () => {
  const form = useForm<z.infer<typeof designationNameSchema>>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(designationNameSchema),
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data, isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === 'addDesignation';

  async function onSubmit(values: z.infer<typeof designationNameSchema>) {
    setLoading(true);
    if (!data.departmentInfo?.name) return;
    const { success, message } = await addDesignation(
      values,
      data.departmentInfo?.name
    );
    if (success)
      toast({
        variant: 'default',
        title: message,
      });
    else
      toast({
        variant: 'destructive',
        title: message,
      });
    setLoading(false);
    onClose();
    router.refresh();
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Add Designation
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className=" space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter designation name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loading} className=" w-full">
              Add {loading && <Loader2 />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
