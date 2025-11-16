import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export const LeftSidebar = () => {
  return (
    <Card className="w-full h-full sticky top-6">
      <CardContent className="p-4">
        <p className="text-sm text-gray-500">Left Sidebar Placeholder</p>
      </CardContent>
    </Card>
  );
};