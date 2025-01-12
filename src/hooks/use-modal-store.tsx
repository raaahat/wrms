import { DeptWithDesig } from '@/features/employee/register/type';
import { RoleName } from '@prisma/client';
import { create } from 'zustand';

export type ModalType =
  | 'createDepartment'
  | 'invite'
  | 'deleteDepartment'
  | 'addDesignation'
  | 'deleteDesignation'
  | 'updateEmployee'
  | 'grantAccess';

export type ModalData = {
  userInfo?: {
    employeeId: string;
    name: string;
    department?: string;
    designation?: string | null;
    phone: string;
    verified: Date | null;
  };
  designationId?: string;
  departmentInfo?: {
    id?: string;
    name: string;
  };
};
export type ModalStore = {
  roles: { id: string; name: RoleName }[];
  setRoles: (value: { id: string; name: RoleName }[]) => void;
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  deptWithDesig: DeptWithDesig;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
  setDeptWithDesig: (data: DeptWithDesig) => void;
};

export const useModal = create<ModalStore>((set) => ({
  roles: [],
  setRoles: (value) => set({ roles: value }),
  type: null,
  data: {},
  isOpen: false,
  deptWithDesig: [],
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
  setDeptWithDesig: (data) => {
    set({ deptWithDesig: data });
  },
}));
