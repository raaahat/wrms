import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

type Area = {
  name: string;
  children?: Area[];
};

const realAreas: Area[] = [
  {
    name: 'Engine-01',
    children: [
      { name: 'Fuel Filter' },
      { name: 'LO Manual Filter' },
      { name: 'LO Auto Filter' },
      { name: 'Prelube Pump' },
      { name: 'Fuel Booster Pump' },
      { name: 'Preheater Pump' },
      { name: 'Cyl. A1' },
      { name: 'Cyl. A2' },
      { name: 'Cyl. A3' },
      { name: 'Cyl. A4' },
      { name: 'Cyl. A5' },
      { name: 'Cyl. A6' },
      { name: 'Cyl. A7' },
      { name: 'Cyl. A8' },
      { name: 'Cyl. A9' },
      { name: 'Cyl. B1' },
      { name: 'Cyl. B2' },
      { name: 'Cyl. B3' },
      { name: 'Cyl. B4' },
      { name: 'Cyl. B5' },
      { name: 'Cyl. B6' },
      { name: 'Cyl. B7' },
      { name: 'Cyl. B8' },
      { name: 'Cyl. B9' },
    ],
  },
  {
    name: 'Engine-02',
    children: [
      { name: 'Fuel Filter' },
      { name: 'LO Manual Filter' },
      { name: 'LO Auto Filter' },
      { name: 'Prelube Pump' },
      { name: 'Fuel Booster Pump' },
      { name: 'Preheater Pump' },
      { name: 'Cyl. A1' },
      { name: 'Cyl. A2' },
      { name: 'Cyl. A3' },
      { name: 'Cyl. A4' },
      { name: 'Cyl. A5' },
      { name: 'Cyl. A6' },
      { name: 'Cyl. A7' },
      { name: 'Cyl. A8' },
      { name: 'Cyl. A9' },
      { name: 'Cyl. B1' },
      { name: 'Cyl. B2' },
      { name: 'Cyl. B3' },
      { name: 'Cyl. B4' },
      { name: 'Cyl. B5' },
      { name: 'Cyl. B6' },
      { name: 'Cyl. B7' },
      { name: 'Cyl. B8' },
      { name: 'Cyl. B9' },
    ],
  },
  {
    name: 'Engine-03',
    children: [
      { name: 'Fuel Filter' },
      { name: 'LO Manual Filter' },
      { name: 'LO Auto Filter' },
      { name: 'Prelube Pump' },
      { name: 'Fuel Booster Pump' },
      { name: 'Preheater Pump' },
      { name: 'Cyl. A1' },
      { name: 'Cyl. A2' },
      { name: 'Cyl. A3' },
      { name: 'Cyl. A4' },
      { name: 'Cyl. A5' },
      { name: 'Cyl. A6' },
      { name: 'Cyl. A7' },
      { name: 'Cyl. A8' },
      { name: 'Cyl. A9' },
      { name: 'Cyl. B1' },
      { name: 'Cyl. B2' },
      { name: 'Cyl. B3' },
      { name: 'Cyl. B4' },
      { name: 'Cyl. B5' },
      { name: 'Cyl. B6' },
      { name: 'Cyl. B7' },
      { name: 'Cyl. B8' },
      { name: 'Cyl. B9' },
    ],
  },
  {
    name: 'Engine-04',
    children: [
      { name: 'Fuel Filter' },
      { name: 'LO Manual Filter' },
      { name: 'LO Auto Filter' },
      { name: 'Prelube Pump' },
      { name: 'Fuel Booster Pump' },
      { name: 'Preheater Pump' },
      { name: 'Cyl. A1' },
      { name: 'Cyl. A2' },
      { name: 'Cyl. A3' },
      { name: 'Cyl. A4' },
      { name: 'Cyl. A5' },
      { name: 'Cyl. A6' },
      { name: 'Cyl. A7' },
      { name: 'Cyl. A8' },
      { name: 'Cyl. A9' },
      { name: 'Cyl. B1' },
      { name: 'Cyl. B2' },
      { name: 'Cyl. B3' },
      { name: 'Cyl. B4' },
      { name: 'Cyl. B5' },
      { name: 'Cyl. B6' },
      { name: 'Cyl. B7' },
      { name: 'Cyl. B8' },
      { name: 'Cyl. B9' },
    ],
  },
  {
    name: 'Engine-05',
    children: [
      { name: 'Fuel Filter' },
      { name: 'LO Manual Filter' },
      { name: 'LO Auto Filter' },
      { name: 'Prelube Pump' },
      { name: 'Fuel Booster Pump' },
      { name: 'Preheater Pump' },
      { name: 'Cyl. A1' },
      { name: 'Cyl. A2' },
      { name: 'Cyl. A3' },
      { name: 'Cyl. A4' },
      { name: 'Cyl. A5' },
      { name: 'Cyl. A6' },
      { name: 'Cyl. A7' },
      { name: 'Cyl. A8' },
      { name: 'Cyl. A9' },
      { name: 'Cyl. B1' },
      { name: 'Cyl. B2' },
      { name: 'Cyl. B3' },
      { name: 'Cyl. B4' },
      { name: 'Cyl. B5' },
      { name: 'Cyl. B6' },
      { name: 'Cyl. B7' },
      { name: 'Cyl. B8' },
      { name: 'Cyl. B9' },
    ],
  },
  {
    name: 'Engine-06',
    children: [
      { name: 'Fuel Filter' },
      { name: 'LO Manual Filter' },
      { name: 'LO Auto Filter' },
      { name: 'Prelube Pump' },
      { name: 'Fuel Booster Pump' },
      { name: 'Preheater Pump' },
      { name: 'Cyl. A1' },
      { name: 'Cyl. A2' },
      { name: 'Cyl. A3' },
      { name: 'Cyl. A4' },
      { name: 'Cyl. A5' },
      { name: 'Cyl. A6' },
      { name: 'Cyl. A7' },
      { name: 'Cyl. A8' },
      { name: 'Cyl. A9' },
      { name: 'Cyl. B1' },
      { name: 'Cyl. B2' },
      { name: 'Cyl. B3' },
      { name: 'Cyl. B4' },
      { name: 'Cyl. B5' },
      { name: 'Cyl. B6' },
      { name: 'Cyl. B7' },
      { name: 'Cyl. B8' },
      { name: 'Cyl. B9' },
    ],
  },
  { name: 'LO sep-01' },
  { name: 'LO sep-02' },
  { name: 'LO sep-03' },
  { name: 'LO sep-04' },
  { name: 'LO sep-05' },
  { name: 'LO sep-06' },
  { name: 'HFO sep-01' },
  { name: 'HFO sep-02' },
  { name: 'HFO sep-03' },
  { name: 'SAC-01' },
  { name: 'SAC-02' },
  { name: 'SAC-03' },
  { name: 'IAC-01' },
  { name: 'IAC-02' },
  { name: 'EGB-01' },
  { name: 'EGB-02' },
  { name: 'EGB-03' },
  { name: 'EGB-04' },
  { name: 'EGB-05' },
  { name: 'EGB-06' },
  { name: 'Auxilary Boiler' },
  { name: 'STG Hall' },
  { name: 'Engine Hall' },
  { name: 'FTP' },
  { name: 'WTP' },
  { name: 'Switch Gear Room' },
  { name: 'Control Room' },
  { name: 'Substation Area' },
  { name: 'Fire Pump House' },
  { name: 'Cooling Tower Pump House' },
  { name: 'Cooling Tower Fan-01' },
  { name: 'Cooling Tower Fan-02' },
  { name: 'Cooling Tower Fan-03' },
];

