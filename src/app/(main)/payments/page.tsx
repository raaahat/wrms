import { Payment, columns } from './columns';
import { DataTable } from '../../../components/table/data-table';

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'a@example.com',
      role: 'rahat',
    },
    {
      id: '728ed52fhgjh',
      amount: 100.005,
      status: 'processing',
      email: 'b@example.com',
      role: 'rahat',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'd@example.com',
      role: 'rahat',
    },
    {
      id: '728ed52fhgjh',
      amount: 100.005,
      status: 'processing',
      email: 'c@example.com',
      role: 'rahat',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'z@example.com',
      role: 'rahat',
    },
    {
      id: '728ed52fhgjh',
      amount: 100.005,
      status: 'processing',
      email: 'm@example.com',
      role: 'rahat',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
      role: 'rahat',
    },
    {
      id: '728ed52fhgjh',
      amount: 100.005,
      status: 'processing',
      email: 'm@example.com',
      role: 'rahat',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
      role: 'rahat',
    },
    {
      id: '728ed52fhgjh',
      amount: 100.005,
      status: 'processing',
      email: 'm@example.com',
      role: 'rahat',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
      role: 'rahat',
    },
    {
      id: '728ed52fhgjh',
      amount: 100.005,
      status: 'processing',
      email: 'm@example.com',
      role: 'rahat',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
      role: 'rahat',
    },
    {
      id: '728ed52fhgjh',
      amount: 100.005,
      status: 'processing',
      email: 'm@example.com',
      role: 'rahat',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
      role: 'rahat',
    },
    {
      id: '728ed52fhgjh',
      amount: 100.005,
      status: 'processing',
      email: 'm@example.com',
      role: 'rahat',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
      role: 'rahat',
    },
    {
      id: '728ed52fhgjh',
      amount: 100.005,
      status: 'processing',
      email: 'm@example.com',
      role: 'rahat',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
      role: 'rahat',
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable filterBy="name" columns={columns} data={data} />
    </div>
  );
}
