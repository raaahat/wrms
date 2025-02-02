import EditEngineDataModal from '@/features/report/engine-parameters/components/EditDataModal';

const ReportLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <EditEngineDataModal />
      {children}
    </div>
  );
};

export default ReportLayout;