const dummyAreas: Area[] = [
  {
    name: 'Main Building',
    children: [
      {
        name: 'Production Floor',
        children: [
          {
            name: 'Assembly Line 1',
            children: [
              { name: 'Conveyor Belt' },
              { name: 'Robotic Arm' },
              { name: 'Inspection Camera' },
            ],
          },
          {
            name: 'Assembly Line 2',
            children: [
              { name: 'Soldering Station' },
              { name: 'Pneumatic Press' },
            ],
          },
          {
            name: 'Quality Control Zone',
            children: [
              { name: 'Digital Calipers' },
              { name: 'Weighing Scale' },
              { name: 'Surface Tester' },
            ],
          },
          {
            name: 'Packaging Zone',
            children: [
              { name: 'Shrink Wrap Machine' },
              { name: 'Box Sealer' },
              { name: 'Palletizer' },
            ],
          },
        ],
      },
      {
        name: 'Warehouse',
        children: [
          {
            name: 'Raw Materials Section',
            children: [{ name: 'Forklift 01' }, { name: 'Pallet Jack' }],
          },
          {
            name: 'Finished Goods Section',
            children: [{ name: 'Forklift 02' }, { name: 'Stacking Machine' }],
          },
          {
            name: 'Shipping and Receiving Area',
            children: [
              { name: 'Dock Leveler' },
              { name: 'Truck Loading Ramp' },
            ],
          },
        ],
      },
      {
        name: 'Maintenance Workshop',
        children: [
          {
            name: 'Mechanical Tools Area',
            children: [
              { name: 'Lathe Machine' },
              { name: 'Drill Press' },
              { name: 'Hydraulic Press' },
            ],
          },
          {
            name: 'Electrical Tools Area',
            children: [
              { name: 'Multimeter' },
              { name: 'Cable Cutter' },
              { name: 'Oscilloscope' },
            ],
          },
          {
            name: 'Spare Parts Storage',
            children: [
              { name: 'Gear Assemblies' },
              { name: 'Bearing Sets' },
              { name: 'Electrical Relays' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Power Plant',
    children: [
      {
        name: 'Generators Area',
        children: [
          { name: 'Diesel Generator 01' },
          { name: 'Diesel Generator 02' },
        ],
      },
      {
        name: 'Control Room',
        children: [
          { name: 'SCADA System' },
          { name: 'Power Distribution Panel' },
        ],
      },
      {
        name: 'Transformer Yard',
        children: [
          { name: 'Step-Up Transformer' },
          { name: 'Oil-Cooled Transformer' },
        ],
      },
    ],
  },
  {
    name: 'Water Treatment Plant',
    children: [
      {
        name: 'Filtration Unit',
        children: [{ name: 'Sand Filter' }, { name: 'Carbon Filter' }],
      },
      {
        name: 'Chemical Treatment Unit',
        children: [
          { name: 'Chlorination Unit' },
          { name: 'pH Adjustment Tank' },
        ],
      },
      {
        name: 'Water Storage Tanks',
        children: [{ name: 'Raw Water Tank' }, { name: 'Treated Water Tank' }],
      },
    ],
  },
  {
    name: 'Administrative Block',
    children: [
      {
        name: 'Human Resources',
        children: [
          { name: 'Office Computer 01' },
          { name: 'Office Computer 02' },
        ],
      },
      {
        name: 'Finance and Accounting',
        children: [
          { name: 'Server Machine' },
          { name: 'Accounting Software Terminal' },
        ],
      },
      {
        name: 'IT Department',
        children: [
          { name: 'Firewall Appliance' },
          { name: 'Network Switch' },
          { name: 'Backup Server' },
        ],
      },
      {
        name: 'Executive Offices',
        children: [
          { name: 'Executive Desk 01' },
          { name: 'Executive Desk 02' },
        ],
      },
    ],
  },
];

export const seedAreas = async () => {
  const createArea = async (area: Area, parentId?: string) => {
    // Create the area
    const createdArea = await db.area.create({
      data: {
        name: area.name,
        parentId, // Associate with parent if exists
      },
    });

    console.log(`Created area: ${createdArea.name}`);

    // Recursively create children if they exist
    if (area.children) {
      for (const child of area.children) {
        await createArea(child, createdArea.id);
      }
    }
  };

  // Iterate through the top-level areas
  for (const area of realAreas) {
    await createArea(area);
  }

  console.log('Seeding areas completed.');
};
