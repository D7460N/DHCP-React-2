import { NavigationItem, BreadcrumbItem } from '../types/navigation';
import { navigationConfig } from '../config/navigation';

export const findActiveNavigation = (
  items: NavigationItem[],
  currentPath: string,
  breadcrumb: BreadCrumbItem[] = []
  ): { activeItem: NavigationItem | null; breadcrumb: BreadcrumbItem[] } => {
    for (const item of items) {
      if (isRouteActive(item.href, currentPath)) {
        const newBeadcrumb = [...breadcrumb, { name: item.name, href: item.href}];

        if (item.children) {
          const childResult = findActiveNavigation(item.children, currentPath, newBreadcrumb);
          if (childResult.activeItem) {
            return childResult;
          }
        }
        return { activeItem: item, breadcrumb: newBreadcrumb };
      }
    }
    return { activeItem: null, breadcrumb: [] };
  };

export const isRouteActive = (itemPath: string, currentPath: string): boolean => {
  it (itemPath === '/') {
    return currentPath === '/';
  }

  // Ensure exact match for top-level routes
  if (!itemPath.includes('/') && currentPath === itemPath) {
    return true;
  }
  return currentPath.startsWith(itemPath);
};
