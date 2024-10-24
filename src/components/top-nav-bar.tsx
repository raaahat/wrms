import { MobileSidebar } from './mobile-sidebar';

export const Navbar = () => {
  return (
    <nav className=" py-4 px-6 flex items-center justify-between">
      <div className=" flex-col hidden md:flex">
        <h1 className=" text-2xl font-semibold">Home</h1>
        <p className=" text-muted-foreground">
          Monitor all of your projects and tasks
        </p>
      </div>
      <MobileSidebar />
    </nav>
  );
};
