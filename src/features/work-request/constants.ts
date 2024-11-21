import { Status } from '@prisma/client';

export function nextAvailableStatus(current: Status): Status[] {
  switch (current) {
    case Status.PLACED:
      return [Status.ONGOING, Status.PENDING];
    case Status.ONGOING:
      return [Status.DONE, Status.UNDER_OBSERVATION];
    case Status.DONE:
      return [Status.UNDER_OBSERVATION, Status.NOT_SOLVED, Status.FOLLOW_UP];
    default:
      return [];
  }
}
