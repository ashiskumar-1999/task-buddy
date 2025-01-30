import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';

const LogIn = ({ handleLogin }: { handleLogin: () => void }) => {
  return (
    <>
      <div className="flex flex-row h-screen justify-between items-center pl-20">
        <div className="space-y-7">
          <div className="flex flex-row items-center">
            <Image
              src="/task.svg"
              width={32}
              height={32}
              alt="task-logo"
              className="mr-2"
            />
            <h1 className="text-2xl font-bold text-[#7B1984]">TaskBuddy</h1>
          </div>
          <p className=" max-w-[19rem] font-urbanist text-xs font-medium">
            Streamline your workflow and track progress effortlessly with our
            all-in-one task management app.
          </p>
          <Button
            className="w-[363px] h-14 rounded-2xl bg-[#292929] text-white text-[21px] font-bold font-urbanist"
            onClick={handleLogin}
          >
            <div className="flex flex-row justify-center items-center">
              <Image
                src="/google_logo.svg"
                width={20}
                height={20}
                alt="google-logo"
                className="mr-7"
              />
              Log in with Google
            </div>
          </Button>
        </div>
        <div className="relative">
          <Image
            src="/circles_bg.svg"
            width={834}
            height={834}
            objectFit="cover"
            alt="circle"
            className="absolute z-0"
          />

          <Image
            src="/task_list_view.png"
            width={600}
            height={400}
            alt="task-view-list"
            className="relative z-20"
          />
        </div>
      </div>
    </>
  );
};

export default LogIn;
