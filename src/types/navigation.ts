import { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  name: string;
  href: string;
  icon?: LucideIcon;
  children?: NavigationItem[];
}

export interface BreadcrumbItem {
  name: sting;
  href: string;
}
