'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DeptWithDesig, RegisterEmployeeSchema } from '../type';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { registerEmployee } from '@/actions/employee';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export const RegisterForm = ({
  deptWithDesig,
  defaultValues,
}: {
  deptWithDesig: DeptWithDesig;
  defaultValues?: { name: string };
}) => {
  const router = useRouter();
  const [designations, setDesignations] = useState<
    {
      id: string;
      title: string;
      departmentId: string;
    }[]
  >([]);

  const form = useForm<z.infer<typeof RegisterEmployeeSchema>>({
    resolver: zodResolver(RegisterEmployeeSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      department: '',
      designation: '',
      phone: '',
    },
  });
  async function handleSubmit(
    formData: z.infer<typeof RegisterEmployeeSchema>
  ) {
    const { success, message } = await registerEmployee(formData);

    toast({
      variant: success ? 'default' : 'destructive',
      title: message,
    });

    if (success) {
      router.refresh();
    }
  }
  const onDepartmentChange = (value: string) => {
    const department = deptWithDesig.find((dept) => dept.id === value);
    setDesignations(department ? department.designations : []);
    form.setValue('designation', ''); // Reset designation when department changes
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Submit a registration request to the admin. Once approved, you'll gain
          access to the system and its features.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      {...field}
                      onFocus={(e) => e.target.select()}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      onDepartmentChange(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {deptWithDesig.map((dept) => (
                        <SelectItem
                          className="capitalize"
                          key={dept.id}
                          value={dept.id}
                        >
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Select your department</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
              className={`space-y-6 transition-all duration-300 ease-in-out ${
                designations.length > 0
                  ? 'opacity-100 max-h-96'
                  : 'opacity-0 max-h-0 overflow-hidden'
              }`}
            >
              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designation</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Select a designation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {designations.map((designation) => (
                          <SelectItem
                            className="capitalize"
                            key={designation.id}
                            value={designation.id}
                          >
                            {designation.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Select your designation</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Your phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter your phone number (digits only)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
