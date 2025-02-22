import EquipmentModalProvider from '@/features/equipment/components/modal-provider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Equipment Management',
  description: 'Manage equipment categories, types, and instances',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <EquipmentModalProvider />
      {children}
    </>
  );
}
