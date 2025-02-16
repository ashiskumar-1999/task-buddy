import React, { useEffect, useMemo, useState } from 'react';
import { firebaseConfig } from '../config/firebase';
import TaskCard from '@/components/TaskCard';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import Task from '@/components/Task';
import { Input } from '@/components/ui/input';
import { Tabs, TabsTrigger, TabsList } from '@/components/ui/tabs';
import Createtask from '@/section/Createtask';
import ProfileSection from '@/section/ProfileSection';
import { push, set, get, ref, remove, getDatabase } from '@firebase/database';
import { FormProps, TaskProps } from '@/types';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { SquareKanban, Rows3 } from 'lucide-react';
import { TabsContent } from '@radix-ui/react-tabs';

export interface Item {
  id: number;
  text: string;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [url, setUrl] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formDataTobeAdded, setFormDataTobeAdded] = useState<FormProps>();
  const router = useRouter();
  const db = getDatabase(firebaseConfig);
  const auth = getAuth(firebaseConfig);
  //Since the pathRef is defined globally in this function It tried to create the pathRef on each render which cause an infinte loop. Using useMemo will restrict the rendering and only render when the pathRef value is changed.
  const pathRef = useMemo(() => ref(db, 'Tasks/'), [db]);

  const statusCategories = [
    { title: 'To-Do', color: '#FAC3FF', key: 'to-do' },
    { title: 'In-Progress', color: '#85D9F1', key: 'in-progress' },
    { title: 'Completed', color: '#C3FFAC', key: 'completed' },
  ];

  // This functionality need some refactoring to behave properly.
  /* const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setTasks((prevTasks: any[]) => {
      // Create a copy of the previous array to avoid mutating the state directly
      const updatedCards = [...prevTasks];

      // Remove the item at dragIndex
      const [movedCard] = updatedCards.splice(dragIndex, 1);

      // Insert the removed item at hoverIndex
      updatedCards.splice(hoverIndex, 0, movedCard);

      return updatedCards;
    });
  }, []); */

  const handleSignOut = async () => {
    await signOut(auth)
      .then(() => {
        setTimeout(() => {
          router.push('/');
        }, 1000);
      })
      .catch((err) => console.error(err));
  };
  const handleSubmit = async (formData: FormProps) => {
    console.log(formData);
    setFormDataTobeAdded(formData);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const PhotoURL = localStorage.getItem('Photo');
      setUrl(PhotoURL);
      const ProfileName = localStorage.getItem('ProfileName');
      setName(ProfileName);
    }
  }, []);
  useEffect(() => {
    if (!formDataTobeAdded) return;
    else {
      const SaveDataToFireBase = async () => {
        try {
          await set(push(pathRef), {
            title: formDataTobeAdded?.title,
            description: formDataTobeAdded?.description,
            dueDate: formDataTobeAdded?.dueDate,
            status: formDataTobeAdded?.status,
            fileURL: formDataTobeAdded?.uploadFile,
          });
        } catch (error) {
          console.error(error);
        }
      };
      SaveDataToFireBase();
    }
  }, [formDataTobeAdded, pathRef]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await get(pathRef).then((snapshot) => {
          if (snapshot.exists() && snapshot.val()) {
            const Tasks = Object.entries(
              snapshot.val() as Record<string, TaskProps>
            ).map(([key, value]) => ({
              ...value,
              id: key,
            }));
            setTasks(Tasks);
          }
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, [formDataTobeAdded, pathRef]);

  const handleTaskRemove = async (TaskId: string | []) => {
    const newPathRef = ref(db, 'Tasks/' + TaskId);
    await remove(newPathRef)
      .then(() => {
        console.log('Task removed successfully');
        // Update the tasks state to reflect the removal
        setTasks((prevTasks: TaskProps[]) =>
          prevTasks.filter((task: TaskProps) => task.id !== TaskId)
        );
      })
      .catch((error) => {
        console.error('Error removing task: ', error);
      });
  };

  const handleChangeStatus = async () => {};

  const filterTasksByStatus = (statusKey: string) => {
    return (
      tasks && tasks.filter((task: TaskProps) => task.status === statusKey)
    );
  };
  const replaceCapitalLetter = (string: string) => {
    return string.replace(/\b\w|-(\w)/g, (str) => str.toUpperCase());
  };

  return (
    <Tabs defaultValue="list">
      <div className="px-9 py-8">
        <div className="flex flex-row justify-between items-start sm:-mb-8">
          <Logo />
          <ProfileSection url={url} name={name} handleSignOut={handleSignOut} />
        </div>
        <TabsList className="pl-0 space-x-2 border-none bg-transparent">
          <TabsTrigger
            value="list"
            className="text-xl  font-medium border border-transparent rounded-none data-[state=active]:border-b data-[state=active]:border-solid data-[state=active]:border-b-black data-[state=active]:text-black data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <span className="inline-block p-1">
              <Rows3 />
            </span>
            List
          </TabsTrigger>
          <TabsTrigger
            value="board"
            className="text-xl font-medium border border-transparent rounded-none data-[state=active]:text-black data-[state=active]:border-b data-[state=active]:border-solid data-[state=active]:border-b-black data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <span className="inline-block p-1">
              <SquareKanban />
            </span>
            Board
          </TabsTrigger>
        </TabsList>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4">
          <div>
            <span className="font-urbanist font-semibold text-left">
              Filter By:
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Input
              placeholder="Search"
              className="p-1.5 font-urbanist text-xs font-semibold rounded-full"
            />
            <Button
              className="w-full sm:w-none md:px-10 py-6 rounded-full bg-[#7B1984] hover:bg-[#7B1984] font-urbanist text-sm font-bold "
              onClick={() => setIsOpen(true)}
            >
              Add Task
            </Button>
            <Createtask
              onSubmit={handleSubmit}
              isDialogOpen={isOpen}
              onDialogClose={() => setIsOpen(false)}
            />
          </div>
        </div>
        <TabsContent value="list">
          <div className="flex flex-col justify-center">
            {statusCategories.map(({ title, color, key }) => {
              const filteredTasks = filterTasksByStatus(key); // Use function inside the loop
              return (
                <TaskCard
                  key={key}
                  headerColor={color}
                  CardTitle={title}
                  isBoard={false}
                >
                  {filteredTasks.map((task: TaskProps) => (
                    <Task
                      key={task.id}
                      id={task.id}
                      isListView
                      title={task.title}
                      dueDate={task.dueDate}
                      status={replaceCapitalLetter(task.status)}
                      handleDelete={handleTaskRemove}
                      handleStatus={handleChangeStatus}
                    />
                  ))}
                </TaskCard>
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="board">
          <div className="flex flex-col lg:flex-row justify-between">
            {statusCategories.map(({ title, color, key }) => {
              const filteredTasks = filterTasksByStatus(key); // Use function inside the loop
              return (
                <TaskCard
                  key={key}
                  headerColor={color}
                  CardTitle={title}
                  isBoard={true}
                >
                  {filteredTasks.map((task: TaskProps) => (
                    <Task
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      dueDate={task.dueDate}
                      status={replaceCapitalLetter(task.status)}
                      handleDelete={handleTaskRemove}
                    />
                  ))}
                </TaskCard>
              );
            })}
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default Dashboard;
