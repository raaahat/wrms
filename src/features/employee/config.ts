import { RoleName } from '@prisma/client';

type RoleConfig<T extends RoleName> = {
  bgColor: string;
  textColor: string;
  icon: string;
  name: T;
};
export const roleConfig: Record<RoleName, RoleConfig<RoleName>> = {
  ControlRoom: {
    bgColor: '#FFE6E6',
    textColor: '#CC0000',
    icon: '📡',
    name: RoleName.ControlRoom,
  },
  ShiftIncharge: {
    bgColor: '#FFF5CC',
    textColor: '#CC9900',
    icon: '🕒',
    name: RoleName.ShiftIncharge,
  },
  Employee: {
    bgColor: '#E6F2FF',
    textColor: '#0059B3',
    icon: '👤',
    name: RoleName.Employee,
  },
  OPEngr: {
    bgColor: '#E8F8E8',
    textColor: '#228B22',
    icon: '🔧',
    name: RoleName.OPEngr,
  },
  MMEngr: {
    bgColor: '#F4E6FF',
    textColor: '#8B008B',
    icon: '🛠️',
    name: RoleName.MMEngr,
  },
  EMEngr: {
    bgColor: '#FFE6E6',
    textColor: '#B22222',
    icon: '⚙️',
    name: RoleName.EMEngr,
  },
  OPManager: {
    bgColor: '#E6FFFA',
    textColor: '#008B8B',
    icon: '📋',
    name: RoleName.OPManager,
  },
  MManager: {
    bgColor: '#F2F2F2',
    textColor: '#505050',
    icon: '🏗️',
    name: RoleName.MManager,
  },
  EManager: {
    bgColor: '#FFF9E6',
    textColor: '#B8860B',
    icon: '🔌',
    name: RoleName.EManager,
  },
  DGM: {
    bgColor: '#EDEDED',
    textColor: '#2F4F4F',
    icon: '🏢',
    name: RoleName.DGM,
  },
};
