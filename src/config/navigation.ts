import {
  LayoutDashboard,
  Users,
  Settings,
  ClipboardList,
  BriefcaseMedical,
  ChartBar,
  Cloudy,
} from 'lucide-react';
import { NavigationItem } from '../types/navigation';

export const navigationConfig: NavigationItem[] = [
  {
    name: 'Option Types',
    href: '/admin/optiontypes',
    icon: ClipboardList,
  },
  {
    name: 'Servers',
    href: '/admin/servers',
    icon: ClipboardList,
  },
  {
    name: 'Scopes',
    href: '/admin/scopes',
    icon: ChartBar,
  },
  {
    name: 'Server Types',
    href: '/admin/servertypes',
    icon: ChartBar,
  },
  {
    name: 'Option Sets',
    href: '/admin/optionsets',
    icon: BriefcaseMedical,
  },
  {
    name: 'Scope Types',
    href: '/admin/scopetypes',
    icon: BriefcaseMedical,
  },
  {
    name: 'Audit',
    href: '/admin/audit',
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
