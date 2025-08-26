import { NavigationItem, BreadcrumbItem } from '../types/navigation';

export const findActiveNavigation = (
  items: NavigationItem[],
  currentPath: string,
  breadcrumb: BreadcrumbItem[] = []
  ): { activeItem: NavigationItem | null; breadcrumb: BreadcrumbItem[] } => {
    for (const item of items) {
      if (isRouteActive(item.href, currentPath)) {
        const newBreadcrumb = [...breadcrumb, { name: item.name, href: item.href}];

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
  if (itemPath === '/') {
    return currentPath === '/';
  }

  // Ensure exact match for top-level routes
  if (!itemPath.includes('/') && currentPath === itemPath) {
    return true;
  }
  return currentPath.startsWith(itemPath);
};
