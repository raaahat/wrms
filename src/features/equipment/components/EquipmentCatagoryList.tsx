'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

import { addSpecForCatagory, deleteParameterTemplate } from '../action';
import { Input } from '@/components/ui/input';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  Check,
  CircleAlert,
  LoaderCircle,
  PlusCircleIcon,
  X,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useEquipmentModal } from '../store';
import { useForm } from 'react-hook-form';
import { SpecificationFormData, specificationSchema } from '../type';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
type Specification = {
  id: string;
  categoryId: string;
  name: string;
  dataType: string; // e.g., "text", "number"
  unit: string | null; // Nullable as per Prisma schema
  required: boolean;
};
type CategoryWithSpec = {
  id: string;
  name: string;
  specifications: Specification[];
};
export const EquipmentCategoryList = ({
  categories,
}: {
  categories: CategoryWithSpec[];
}) => {
  const { onOpen } = useEquipmentModal();

  return (
    <div className='space-y-4 px-6'>
      <Button onClick={() => onOpen('addCategory')}>
        <PlusCircleIcon className='mr-2 h-4 w-4' />
        Add Category
      </Button>
      <Accordion type='single' collapsible className='space-y-4'>
        {categories.map((cat) => (
          <AccordionItem
            key={cat.id}
            value={cat.name}
            className='border rounded-md'
          >
            <AccordionTrigger className='px-6'>{cat.name}</AccordionTrigger>
            <AccordionContent className='px-10'>
              <div className='mb-2'>Specification Template</div>
              <CategorySpecificationTable category={cat} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

function CategorySpecificationTable({
  category,
}: {
  category: CategoryWithSpec;
}) {
  const [adding, setAdding] = useState(false);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Data Type</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Required</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {category.specifications.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className='p-4'>
              No parameters defined
            </TableCell>
          </TableRow>
        ) : (
          category.specifications.map((par) => (
            <TableRow key={par.id}>
              <TableCell>{par.name}</TableCell>
              <TableCell>{par.dataType}</TableCell>
              <TableCell>{par.unit || '-'}</TableCell>
              <TableCell>{par.required ? 'True' : 'False'}</TableCell>
              <TableCell>
                <Button
                  type='button'
                  size='sm'
                  variant='destructive'
                  onClick={async () => {
                    await deleteParameterTemplate(par.id);
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
        {adding && (
          <TableRow>
            <TableCell colSpan={5}>
              <AddParameterForm
                categoryId={category.id}
                setAdding={setAdding}
              />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5} className='space-x-4'>
            <Button type='button' onClick={() => setAdding(!adding)}>
              {adding ? 'Cancel' : 'Add Parameter'}
            </Button>
            <AlertDelete />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function AddParameterForm({
  categoryId,
  setAdding,
}: {
  categoryId: string;
  setAdding: Dispatch<SetStateAction<boolean>>;
}) {
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  // Initialize the form with React Hook Form
  const form = useForm<SpecificationFormData>({
    resolver: zodResolver(specificationSchema),
    defaultValues: {
      name: '',
      dataType: 'text', // Default value
      unit: '',
      required: true, // Default to true as per Prisma schema
    },
  });
  // Handle form submission
  const onSubmit = async (data: SpecificationFormData) => {
    setLoading(true);
    setErrorMessage([]); // Clear previous errors

    const result = await addSpecForCatagory(categoryId, data);

    if (!result.success && result.errors) {
      setErrorMessage(result.errors as string[]);
      setLoading(false);
    } else if (result.success) {
      setAdding(false); // Close the form
      setLoading(false);
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <TableCell>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Name...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TableCell>
          <TableCell>
            <FormField
              control={form.control}
              name='dataType'
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select' />
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
          </TableCell>
          <TableCell>
            <FormField
              control={form.control}
              name='unit'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Unit...'
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TableCell>
          <TableCell>
            <FormField
              control={form.control}
              name='required'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </TableCell>
          <TableCell className='flex gap-2'>
            <Button
              type='submit'
              className='group rounded-full'
              variant='outline'
              size='icon'
              disabled={loading}
              title='Add Specification'
            >
              {loading ? (
                <LoaderCircle
                  className='w-full transition-all -ms-1 me-2 animate-spin'
                  size={16}
                  strokeWidth={2}
                  aria-hidden='true'
                />
              ) : (
                <Check
                  className='transition-transform duration-500 [transition-timing-function:cubic-bezier(0.68,-0.6,0.32,1.6)] group-aria-expanded:rotate-[135deg]'
                  size={16}
                  strokeWidth={2}
                  aria-hidden='true'
                />
              )}
            </Button>
            <Button
              className='group rounded-full'
              variant='outline'
              size='icon'
              onClick={() => setAdding(false)}
              title='Cancel'
              disabled={loading}
            >
              <X
                className='transition-transform duration-500 [transition-timing-function:cubic-bezier(0.68,-0.6,0.32,1.6)] group-aria-expanded:rotate-[135deg]'
                size={16}
                strokeWidth={2}
                aria-hidden='true'
              />
            </Button>
          </TableCell>
        </form>
      </Form>

      {errorMessage.length > 0 && (
        <TableRow>
          <TableCell colSpan={5}>
            <ErrorMessages errors={errorMessage} />
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

function ErrorMessages({ errors }: { errors: string[] }) {
  return (
    <div className='rounded-lg border border-red-500/50 px-4 py-3 text-red-600'>
      <div className='flex gap-3'>
        <CircleAlert
          className='mt-0.5 shrink-0 opacity-60'
          size={16}
          strokeWidth={2}
          aria-hidden='true'
        />
        <div className='grow space-y-1'>
          <p className='text-sm font-medium'>Validation Error:</p>
          <ul className='list-inside list-disc text-sm opacity-80'>
            {errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
function AlertDelete() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'destructive'}>Delete Category</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            can interact with this system
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              console.log('hiiii');
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
