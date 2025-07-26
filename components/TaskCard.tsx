import React, { ReactNode, useState } from 'react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './ui/collapsible';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

type CardProps = {
  children?: ReactNode;
  headerColor: string;
  CardTitle: string;
  isBoard: boolean;
};
const TaskCard = ({ CardTitle, headerColor, isBoard, children }: CardProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return isBoard === true ? (
    <div className="w-full lg:w-80 h-[30rem] rounded-xl bg-gray-200 p-4 mt-8 mb-4 lg:mb-0 lg:mr-4 last:mr-0">
      <span
        className="sticky min-w-16 p-2 rounded-sm font-urbanist font-semibold text-base"
        style={{ backgroundColor: headerColor }}
      >
        {CardTitle}
      </span>
      <ScrollArea>{children}</ScrollArea>
    </div>
  ) : (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full mt-8">
      <CollapsibleTrigger
        className="flex flex-row w-full justify-between items-center p-3 rounded-t-xl"
        style={{ backgroundColor: headerColor }}
      >
        <p className="font-urbanist font-semibold text-base">{CardTitle}</p>
        {isOpen ? (
          <ChevronUp className="w-9 h-9" />
        ) : (
          <ChevronDown className="w-9 h-9" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ScrollArea className="flex flex-col w-full h-[20.6rem] rounded-b-xl bg-gray-200">
          {children}
        </ScrollArea>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default TaskCard;
