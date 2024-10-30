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
import { DepartmentSchema } from '../../schema';
import { Loader2 } from 'lucide-react';

export const AddDepartmentModal = () => {
  const form = useForm<z.infer<typeof DepartmentSchema>>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(DepartmentSchema),
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data, isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === 'createDepartment';

  async function onSubmit(values: z.infer<typeof DepartmentSchema>) {
    const { success, message } = await addDepartment(values.name);
    toast({
      variant: success ? 'default' : 'destructive',
      title: message,
    });

    if (success) {
      setLoading(false);
      onClose();
      router.refresh();
    }
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Add Department
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
                      placeholder="Enter Department name"
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
