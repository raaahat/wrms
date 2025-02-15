import { Settings } from 'lucide-react';
import { FaUserGear } from 'react-icons/fa6';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { PiCalculator } from 'react-icons/pi';
import { TbReportAnalytics } from 'react-icons/tb';

export const MAIN_NAV_ITEMS = [
  {
    title: 'Energy Meter Reading',
    url: '/energy-meter-reading',
    icon: PiCalculator,
  },
  {
    title: 'Report',
    url: '/report',
    icon: TbReportAnalytics,
    items: [
      {
        title: 'Overview',
        url: '/report',
      },
      {
        title: 'Engine Parameters',
        url: '/report/engine-parameters',
      },
    ],
  },
  {
    title: 'Work Requests',
    url: '/work-request',
    icon: MdOutlineWorkOutline,
  },
  {
    title: 'Employee',
    url: '/employee',
    icon: FaUserGear,
  },

  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

export const DEFAULT_TITLES: Record<string, string> = MAIN_NAV_ITEMS.reduce(
  (acc, item) => {
    // Process main items
    acc[item.url] = item.title;

    // Process nested items recursively
    const processNested = (items: any[]) => {
      items.forEach((nestedItem) => {
        acc[nestedItem.url] = nestedItem.title;
        if (nestedItem.items) {
          processNested(nestedItem.items);
        }
      });
    };

    if (item.items) {
      processNested(item.items);
    }

    return acc;
  },
  {} as Record<string, string>
);
