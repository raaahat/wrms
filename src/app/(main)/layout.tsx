import { Sidebar } from '@/components/sidebar';
import { Navbar } from '@/components/top-nav-bar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" min-h-screen">
      <div className=" flex w-full h-full">
        <div className=" fixed left-0 top-0 hidden md:block lg:w-[264] h-full overflow-y-auto">
          <Sidebar />
        </div>
        <div className=" md:pl-[264px] w-full">
          <div className="  mx-auto max-w-screen-2xl h-full">
            <Navbar />
            <main className=" h-full py-8 px-6 flex flex-col">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
