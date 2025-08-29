import { LucideIcon } from 'lucide-react';

export type NavItem {
  label: string;
  to?: string; // optional when it's a pure group/
  end?: string;
  icon?: LucideIcon;
  children?: NavItem[]; // nested items
  id?: string; // optional stable id (else falls back to label)
};

export interface BreadcrumbItem {
  name: string;
  href: string;
}
