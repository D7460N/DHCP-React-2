import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { navigationConfig } from '../../config/navigation';
import { findActiveNavigation } from '../../utils/navigation';

export function Breadcrumb() {
  const location = useLocation();
  const { breadcrumb } = findActiveNavigation(navigationConfig, location.pathname);

  if (breadcrumb.length <= 1) return null;

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumb.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index === breadcrumb.length - 1 ? (
              <span className="text-gray-700">{item.name}</span>
            ) : (
            <Link
              to={item.href}
              className="text-gray-600 hover:text-gray-900"
              >
              {item.name}
            </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
