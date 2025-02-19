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
import { CatagoriesWithSpec } from '../query';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { addSpecForCatagory, deleteParameterTemplate } from '../action';
import { revalidatePath } from 'next/cache';
import { Input } from '@/components/ui/input';
import { Dispatch, SetStateAction, useState } from 'react';
import { Check, CircleAlert, Plus, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { dataTypeEnum } from '../type';

export const EquipmentCatagoryList = ({
  catagories,
}: {
  catagories: CatagoriesWithSpec;
}) => {
  const [adding, setAdding] = useState(false);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <>
      <Accordion type='single' collapsible className='space-y-4 px-6'>
        {catagories.map((cat) => (
          <AccordionItem
            key={cat.id}
            value={cat.name}
            className='border rounded-md'
          >
            <AccordionTrigger className='px-6'>{cat.name}</AccordionTrigger>
            <AccordionContent className='px-10'>
              Specification Template
              <form onSubmit={handleSubmit}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Name</TableHead>

                      <TableHead>Data Type</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Required</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cat.parameters.map((par) => (
                      <TableRow key={par.id}>
                        <TableCell>{par.order}</TableCell>
                        <TableCell>{par.name}</TableCell>

                        <TableCell> {par.dataType}</TableCell>
                        <TableCell>{par.unit}</TableCell>
                        <TableCell>{par.required ? 'True' : 'False'}</TableCell>
                        <TableCell>
                          <Button
                            type='button'
                            size={'sm'}
                            variant={'destructive'}
                            onClick={async () => {
                              await deleteParameterTemplate(par.id);
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {adding && (
                      <AddParameterForm
                        catagoryId={cat.id}
                        setAdding={setAdding}
                      />
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={6}>
                        <Button type='button' onClick={() => setAdding(true)}>
                          {' '}
                          Add
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </form>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

function AddParameterForm({
  catagoryId,
  setAdding,
}: {
  catagoryId: string;
  setAdding: Dispatch<SetStateAction<boolean>>;
}) {
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [order, setOrder] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [dataType, setDataType] = useState<string>(dataTypeEnum.Values.text);
  const [unit, setUnit] = useState<string>('');
  const [required, setRequired] = useState<boolean>(true);
  async function handleSubmit() {
    // if ([name, dataType].includes('')) return;
    const data = {
      order,
      name,
      dataType,
      unit,
      required,
    };
    const result = await addSpecForCatagory(catagoryId, data);
    if (!result.success || result.errors) {
      setErrorMessage((result.errors as string[]) || []);
    }
  }
  return (
    <>
      <TableRow>
        <TableCell>
          <Input
            placeholder='Order'
            type='number'
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          />
        </TableCell>
        <TableCell>
          <Input
            placeholder='Name...'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </TableCell>
        <TableCell>
          <Select value={dataType} onValueChange={setDataType} required>
            <SelectTrigger className='w-full'>
              {dataType === '' ? 'Select' : dataType}
            </SelectTrigger>
            <SelectContent>
              {Object.values(dataTypeEnum.Values).map((value, i) => (
                <SelectItem key={value + i} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </TableCell>
        <TableCell>
          <Input
            placeholder='Unit...'
            type='text'
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
        </TableCell>
        <TableCell>
          <Switch checked={required} onCheckedChange={setRequired} />
        </TableCell>
        <TableCell className='flex gap-2'>
          <Button
            type='submit'
            className='group rounded-full'
            variant='outline'
            size='icon'
            onClick={handleSubmit}
            title='Add Specification'
          >
            <Check
              className='transition-transform duration-500 [transition-timing-function:cubic-bezier(0.68,-0.6,0.32,1.6)] group-aria-expanded:rotate-[135deg]'
              size={16}
              strokeWidth={2}
              aria-hidden='true'
            />
          </Button>
          <Button
            className='group rounded-full'
            variant='outline'
            size='icon'
            onClick={() => setAdding(false)}
            title='Cancel'
          >
            <X
              className='transition-transform duration-500 [transition-timing-function:cubic-bezier(0.68,-0.6,0.32,1.6)] group-aria-expanded:rotate-[135deg]'
              size={16}
              strokeWidth={2}
              aria-hidden='true'
            />
          </Button>
        </TableCell>
      </TableRow>
      {errorMessage.length !== 0 && (
        <TableRow>
          <TableCell colSpan={6}>
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
