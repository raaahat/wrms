import { Status } from '@prisma/client';
import {
  Clock,
  AlertCircle,
  PlayCircle,
  CheckCircle,
  CheckCircle2,
  Eye,
  XCircle,
  ArrowRightCircle,
} from 'lucide-react';
export function nextAvailableStatus(current: Status): Status[] {
  switch (current) {
    case Status.PLACED:
      return [Status.ONGOING, Status.PENDING];
    case Status.ONGOING:
      return [Status.DONE, Status.UNDER_OBSERVATION];
    case Status.DONE:
      return [Status.UNDER_OBSERVATION, Status.NOT_SOLVED, Status.FOLLOW_UP];
    case Status.UNDER_OBSERVATION:
      return [Status.DONE, Status.NOT_SOLVED, Status.FOLLOW_UP];
    default:
      return [];
  }
}

export const getStatusColor = (status: Status) => {
  const colors: Record<Status, string> = {
    PLACED: 'bg-blue-500',
    PENDING: 'bg-yellow-500',
    ONGOING: 'bg-purple-500',
    FINISHED: 'bg-green-500',
    DONE: 'bg-green-700',
    UNDER_OBSERVATION: 'bg-orange-500',
    NOT_SOLVED: 'bg-red-500',
    FOLLOW_UP: 'bg-indigo-500',
  };
  return colors[status];
};

export const getStatusIcon = (status: Status) => {
  const icons: Record<Status, React.ElementType> = {
    PLACED: Clock,
    PENDING: AlertCircle,
    ONGOING: PlayCircle,
    FINISHED: CheckCircle,
    DONE: CheckCircle2,
    UNDER_OBSERVATION: Eye,
    NOT_SOLVED: XCircle,
    FOLLOW_UP: ArrowRightCircle,
  };
  return icons[status];
};

export const INITIAL_DATERANGE: DateRangeType = {
  from: new Date(
    new Date(new Date().setDate(new Date().getDate() - 30)).setHours(0, 0, 0, 0)
  ), // 30 days ago, midnight
  to: undefined,
};

export type DateRangeType = {
  from: Date;
  to?: Date;
};
