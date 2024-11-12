import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Diff<T> = Partial<T>;

export function getChangedFields<T extends Record<string, any> | undefined>(
  initialState: T,
  newState: NonNullable<T>
): Diff<NonNullable<T>> {
  const changes: Diff<NonNullable<T>> = {};

  if (!initialState) {
    return newState;
  }

  for (const key in newState) {
    if (newState[key] !== initialState[key]) {
      changes[key] = newState[key];
    }
  }

  return changes;
}

export function cleanUpSpaces(input: string): string {
  return input.trim().replace(/\s+/g, ' ');
}
