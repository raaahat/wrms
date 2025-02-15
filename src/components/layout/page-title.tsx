'use client';
import { usePageInfo } from '@/hooks/use-store';
import { Label } from '../ui/label';
import { Skeleton } from '../ui/skeleton';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { DEFAULT_TITLES } from '../sidebar/constants';

const PageTitle = () => {
  const { isLoading, pageTitle, setPageTitle } = usePageInfo();
  const pathname = usePathname();
  useEffect(() => {
    setPageTitle(DEFAULT_TITLES[pathname] || pathname);
  }, [pathname]);
  if (isLoading) return <Skeleton className='w-40 h-6' />;
  return <Label className='text-lg'>{pageTitle}</Label>;
};

export default PageTitle;
