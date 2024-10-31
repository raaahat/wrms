import AnimatedTabs from '@/components/layout/tab-bar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { EmployeeModalProvider } from '@/features/employee/components/modals/employee-modal-provider';

const EmployeeLayout = ({ children }: { children: React.ReactNode }) => {
  const tabItems = [
    {
      title: 'All',
      href: '/employee',
    },
    {
      title: 'pending',
      href: '/employee/pending',
    },
    {
      title: 'other',
      href: '/employee/other',
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Employees</CardTitle>
        <CardDescription>View and manage employees</CardDescription>
        <CardContent className=" p-0">
          <AnimatedTabs items={tabItems} className=" border-b" />
          <EmployeeModalProvider />
          {children}
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default EmployeeLayout;
