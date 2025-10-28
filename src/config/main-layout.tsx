import { Bolt } from 'lucide-react';
import { MenuConfig } from '@/config/types';

export const MENU_SIDEBAR_MAIN: MenuConfig = [
  {
    title: 'Dev',
    children: [
      {
        title: 'Trình Tạo Form',
        path: '#',
        icon: Bolt,
      },
    ],
  },
];

// export const MENU_SIDEBAR_RESOURCES: MenuConfig = [
//   {
//     title: 'Resources',
//     children: [
//       {
//         title: 'About Metronic',
//         path: '#',
//         icon: Download
//       },
//       {
//         title: 'Advertise',
//         path: '#',
//         icon: FileChartLine,
//         badge: 'Pro'
//       },
//       {
//         title: 'Help',
//         path: '#',
//         icon: SquareActivity
//       },
//       {
//         title: 'Blog',
//         path: '#',
//         icon: Newspaper
//       },
//       {
//         title: 'Careers',
//         path: '#',
//         icon: Briefcase
//       },
//       {
//         title: 'Press',
//         path: '#',
//         icon: Megaphone
//       },
//     ],
//   }
// ];
