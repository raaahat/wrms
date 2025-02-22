'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { useMemo, useState } from 'react';
import { useEquipmentModal } from '../store';
import { EquipmentModel } from '@prisma/client';

const ViewEquipmentType = ({
  categories,
}: {
  categories: { [key: string]: EquipmentModel[] };
}) => {
  const { onOpen } = useEquipmentModal();
  const categoryNames = useMemo(() => {
    return Object.entries(categories).map(([key, value]) => ({
      name: key,
      count: value.length,
    }));
  }, [categories]);
  const [selectedCat, setSelectedCat] = useState<keyof typeof categories>(
    Object.keys(categories)[0] as keyof typeof categories
  );
  return (
    <div className='flex h-full'>
      <Card className=' basis-[40%] rounded-md'>
        <CardHeader>
          <CardTitle> Category</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2'>
          {categoryNames.map((obj) => (
            <Button
              variant={'ghost'}
              key={obj.name}
              className={cn(obj.name === selectedCat && 'bg-muted')}
              onClick={() => setSelectedCat(obj.name)}
            >
              {obj.name}
              <Badge
                variant={'outline'}
                className={cn(
                  obj.name === selectedCat && 'bg-muted-foreground text-muted'
                )}
              >
                {obj.count}
              </Badge>
            </Button>
          ))}
        </CardContent>
      </Card>
      <Card className=' w-full '>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type='single'>
            <Button className='mb-6' onClick={() => onOpen('addEquipmentType')}>
              Add {selectedCat}
            </Button>
            {categories[selectedCat] &&
              categories[selectedCat].length !== 0 &&
              categories[selectedCat].map((item) => (
                <AccordionItem
                  className='rounded-md border px-3'
                  key={item.id}
                  value={item.id}
                >
                  <AccordionTrigger> {item.modelName} </AccordionTrigger>
                  <AccordionContent>
                    Specifications:
                    <div>
                      {item.specifications &&
                        Object.entries(item.specifications).map(
                          ([key, value]) => (
                            <div>
                              {key}:{value.value} {value.unit}
                            </div>
                          )
                        )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewEquipmentType;
