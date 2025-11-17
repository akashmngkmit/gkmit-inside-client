import React, { useState, useEffect } from 'react';
import {CardHeader, CardTitle } from "@/components/ui/card";
import { mockAdminStats } from '@/mocks/adminDashboardMockData.js';
import { Users, FileText, ThumbsUp, MessageSquare, UserCheck, Clock } from 'lucide-react';
import { StatCard } from '@/components/StatCard';

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStats(mockAdminStats);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div>
      <CardHeader className="p-0 mb-4">
        <CardTitle>Admin Dashboard</CardTitle>
        <p className="text-gray-600">Overview of the application.</p>
      </CardHeader>
      
      {isLoading || !stats ? (
        <p>Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard 
            title="Total Users" 
            value={stats.totalUsers} 
            icon={<Users className="h-4 w-4 text-gray-500" />}
            description="All registered users"
          />
          <StatCard 
            title="Pending Users" 
            value={stats.pendingUsers} 
            icon={<UserCheck className="h-4 w-4 text-gray-500" />}
            description="Awaiting approval"
          />
          <StatCard 
            title="Total Posts" 
            value={stats.totalPosts} 
            icon={<FileText className="h-4 w-4 text-gray-500" />}
            description="All approved posts"
          />
          <StatCard 
            title="Pending Posts" 
            value={stats.pendingPosts} 
            icon={<Clock className="h-4 w-4 text-gray-500" />}
            description="Awaiting approval"
          />
          <StatCard 
            title="Total Likes" 
            value={stats.totalLikes} 
            icon={<ThumbsUp className="h-4 w-4 text-gray-500" />}
            description="Total post reactions"
          />
          <StatCard 
            title="Total Comments" 
            value={stats.totalComments} 
            icon={<MessageSquare className="h-4 w-4 text-gray-500" />}
            description="Total post comments"
          />
        </div>
      )}
      
      {/* Placeholder for future charts */}
      {/* <Card className="mt-6">
        <CardHeader>
          <CardTitle>Activity Chart (Placeholder)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full bg-gray-100 flex items-center justify-center rounded-md">
            <p className="text-gray-500">Charts will be implemented here.</p>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
};