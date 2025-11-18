import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import {useAxiosPrivate} from '../config/useAxiosPrivate.js';
import { getUsersByStatus, getPostsByStatus } from '../api/AdminApi.jsx';
import { Users, UserCheck, CheckCircle, Hourglass } from 'lucide-react'; 

const StatCard = ({ title, value, icon, description }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-gray-500">{description}</p>
    </CardContent>
  </Card>
);

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    const fetchAggregatedStats = async () => {
      try {
        const [usersPending, usersApproved, postsPending, postsApproved] = await Promise.all([
          getUsersByStatus('pending', axiosPrivate, { signal: controller.signal }),
          getUsersByStatus('approved', axiosPrivate, { signal: controller.signal }),
          getPostsByStatus('pending', axiosPrivate, { signal: controller.signal }),
          getPostsByStatus('approved', axiosPrivate, { signal: controller.signal }),
        ]);
        
        if (isMounted) {
          setStats({
            approvedUsers: usersApproved.data.data.length,
            pendingUsers: usersPending.data.data.length,
            approvedPosts: postsApproved.data.data.length,
            pendingPosts: postsPending.data.data.length,
          });
        }
      } catch (err) {
        if (isMounted && err.name !== 'CanceledError') {
          console.error("Failed to fetch admin stats:", err);
          setError(err.message || 'Failed to load dashboard stats.');
          toast.error("Failed to load dashboard stats.");
        }
      } finally {
        if (isMounted && !controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchAggregatedStats();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

  return (
    <div>
      <CardHeader className="p-0 mb-4">
        <CardTitle>Admin Dashboard</CardTitle>
        <p className="text-gray-600">Overview of key pending and approved activity.</p>
      </CardHeader>
      
      {isLoading ? (
        <p>Loading stats...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : stats ? ( 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          
          {/* Approved Users */}
          <StatCard 
            title="Approved Users" 
            value={stats.approvedUsers} 
            icon={<UserCheck className="h-4 w-4 text-green-600" />}
            description="Active users ready to post"
          />
          
          {/* Pending Users */}
          <StatCard 
            title="Pending Users" 
            value={stats.pendingUsers} 
            icon={<Users className="h-4 w-4 text-orange-500" />}
            description="Awaiting admin approval"
          />

          {/* Approved Posts */}
          <StatCard 
            title="Approved Posts" 
            value={stats.approvedPosts} 
            icon={<CheckCircle className="h-4 w-4 text-green-600" />}
            description="Currently visible on the feed"
          />
          
          {/* Pending Posts */}
          <StatCard 
            title="Pending Posts" 
            value={stats.pendingPosts} 
            icon={<Hourglass className="h-4 w-4 text-orange-500" />}
            description="Awaiting content review"
          />
        </div>
      ) : (
        <p>No stats available.</p>
      )}
      
      {/* Placeholder for future charts */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Activity Chart (Placeholder)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full bg-gray-100 flex items-center justify-center rounded-md">
            <p className="text-gray-500">Charts will be implemented here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};