import React, { ReactElement, useState } from 'react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from './ui/collapsible';
import { ChevronUp, ChevronDown } from 'lucide-react';

type CardProps = {
  children?: ReactElement;
  headerColor: string;
  CardTitle: string;
};
const TaskCard = ({ headerColor, CardTitle, children }: CardProps) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full mt-8">
      <CollapsibleTrigger
        className="flex flex-row w-full justify-between items-center p-3 rounded-t-xl"
        style={{ backgroundColor: headerColor }}
      >
        <p>{CardTitle}</p>
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
