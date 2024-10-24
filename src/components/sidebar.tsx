import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Navigation } from './layout/nav';
import { DottedSeperator } from './dotted-seperator';

export const Sidebar = () => {
  return (
    <aside className=" h-full bg-neutral-100 p-4 w-full min-w-[264px]">
      <Link href="/">rahat</Link>
      <DottedSeperator className=" my-4" />
      <Navigation />
    </aside>
  );
};
