'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

export const AnimationProvider = async ({
  tabItem,
  children,
}: {
  tabItem: {
    title: string;
    href: string;
  }[];
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const getTabIndex = (path: string) => {
    return tabItem.findIndex((item) => item.href === path);
  };
  const currentIndex = getTabIndex(pathname);
  const previousIndex = React.useRef(currentIndex);
  useEffect(() => {
    previousIndex.current = currentIndex;
  }, [currentIndex]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '25%' : '-25%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '25%' : '-25%',
      opacity: 0,
    }),
  };
  return (
    <AnimatePresence
      initial={false}
      mode="wait"
      custom={currentIndex > previousIndex.current ? 1 : -1}
    >
      <motion.div
        key={pathname}
        custom={currentIndex > previousIndex.current ? 1 : -1}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: 'spring', bounce: 0, duration: 0.2 },
          opacity: { duration: 0.2 },
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
