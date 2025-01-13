import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { firebaseConfig } from '../config/firebase';
import { getDatabase } from 'firebase/database';
import TaskCard from '@/components/TaskCard';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import Task from '@/components/Task';
import { Input } from '@/components/ui/input';
import { Tabs, TabsTrigger, TabsList } from '@/components/ui/tabs';
import Createtask from '@/section/Createtask';
import ProfileSection from '@/section/ProfileSection';

export interface Item {
  id: number;
  text: string;
}

const dashboard = () => {
  const [tasks, setTasks] = useState<any>();
  const [url, setUrl] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const PhotoURL = localStorage.getItem('Photo');
      setUrl(PhotoURL);
      const ProfileName = localStorage.getItem('ProfileName');
      setName(ProfileName);
    }
  }, []);

  console.log('URL', url);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setTasks((prevTasks: any[]) => {
      // Create a copy of the previous array to avoid mutating the state directly
      const updatedCards = [...prevTasks];

      // Remove the item at dragIndex
      const [movedCard] = updatedCards.splice(dragIndex, 1);

      // Insert the removed item at hoverIndex
      updatedCards.splice(hoverIndex, 0, movedCard);

      return updatedCards;
    });
  }, []);

  return (
    <Tabs defaultValue="list">
      <div className="px-9 py-14">
        <div className="flex flex-row justify-between items-start -mb-8">
          <Logo />
          <ProfileSection url={url} name={name} />
        </div>
        <TabsList className="pl-0 space-x-2 border-none bg-transparent">
          <TabsTrigger
            value="list" /* 
            className="border-b border-transparent px-0 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
           */
          >
            <span className="text-xl font-medium">List</span>
          </TabsTrigger>
          <TabsTrigger value="board">
            <span className="text-xl font-medium">Board</span>
          </TabsTrigger>
        </TabsList>
        <div className="flex flex-row items-center justify-between pt-4">
          <div>
            <span>Filter By:</span>
          </div>
          <div className="flex flex-row items-center gap-4">
            <Input
              placeholder="🔎 Search"
              className="p-1.5 font-urbanist text-xs font-semibold rounded-full"
            />
            <Button
              className="px-10 py-6 rounded-full bg-[#7B1984] hover:bg-[#7B1984] font-urbanist text-sm font-bold "
              onClick={() => setIsOpen(true)}
            >
              Add Task
            </Button>
            <Createtask
              isDialogOpen={isOpen}
              onDialogClose={() => setIsOpen(false)}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <TaskCard headerColor="#FAC3FF" CardTitle="Todo">
            <Task
              id={1}
              text={'Change the color of the button'}
              index={0}
              moveCard={moveCard}
            />
            <Task
              id={2}
              text={'Change the color of the Text'}
              index={0}
              moveCard={moveCard}
            />
            <Task
              id={3}
              text={'Change the color of the button'}
              index={0}
              moveCard={moveCard}
            />
            <Task
              id={4}
              text={'Change the color of the button'}
              index={0}
              moveCard={moveCard}
            />
          </TaskCard>

          <TaskCard headerColor="#85D9F1" CardTitle="In-progress" />

          <TaskCard headerColor="#CEFFCC" CardTitle="Completed" />
        </div>
      </div>
    </Tabs>
  );
};

export default dashboard;
