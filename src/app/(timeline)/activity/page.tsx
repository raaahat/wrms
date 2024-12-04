import { currentProfile } from '@/database/current-profile';
import { MaintEngineerPanel } from '@/features/timeline/components/MaintEngineerPanel';
import { getTimelineActivity } from '@/features/timeline/query';
import { redirect } from 'next/navigation';

const ActivityPage = async () => {
  const profile = await currentProfile();
  if (!profile || !profile.verified) return redirect('/register');
  const timeline = await getTimelineActivity(profile.id);
  if (timeline?.wrIssuedTo.length !== 0 && timeline) {
    return (
      <MaintEngineerPanel profile={profile} timelines={timeline.wrIssuedTo} />
    );
  }
  return <div>you have no activities.</div>;
};

export default ActivityPage;

const tl = {
  wrIssuedTo: [
    {
      id: 'cm487tci30001s7hd4fukns1u',
      wrNo: 'MM-2412002',
      title: 'strict work request test for maintenance engineer',
      type: 'MECHANICAL',
      status: 'PENDING',
      maintEngrId: 'ee751b6b-1d7e-44ae-9c2c-a8c5938f869c',
      workStartedAt: null,
      workFinishConfrimedAt: null,
      remarks: '',
      mode: 'STRICT',
      runningHour: null,
      referredFromId: null,
      referredToId: null,
      creatorId: 'ae6f2cc6-7959-486a-a33f-8cfe6bee7f2e',
      areaId: 'cm4116i2g0006sfhq7iy8zaek',
      createdAt: '2024-12-03T08:46:35.401Z',
      updatedAt: '2024-12-03T08:48:13.016Z',
      timelines: [
        {
          id: 'cm487tcib0003s7hdiq3rtd2t',
          wrId: 'cm487tci30001s7hd4fukns1u',
          maintManagerId: '880e402b-a145-4955-9a18-2b9463ad814f',
          maintEngrAssignedAt: '2024-12-03T08:48:13.013Z',
          shiftEngrId: null,
          opEngrId: null,
          opEngrAssignedAt: null,
          isolationConfirmedAt: null,
          workDoneAt: null,
          createdAt: '2024-12-03T08:46:35.401Z',
          updatedAt: '2024-12-03T08:48:13.016Z',
          maintManager: {
            id: '880e402b-a145-4955-9a18-2b9463ad814f',
            userId: 'user_2o9PLOvUUlubFKupCXoHrmbVnmC',
            imageUrl:
              'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybzlQTE5YSEVNc1F0aTlOTFVYODN4ZTBwdHEifQ',
            name: 'rahat main',
            email: 'tareqemamrahat02@gmail.com',
            phone: '1234568959',
            designationId: '58c18b0d-4d05-43f8-b41b-3393b0372660',
            verified: '2024-11-29T13:55:05.815Z',
            createdAt: '2024-11-29T13:55:05.815Z',
            updatedAt: '2024-11-29T13:56:00.008Z',
            designation: {
              id: '58c18b0d-4d05-43f8-b41b-3393b0372660',
              title: 'Mechanical Manager',
              shortTitle: 'MM',
              departmentId: 'cf690a97-6210-44de-8d05-81538abb3af1',
              department: {
                id: 'cf690a97-6210-44de-8d05-81538abb3af1',
                name: 'mechanical',
                shortName: 'MM',
              },
            },
          },
          operationEngineer: null,
          shiftEngineer: null,
        },
      ],
    },
  ],
  operationTimeLines: [],
  shiftTimeLines: [],
  managedTimeLines: [],
};

