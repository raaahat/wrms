import { usePathname } from 'next/navigation';
import { MobileSidebar } from './mobile-sidebar';

export const Navbar = () => {
  const path = usePathname();
  let text;
  try {
    text = path.slice(1);
  } catch (error) {
    text = 'Hi there';
  }
  return (
    <nav className=" py-4 px-6 flex items-center justify-between bg-background">
      <div className=" flex-col hidden md:flex">
        <h1 className=" text-2xl font-semibold capitalize ">{text}</h1>
        <p className=" text-muted-foreground">
          Monitor all of your projects and tasks
        </p>
      </div>
      <MobileSidebar />
    </nav>
  );
};
