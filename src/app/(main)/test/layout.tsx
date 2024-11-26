import { WRModalProvider } from '@/features/work-request/providers/modal-provider';

const WRPageLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <WRModalProvider />
      <div className="  flex-1 bg-blue-300 overflow-auto">{children}</div>
    </>
  );
};

export default WRPageLayout;
