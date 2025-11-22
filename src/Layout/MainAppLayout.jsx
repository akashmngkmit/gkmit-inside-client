import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LeftSidebar } from '@/components/LeftSidebar.jsx';
import { RightSidebar } from '@/components/RightSidebar.jsx';
import { Menu, MicVocal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const MainAppLayout = () => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {/* Header for mobile */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 lg:hidden">
        <Button
          size="icon"
          variant="outline"
          onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <h1 className="text-xl font-semibold">GKMIT-Inside</h1>
        <Button
          size="icon"
          variant="outline"
          onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
          className="lg:hidden"
        >
          <MicVocal className="h-5 w-5" />
          <span className="sr-only">Toggle Activity Feed</span>
        </Button>
      </header>

      {/* Left Sidebar for mobile */}
      {isLeftSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 lg:hidden"
          onClick={() => setIsLeftSidebarOpen(false)}
        >
          <div
            className="fixed left-0 top-0 h-full w-4/5 max-w-xs animate-in slide-in-from-left duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <LeftSidebar />
          </div>
        </div>
      )}

      {/* Right Sidebar for mobile */}
      {isRightSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 lg:hidden"
          onClick={() => setIsRightSidebarOpen(false)}
        >
          <div
            className="fixed right-0 top-0 h-full w-4/5 max-w-xs animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <RightSidebar />
          </div>
        </div>
      )}

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr_300px] xl:grid-cols-[300px_1fr_340px] gap-6 py-6 lg:items-start">
        <aside className="hidden lg:block sticky top-6">
          <LeftSidebar />
        </aside>

        <main className="w-full space-y-6">
          <Outlet />
        </main>

        <aside className="hidden lg:block sticky top-6">
          <RightSidebar />
        </aside>
      </div>
    </div>
  );
};