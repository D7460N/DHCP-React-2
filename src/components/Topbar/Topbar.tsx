// Topbar.tsx
import React from 'react';

export const Topbar = () => {
  return (
    <header className="flex items-center justify-between border-b px-6 py-4 bg-white">
      <div className="flex items-center gap-2 rounded-lg px-3 py-1.5 w-1/3">
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      <input
        type="text"
        placeholder="Search"
        className="rounded-md px-3 py-1.5 text-sm w-1/3 outline-none"
        />
      </div>
  
      <div className="flex items-center gap-4">
        <button>
          <span className="sr-only">Notifications</span>
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 17h5l-1.405C18.37 14.768 18 13.907 18 13V9a6 6 0 00-5-5.91V3a2 2 0 00-4 0v.09A6 6 0 004 9v4c0 .907-.37 1.768-.595 2.595L2 17h5m0 0v1a3 3 0 006 0v-1m-6 0h6" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Sam Smith</span>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
    </header>
  );
};
