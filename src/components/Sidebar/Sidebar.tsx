import { link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { navigationConfig } from '../../config/navigation';
import { findActiveNavigation, isRouteActive } from '../../utils/navigation';
import { NavigationItem } from '../../types/navigation';
import { CloudCogIcon } from 'lucide-react';

export default function Sidebar () {
  const location = useLocation();

  cont rederNavItem = (item: NavigationItem) => {
    const isActive = isRouteActive(item.href, location.pathname);

    return (
      <Link
        key={item.href}
        to={item.href}
        className={clsx(
          'group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium',
          isActive
            ? 'bg-primary/50 text-sky-800'
            : 'text-gray600 hover:bg-gray-100'
        )}
        >
        {item.icon && <item.icon className="h-5 w-5 opacity-75" />}
        <span className="text-sm font-medium">{item.name}</span>
      </Link>
    );
  };
  return (
    <div className="flex-h-screen flex-col justify=between border-r bg-white">
      <div className="px-4 py-6">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <CloudCogIcon className="h-6 w-6" />
            <div className="text-x1">DHCP</div>
          </div>
        </div>
        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
          {navigationConfig.map((item) => (
          <div key={item.href}>
            {renderNavItem(item)}
            {item.children && isRouteActive(item.href, location.pathname) && (
            <div className="ml-4 mt-1 space-y-1">
              {item.children.map(child => renderNavItem(child))}
            </div>
          )}
          </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
