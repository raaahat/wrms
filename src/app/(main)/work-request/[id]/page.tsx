'use client';

const sampleWorkRequest = {
  id: '1',
  wrNo: 'WR001',
  title: 'Fix Electrical Panel in Building A',
  type: 'ELECTRICAL',
  status: 'ONGOING',
  maintEngr: {
    id: '2',
    name: 'Jane Doe',
    imageUrl: '/placeholder.svg?height=40&width=40',
    designation: 'Senior Electrical Engineer',
    department: 'Maintenance',
  },
  workStartedAt: new Date('2023-05-15T09:00:00Z'),
  workFinishConfrimedAt: null,
  remarks:
    'Replacing faulty circuit breakers and rewiring the panel. Additional insulation required for safety measures.',
  mode: 'NORMAL',
  runningHour: '1500',
  creator: {
    id: '3',
    name: 'John Smith',
    imageUrl: '/placeholder.svg?height=40&width=40',
    designation: 'Facility Manager',
    department: 'Operations',
  },
  area: {
    id: '4',
    name: 'Building A - Electrical Room',
  },
  createdAt: new Date('2023-05-14T16:30:00Z'),
  updatedAt: new Date('2023-05-15T09:15:00Z'),
} as const;

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-gray-100 to-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Work Request Demo
      </h1>
      <div className="space-y-4">
        {/* <WorkRequestModal workRequest={sampleWorkRequest} />
        <WorkRequestModalTabbed workRequest={sampleWorkRequest} />
        <WorkRequestModalCompact workRequest={sampleWorkRequest} /> */}
      </div>
    </main>
  );
}
