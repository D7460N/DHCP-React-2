import { Outlet } from 'react-router-dom';
import React, { Suspense } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Topbar } from "../components/Topbar/Topbar";
import ClassificationBanner from '../components/ClassificationBanner/ClassificationBanner';
import { navigationConfig } from '../config/navigation';
import { GetClassificationData } from '../components/ClassificationBanner/ClassificationBanner';

export default function Layout({ basePath = "" }: { basePath?: string }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border-zinc-200">
      <ClassificationBanner
        data = {GetClassificationData()}
      />
      <Topbar
        classificationData = {GetClassificationData()}
      />
      <div className="flex h-screen">
        <Sidebar
          title=""
          storageKey="dhcp.sidebar"
          basePath={basePath}
          expandOnActive={true}
          items={navigationConfig}
        />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-8 bg-white dark:bg-zinc-900 dark:text-white dark:text-zinc-200">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
