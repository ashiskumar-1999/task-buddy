import React, { ReactNode, useState } from 'react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './ui/collapsible';
import { ChevronUp, ChevronDown } from 'lucide-react';

type CardProps = {
  children?: ReactNode;
  headerColor: string;
  CardTitle: string;
  isBoard: boolean;
};
const TaskCard = ({ CardTitle, headerColor, isBoard, children }: CardProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return isBoard === true ? (
    <div className="w-[25rem] h-[30rem] rounded-xl bg-gray-200 p-4 mt-8">
      <span
        className="min-w-16 p-2 rounded-sm  font-urbanist font-semibold text-base"
        style={{ backgroundColor: headerColor }}
      >
        {CardTitle}
      </span>
      {children}
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
        <div className="flex flex-col w-full min-h-[20.6rem] rounded-b-xl bg-gray-200">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default TaskCard;
