import {
  Accordion,
  AccordionBlock,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/features/Area/components/accordion';
import { NestedData } from './page';

interface NestedItemProps {
  name: string;
  allChildren?: NestedData[];
  key?: string;
  className?: string;
  id: string;
}
export const NestedDatas = ({
  name,
  allChildren,
  className,
  id,
}: NestedItemProps) => {
  return (
    <>
      {allChildren?.length !== 0 ? (
        <Accordion
          key={id}
          type="multiple"
          className="w-full bg-slate-200 rounded-md"
        >
          <AccordionItem value={id}>
            <AccordionTrigger>{name}</AccordionTrigger>

            <AccordionContent>
              {allChildren?.map((child) => {
                return (
                  <NestedDatas
                    key={child.id}
                    name={child.name}
                    allChildren={child.children}
                    id={child.id}
                  />
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <>
          <AccordionBlock>{name}</AccordionBlock>
        </>
      )}
    </>
  );
};
