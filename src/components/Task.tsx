import React, { useState } from 'react';
import type { FC } from 'react';
import { Checkbox } from './ui/checkbox';
import { Ellipsis } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from './ui/dropdown-menu';

export interface CardProps {
  id: string;
  title: string;
  dueDate: string;
  status: string;
  index?: number;
  handleDelete?: (TaskId: string) => void;
  moveCard?: (dragIndex: number, hoverIndex: number) => void;
}

/* interface DragItem {
  index: number;
  id: string;
  type: string;
}

const ItemTypes = {
  CARD: 'card',
};
 */
const Task: FC<CardProps> = ({ id, title, dueDate, status, handleDelete }) => {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    if (checked) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };
  /* const ref = useRef<HTMLDivElement>(null); */
  /* const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref)); */
  return (
    <div className="flex items-center p-4 gap-4">
      <Checkbox id={id} checked={checked} onCheckedChange={handleCheck} />
      <div className="flex flex-row w-full justify-between items-center">
        <p className="min-w-80 font-urbanist text-sm font-medium ">{title}</p>
        <p className="min-w-24 font-urbanist text-sm font-medium">{dueDate}</p>
        <p className="min-w-24 font-urbanist text-sm font-medium">{status}</p>
        <p className="font-urbanist text-sm font-medium">Task Category</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* <DropdownMenuItem onClick={() => startEditing(file.id, file.name)}>
            Edit
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={() => handleDelete && handleDelete(id)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Task;
