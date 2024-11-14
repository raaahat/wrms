import { WRModalProvider } from '@/features/work-request/providers/modal-provider';

const WRPageLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <WRModalProvider />

      {children}
    </>
  );
};

export default WRPageLayout;
