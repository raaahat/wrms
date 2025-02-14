'use client';
import { usePageInfo } from '@/hooks/use-store';
import { Label } from '../ui/label';
import { Skeleton } from '../ui/skeleton';

const PageTitle = () => {
  const { isLoading, pageTitle } = usePageInfo();
  if (isLoading) return <Skeleton className='w-40 h-6' />;
  return <Label className='text-lg'>{pageTitle}</Label>;
};

export default PageTitle;
