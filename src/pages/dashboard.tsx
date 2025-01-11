import React from 'react';
import { firebaseConfig } from '../config/firebase';

import { getDatabase } from 'firebase/database';
import TaskCard from '@/components/TaskCard';

const dashboard = () => {
  /* const getDatabasedata = getDatabase(firebaseConfig);
  console.log('data:', getDatabasedata); */
  return (
    <div className="flex flex-col justify-center px-9">
      <TaskCard headerColor="#FAC3FF" CardTitle="Todo" />
      <TaskCard headerColor="#85D9F1" CardTitle="In-progress" />
      <TaskCard headerColor="#CEFFCC" CardTitle="Completed" />
    </div>
  );
};

export default dashboard;
