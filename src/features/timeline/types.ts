import { Mode, Status, WrType } from '@prisma/client';

export interface WorkRequestCardProps {
  maintManager?: UserInfo;
  workRequest: {
    maintEngr?: UserInfo;
    id: string;
    wrNo: string;
    title: string;
    status: Status;
    createdAt: Date;
    type: WrType;
    runningHour?: string | null;
    remarks?: string | null;
    areaName?: string;
    creator: UserInfo;
  };
  children?: React.ReactNode;
}

export type UserInfo = {
  name: string;
  avatar: string;
  department: string;
  designation: string;
};

export type MaintEngrTimeLineType = {
  timelines: {
    maintManager: {
      designation: {
        department: {
          id: string;
          name: string;
          shortName: string;
        };
        id: string;
        title: string;
        shortTitle: string;
        departmentId: string;
      } | null;
      id: string;
      userId: string;
      imageUrl: string;
      name: string;
      email: string;
      phone: string;
      designationId: string | null;
      verified: Date | null;
      createdAt: Date;
      updatedAt: Date;
    } | null;
    shiftEngineer: {
      designation: {
        department: {
          id: string;
          name: string;
          shortName: string;
        };
        id: string;
        title: string;
        shortTitle: string;
        departmentId: string;
      } | null;
      id: string;
      userId: string;
      imageUrl: string;
      name: string;
      email: string;
      phone: string;
      designationId: string | null;
      verified: Date | null;
      createdAt: Date;
      updatedAt: Date;
    } | null;
    operationEngineer: {
      designation: {
        department: {
          id: string;
          name: string;
          shortName: string;
        };
        id: string;
        title: string;
        shortTitle: string;
        departmentId: string;
      } | null;
      id: string;
      userId: string;
      imageUrl: string;
      name: string;
      email: string;
      phone: string;
      designationId: string | null;
      verified: Date | null;
      createdAt: Date;
      updatedAt: Date;
    } | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    wrId: string;
    maintManagerId: string | null;
    maintEngrAssignedAt: Date | null;
    shiftEngrId: string | null;
    opEngrId: string | null;
    opEngrAssignedAt: Date | null;
    isolationConfirmedAt: Date | null;
    workDoneAt: Date | null;
  }[];
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  mode: Mode;
  wrNo: string;
  type: WrType;
  status: Status;
  maintEngrId: string | null;
  workStartedAt: Date | null;
  workFinishConfrimedAt: Date | null;
  remarks: string | null;
  runningHour: string | null;
  referredFromId: string | null;
  referredToId: string | null;
  creatorId: string;
  areaId: string;
}[];
