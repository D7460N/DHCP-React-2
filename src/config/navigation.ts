import {
  Settings,
  ClipboardList,
  BriefcaseMedical,
  ChartBar,
} from 'lucide-react';
import { NavigationItem } from '../types/navigation';

export const navigationConfig: NavigationItem[] = [
  {
    name: 'Option Types',
    href: '/optiontypes',
    icon: ClipboardList,
  },
  {
    name: 'Servers',
    href: '/servers',
    icon: ClipboardList,
  },
  {
    name: 'Scopes',
    href: '/scopes',
    icon: ChartBar,
  },
  {
    name: 'Server Types',
    href: '/servertypes',
    icon: ChartBar,
  },
  {
    name: 'Option Sets',
    href: '/optionsets',
    icon: BriefcaseMedical,
  },
  {
    name: 'Scope Types',
    href: '/scopetypes',
    icon: BriefcaseMedical,
  },
  {
    name: 'Audit',
    href: '/audit',
    icon: ChartBar,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    children: [
      { name: 'General', href: '/settings' },
      { name: 'Security', href: '/settings/security' },
      // ... other settings routes
    ]
  }
];
