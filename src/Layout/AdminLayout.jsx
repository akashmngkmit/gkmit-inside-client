import React from 'react';
import { Outlet } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { AdminSidebar } from '../components/AdminSidebar.jsx';

export const AdminLayout = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 py-6">
        <aside>
          <AdminSidebar />
        </aside>
        <main className="w-full">
          <Card className="p-6">
            <Outlet />
          </Card>
        </main>
      </div>
    </div>
  );
};