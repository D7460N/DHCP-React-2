import {
  Settings,
  ClipboardList,
  ChartBar,
  AppWindow,
  Settings2Icon
} from 'lucide-react';
import { NavItem } from '../types/navigation';

export const navigationConfig: NavItem[] = [
  {
    label: 'Scopes',
    to: '/scopes',
    icon: ClipboardList,
  },
  {
    label: 'Admin',
    to: '/admin',
    icon: Settings2Icon,
    children: [
      { label: 'Option Types', to: '/admin/optionstypes' },
      { label: 'Option Sets', to: '/admin/optionssets' },
      { label: 'Server Types', to: '/admin/servertypes' },
      { label: 'Scope Types', to: '/admin/scopetypes' },
      { label: 'Servers', to: '/admin/servers' },
    ]
  },
  {
    label: 'Audit',
    to: '/audit',
    icon: ClipboardList,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    children: [
      { label: 'General', to '/settings/general' },
      { label: 'Security', to '/settings/security' },
      { label: 'Application', to '/settings/application', icon: AppWindow },
    ]
  }
];
