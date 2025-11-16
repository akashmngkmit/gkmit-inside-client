import React from 'react';
import { CardHeader, CardTitle } from "@/components/ui/card";

export const AdminDashboardPage = () => {
  return (
    <div>
      <CardHeader className="p-0 mb-4">
        <CardTitle>Admin Dashboard</CardTitle>
      </CardHeader>
      <p>Admin analytics and charts will go here.</p>
    </div>
  );
};