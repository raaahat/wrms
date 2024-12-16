import { RoleName } from '@prisma/client';
type RoleConfig = {
  bgColor: string;
  textColor: string;
  icon: string;
};
export const roleConfig = {
  [RoleName.ControlRoom]: {
    bgColor: '#FFE6E6',
    textColor: '#CC0000',
    icon: '📡',
  },
  [RoleName.ShiftIncharge]: {
    bgColor: '#FFF5CC',
    textColor: '#CC9900',
    icon: '🕒',
  },
  [RoleName.Employee]: { bgColor: '#E6F2FF', textColor: '#0059B3', icon: '👤' },
  [RoleName.OPEngr]: { bgColor: '#E8F8E8', textColor: '#228B22', icon: '🔧' },
  [RoleName.MMEngr]: { bgColor: '#F4E6FF', textColor: '#8B008B', icon: '🛠️' },
  [RoleName.EMEngr]: { bgColor: '#FFE6E6', textColor: '#B22222', icon: '⚙️' },
  [RoleName.OPManager]: {
    bgColor: '#E6FFFA',
    textColor: '#008B8B',
    icon: '📋',
  },
  [RoleName.MManager]: { bgColor: '#F2F2F2', textColor: '#505050', icon: '🏗️' },
  [RoleName.EManager]: { bgColor: '#FFF9E6', textColor: '#B8860B', icon: '🔌' },
  [RoleName.DGM]: { bgColor: '#EDEDED', textColor: '#2F4F4F', icon: '🏢' },
} satisfies Record<RoleName, RoleConfig>;
