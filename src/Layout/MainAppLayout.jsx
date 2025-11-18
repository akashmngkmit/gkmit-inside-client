import React from 'react';
import { Outlet } from 'react-router-dom';
import { SearchProvider } from '@/store/SearchContext.jsx'; 
import { LeftSidebar } from '@/components/LeftSidebar.jsx';
import { RightSidebar } from '@/components/RightSidebar.jsx';

export const MainAppLayout = () => {
  return (
    <SearchProvider>
      <div className="min-h-screen w-full bg-gray-100">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr_300px] xl:grid-cols-[300px_1fr_340px] gap-6 py-6 lg:items-start">
          
          {/* 1. LEFT SIDEBAR (Hidden on mobile, Shown on large screens) */}
          <aside className="hidden lg:block sticky top-6">
            <LeftSidebar />
          </aside>

          <main className="w-full space-y-6">
            <div className="block lg:hidden">
              <RightSidebar />
            </div>
            
            <Outlet />
          </main>

          <aside className="hidden lg:block sticky top-6">
            <RightSidebar />
          </aside>

        </div>
      </div>
    </div>
  );
};