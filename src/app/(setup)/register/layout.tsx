'use client';
import { Button } from '@/components/ui/button';
import { SignOutButton } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react';

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" bg-neutral-100 min-h-screen">
      <div className=" mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <div className=" flex items-center gap-2">
            <Image src="/logo.svg" alt="logo" width={40} height={40} />
            <p className="font-extrabold text-2xl">Power Plant.</p>
          </div>
          <Button className=" font-semibold">
            <SignOutButton />
          </Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default RegisterLayout;
