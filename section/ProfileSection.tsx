'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const ProfileSection = ({
  url,
  name,
  handleSignOut,
}: {
  url: string | null;
  name: string | null;
  handleSignOut: () => void;
}) => {
  return (
    <div className="space-y-2 ">
      <div>
        {url && (
          <Image
            src={url}
            width={36}
            height={36}
            alt="profile-img"
            className="rounded-full inline-block mr-2"
          />
        )}
        <p className="hidden sm:inline font-urbanist text-base font-semibold">
          {name}
        </p>
      </div>
      <Button
        variant="outline"
        className="hidden sm:block rounded-xl border-[#7B198426] hover:bg-none font-urbanist text-xs font-semibold"
        onClick={handleSignOut}
      >
        Log Out
      </Button>
    </div>
  );
};

export default ProfileSection;
