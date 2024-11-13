'use client';
import {
  Accordion,
  AccordionBlock,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/features/Area/components/accordion';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { NestedDatas } from './NestedData';

type Data = {
  name: string;
  id: string;
  parentId: string | null;
  createdAt: string;
};

export interface NestedData extends Data {
  children?: NestedData[];
}
const areas: NestedData[] = [
  {
    id: 'cm3d0rw970000sgcxyd9u01bi',
    name: 'Engine Hall',
    parentId: null,
    createdAt: '2024-11-11T12:48:38.923Z',
    children: [
      {
        id: 'cm3d0sk570001sgcxexiwj6qw',
        name: 'Engine-01',
        parentId: 'cm3d0rw970000sgcxyd9u01bi',
        createdAt: '2024-11-11T12:49:09.884Z',
        children: [
          {
            id: 'cm3d6d0w00005sgcx55bbwu32',
            name: 'Prelube Pump',
            parentId: 'cm3d0sk570001sgcxexiwj6qw',
            createdAt: '2024-11-11T15:25:02.784Z',
            children: [],
          },
        ],
      },
      {
        id: 'cm3eh509b0003vnnnsc0fy84u',
        name: 'Engine-02',
        parentId: 'cm3d0rw970000sgcxyd9u01bi',
        createdAt: '2024-11-12T13:14:30.613Z',
        children: [],
      },
      {
        id: 'cm3eh5sc70005vnnnutgi9isr',
        name: 'Engine-03',
        parentId: 'cm3d0rw970000sgcxyd9u01bi',
        createdAt: '2024-11-12T13:15:06.992Z',
        children: [],
      },
      {
        id: 'cm3eh69mf0007vnnnph14hat4',
        name: 'Engine-04',
        parentId: 'cm3d0rw970000sgcxyd9u01bi',
        createdAt: '2024-11-12T13:15:29.389Z',
        children: [],
      },
      {
        id: 'cm3d9lej70000134q6xz9qqfj',
        name: 'LO Sep-02',
        parentId: 'cm3d0rw970000sgcxyd9u01bi',
        createdAt: '2024-11-11T16:55:32.564Z',
        children: [],
      },
    ],
  },
  {
    id: 'cm3d0t7810002sgcxnxwjnnp9',
    name: 'FTP',
    parentId: null,
    createdAt: '2024-11-11T12:49:39.793Z',
    children: [
      {
        id: 'cm3d0u3el0003sgcxhmcpha0x',
        name: 'HFO Sep-01',
        parentId: 'cm3d0t7810002sgcxnxwjnnp9',
        createdAt: '2024-11-11T12:50:21.502Z',
        children: [],
      },
    ],
  },
  {
    id: 'cm3elg4ej000fvnnnbh8ev5pf',
    name: 'Tank Farm',
    parentId: null,
    createdAt: '2024-11-12T15:15:07.660Z',
    children: [],
  },
  {
    id: 'cm3d3rglh0004sgcx6bu97wmb',
    name: 'WTP',
    parentId: null,
    createdAt: '2024-11-11T14:12:17.477Z',
    children: [
      {
        id: 'cm3eh426x0001vnnn4twhlj2q',
        name: 'Raw water pump-01',
        parentId: 'cm3d3rglh0004sgcx6bu97wmb',
        createdAt: '2024-11-12T13:13:46.448Z',
        children: [],
      },
    ],
  },
];

const Page = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center flex-col gap-4 max-w-sm mx-auto">
      <Button className="flex-auto" onClick={() => setOpen((prev) => !prev)}>
        {open ? 'Close' : 'Open'}
      </Button>

      {areas.map((area) => (
        <NestedDatas
          name={area.name}
          id={area.id}
          key={area.id}
          allChildren={area.children}
        />
      ))}

      <Accordion type="multiple" className="w-full bg-slate-200 rounded-md">
        <AccordionItem value="item-1jk">
          <AccordionTrigger>
            <p className="px-3 my-auto ">Engine Hall</p>
          </AccordionTrigger>
          <AccordionContent>
            <Accordion
              type="single"
              collapsible
              className="w-full bg-slate-200 rounded-md"
            >
              <AccordionItem value="item-1jk">
                <AccordionTrigger>
                  <p className="p-1">Engine Hall</p>
                </AccordionTrigger>
                <AccordionContent>
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full bg-slate-200 rounded-md"
                  >
                    <AccordionItem value="item-1jk">
                      <AccordionTrigger>
                        <p className="p-1">Engine Hall</p>
                      </AccordionTrigger>
                      <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern. Lorem
                        ipsum dolor sit, amet consectetur adipisicing elit.
                        Nisi, quis dolorum. Architecto veritatis omnis qui quam,
                        adipisci porro dolore quibusdam?
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <AccordionBlock>rahat</AccordionBlock>
    </div>
  );
};

export default Page;
