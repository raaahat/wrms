import { type ClassValue, clsx } from 'clsx';
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  parse,
  parseISO,
  startOfMonth,
} from 'date-fns';
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

export const wait = async (sec: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), sec * 1000);
  });
};

export function generateAvatar(fullName: string): {
  bgColor: string;
  text: string;
} {
  // Split the full name into words
  const words = fullName.trim().split(/\s+/);

  // Generate the text for the avatar
  let text: string;
  if (words.length === 1) {
    text = words[0].substring(0, 2).toUpperCase(); // First 2 letters of the single word
  } else {
    text = (words[0][0] + words[words.length - 1][0]).toUpperCase(); // First letters of first and last words
  }

  // Generate a hash from the full name to derive a color
  let hash = 0;
  for (let i = 0; i < fullName.length; i++) {
    hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert hash to a valid hex color
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff; // Extract each byte
    color += ('00' + Math.max(0, Math.min(200, value)).toString(16)).slice(-2); // Clamp and convert to hex
  }

  return { bgColor: color, text };
}

export const toSlug = (str: string) => str.replace(/\s+/g, '-').toLowerCase();

export const getDaysInMonth = (month: string): string[] => {
  const startDate = startOfMonth(parseISO(`${month}-01`));
  const endDate = endOfMonth(startDate);

  return eachDayOfInterval({ start: startDate, end: endDate }).map((date) =>
    format(date, 'yyyy-MM-dd')
  );
};

export const getCurrentMonth = (): string => {
  return format(new Date(), 'yyyy-MM');
};
export const getCurrentDay = (): string => {
  return format(new Date(), 'yyyy-MM-dd');
};

export const formatMonthForUser = (month: string): string => {
  const parsedDate = parse(month, 'yyyy-MM', new Date());
  return format(parsedDate, 'MMMM yyyy'); // 'February 2025'
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};
