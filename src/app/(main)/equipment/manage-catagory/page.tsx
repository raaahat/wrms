import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EquipmentCatagory } from '@/features/equipment/components/EquipmentCatagory';
import { EquipmentType } from '@/features/equipment/components/EquipmentType';

const ManageCatagoryPage = () => {
  return (
    <main className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>Equipment Management System</h1>
      <Tabs defaultValue='categories'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='categories'>catagory</TabsTrigger>
          <TabsTrigger value='types'>Equipment Types</TabsTrigger>
          <TabsTrigger value='equipment'>Equipment</TabsTrigger>
        </TabsList>
        <TabsContent value='categories'>
          <EquipmentCatagory />
        </TabsContent>
        <TabsContent value='types'>
          <EquipmentType />
        </TabsContent>
        <TabsContent value='equipment'>ff</TabsContent>
      </Tabs>
    </main>
  );
};

export default ManageCatagoryPage;
