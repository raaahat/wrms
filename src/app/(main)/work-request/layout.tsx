import { WRModalProvider } from '@/features/work-request/providers/modal-provider';

const WRPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <WRModalProvider />
      <div>{children}</div>
    </>
  );
};

export default WRPageLayout;
