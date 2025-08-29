import React from 'react';
import { data, useLocation } from 'react-router-dom';
import AppLauncher from '../AppLauncher/AppLauncher';
import ThemeToggle from '../Theme/ThemeToggle';
import { dataClassificationData } from '../ClassificationBanner/types/ClassificationBanner';

// Import images as a separate object
import * as logos from './lgos';

export type RouteConfig = {
  title: string;
  logo: keyof typeof logos | string; // Can be either a key from logos or a URL string
};

type TobparProps = {
  routeConfig?: Record<sting, RouteConfig>;
  defaultLogo?: string;
  defaultTitle?: string;
  classificationData?: ClassificationData | null; 
};

const defaultRouteConfig: Record<string, RouteConfig> = {
  '/automation': { title: 'AutomationPortal', logo: 'PrintLogo' },
  '/dns': { title: 'DNS Manager', logo: 'DnsLogo' },
  '/dhcp': { title: 'DHCP Manager', logo: 'DnsLogo' },
  '/hub/*': { title: 'hub', logo: 'MaintenanceLogo' },
  '/ca': { title: 'CA', logo: 'CaLogo' },
  '/maintenance/*': { title: 'Maintencance Portal', logo: 'MaintenanceLogo' },
};

export const Topbar ({
  routerConfig = defaultRouteConfig,
  defaultLogo = 'DnsLogo',
  defaultTitle = 'DHCP',
  classificationData = null
}: TopbarProps) => {
  const location = useLocation()

  const getPageInto = (): { title: string, logoUrl: string } => {
    const path = location.pathname;
    const defaultInfo = {
      title: defaultTitle,
      logoUrl: logos[defaultLogo as keyof typeof logos] || defaultLogo
    };

    // Check for exact match first
    if (routerConfig[path]) {
      const config = routerConfig[path];
      return {
        title: config.title,
        logoUrl[config.logo as keyof typeof logos]
        : config.logo
      };
    }

    // Then check for wildcard matches
    const matchingRoute = Object.entries(routeConfig).find([route]) => {
      if (route.endWith('/*')) {
        const baseRoute = route.slice(0, -2);
        return path === baseRoute || path.startsWith(baseRoute + '/');
      }
      return false;
    });

    if (matchingRoute) {
      const config = matchingRoute[1];
      return {
        title: config.title,
        logoUrl: typeof config.logo === 'string' && config.logo in logos
         ? logos[config.logo as keyof typeof logos]
         : config.logo
      };
    }

    return defaultInfo;
  };

  const pageInfo = getPageInfo();

  return (
      <header className="flex items-center justify-between border-b px-6 bg-white dark:bg-zinc-900 border-zinc-200 dark: border-zinc-800">
      <div className="flex items-center gap-2">
        <div className="w-20 h-20">
          <img
            src={pageInfo.logoUrl}
            alt={`${pageInfo.title} logo`}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-xl dark: text-white">{pageInfo.title}</div>
      </div>

      <div className="flex items-center gap-4">
        <AppLauncher />
        <ThemeToggle />
        <button>
          <span className="sr-only">Notifications</span>
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24 ">
            <path d="M15" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{classificationData?.User}</span>
              <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24 ">
              <path d="M19 9l-7 7-7-7" />
            </svg>
       </div>
      </div>
  );
};