const nore = {
  wrIssuedTo: [
    {
      id: 'cm487tci30001s7hd4fukns1u',
      wrNo: 'MM-2412002',
      title: 'strict work request test for maintenance engineer',
      type: 'MECHANICAL',
      status: 'PENDING',
      maintEngrId: 'ee751b6b-1d7e-44ae-9c2c-a8c5938f869c',
      workStartedAt: null,
      workFinishConfrimedAt: null,
      remarks: '',
      mode: 'STRICT',
      runningHour: null,
      referredFromId: null,
      referredToId: null,
      creatorId: 'ae6f2cc6-7959-486a-a33f-8cfe6bee7f2e',
      areaId: 'cm4116i2g0006sfhq7iy8zaek',
      createdAt: '2024-12-03T08:46:35.401Z',
      updatedAt: '2024-12-03T08:48:13.016Z',
      timelines: [
        {
          id: 'cm487tcib0003s7hdiq3rtd2t',
          wrId: 'cm487tci30001s7hd4fukns1u',
          maintManagerId: '880e402b-a145-4955-9a18-2b9463ad814f',
          maintEngrAssignedAt: '2024-12-03T08:48:13.013Z',
          shiftEngrId: null,
          opEngrId: null,
          opEngrAssignedAt: null,
          isolationConfirmedAt: null,
          workDoneAt: null,
          createdAt: '2024-12-03T08:46:35.401Z',
          updatedAt: '2024-12-03T08:48:13.016Z',
          maintManager: {
            id: '880e402b-a145-4955-9a18-2b9463ad814f',
            userId: 'user_2o9PLOvUUlubFKupCXoHrmbVnmC',
            imageUrl:
              'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybzlQTE5YSEVNc1F0aTlOTFVYODN4ZTBwdHEifQ',
            name: 'rahat main',
            email: 'tareqemamrahat02@gmail.com',
            phone: '1234568959',
            designationId: '58c18b0d-4d05-43f8-b41b-3393b0372660',
            verified: '2024-11-29T13:55:05.815Z',
            createdAt: '2024-11-29T13:55:05.815Z',
            updatedAt: '2024-11-29T13:56:00.008Z',
            designation: {
              id: '58c18b0d-4d05-43f8-b41b-3393b0372660',
              title: 'Mechanical Manager',
              shortTitle: 'MM',
              departmentId: 'cf690a97-6210-44de-8d05-81538abb3af1',
              department: {
                id: 'cf690a97-6210-44de-8d05-81538abb3af1',
                name: 'mechanical',
                shortName: 'MM',
              },
            },
          },
          operationEngineer: null,
          shiftEngineer: null,
        },
      ],
    },
    {
      id: 'cm48fnzcm00013w9vm7k0cnv9',
      wrNo: 'MM-2412003',
      title: 'another strict work request',
      type: 'MECHANICAL',
      status: 'PENDING',
      maintEngrId: '',
      workStartedAt: null,
      workFinishConfrimedAt: null,
      remarks: 'sads fd gdfsgdfs fgsd fds sdfsg s gsgsg',
      mode: 'STRICT',
      runningHour: null,
      referredFromId: null,
      referredToId: null,
      creatorId: 'ae6f2cc6-7959-486a-a33f-8cfe6bee7f2e',
      areaId: 'cm4115rdw0004sfhq20c372ft',
      createdAt: '2024-12-03T12:26:22.004Z',
      updatedAt: '2024-12-03T12:27:54.377Z',
      timelines: [
        {
          id: 'cm48fnzct00033w9vqdb7mghh',
          wrId: 'cm48fnzcm00013w9vm7k0cnv9',
          maintManagerId: '880e402b-a145-4955-9a18-2b9463ad814f',
          maintEngrAssignedAt: '2024-12-03T12:27:54.374Z',
          shiftEngrId: null,
          opEngrId: null,
          opEngrAssignedAt: null,
          isolationConfirmedAt: null,
          workDoneAt: null,
          createdAt: '2024-12-03T12:26:22.004Z',
          updatedAt: '2024-12-03T12:27:54.377Z',
          maintManager: {
            id: '880e402b-a145-4955-9a18-2b9463ad814f',
            userId: 'user_2o9PLOvUUlubFKupCXoHrmbVnmC',
            imageUrl:
              'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybzlQTE5YSEVNc1F0aTlOTFVYODN4ZTBwdHEifQ',
            name: 'rahat main',
            email: 'tareqemamrahat02@gmail.com',
            phone: '1234568959',
            designationId: '58c18b0d-4d05-43f8-b41b-3393b0372660',
            verified: '2024-11-29T13:55:05.815Z',
            createdAt: '2024-11-29T13:55:05.815Z',
            updatedAt: '2024-11-29T13:56:00.008Z',
            designation: {
              id: '58c18b0d-4d05-43f8-b41b-3393b0372660',
              title: 'Mechanical Manager',
              shortTitle: 'MM',
              departmentId: 'cf690a97-6210-44de-8d05-81538abb3af1',
              department: {
                id: 'cf690a97-6210-44de-8d05-81538abb3af1',
                name: 'mechanical',
                shortName: 'MM',
              },
            },
          },
          operationEngineer: null,
          shiftEngineer: null,
        },
      ],
    },
  ],
  operationTimeLines: [],
  shiftTimeLines: [],
  managedTimeLines: [],
};
