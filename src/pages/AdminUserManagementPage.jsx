import React, { useState, useEffect, useCallback } from 'react';
import { CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAxiosPrivate } from '@/config/useAxiosPrivate';
import  {getUsersByStatus, updateUserStatus } from '../api/AdminApi'
import { timeAgo } from '@/lib/dateUtils';

export const AdminUserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const [currentTab, setCurrentTab] = useState('pending');
  const fetchUsersByStatus = useCallback(async (status, controller) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getUsersByStatus(status, axiosPrivate, { 
        signal: controller.signal 
      });
      setUsers(response.data.data);
    } catch (err) {
      if (err.name !== 'CanceledError') {
        console.error("Failed to fetch users:", err);
        setError(err.message || 'Failed to load users.');
      }
    } finally {
      if (controller.signal && !controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [axiosPrivate]);

  useEffect(() => {
    const controller = new AbortController();
    fetchUsersByStatus(currentTab, controller); 
    return () => controller.abort();
  }, [fetchUsersByStatus, currentTab]);

  const handleUpdateStatus = async (userId, status) => {
    const originalUsers = [...users];
    setUsers(currentUsers => 
      currentUsers.filter(user => user._id !== userId) 
    );

    try {
      const response = await updateUserStatus(userId, status, axiosPrivate);
      toast.success(response.data.message || `User has been ${status}.`);
    } catch (err) {
      console.error("Failed to update user status:", err);
      toast.error(err.message || 'Failed to update user.');
      setUsers(originalUsers);
    }
  };

  return (
    <div>
      <CardHeader className="p-0 mb-4">
        <CardTitle>User Management</CardTitle>
        <p className="text-gray-600">Approve or reject new user registrations.</p>
      </CardHeader>

      <Tabs 
        defaultValue="pending" 
        className="w-full"
        onValueChange={(value) => setCurrentTab(value)}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        
        <TabsContent value={currentTab} className="mt-4">
          {isLoading ? (
            <p>Loading users...</p>
          ) : error ? (
            <p className="text-red-600">Error: {error}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user._id}> 
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-9">
                            <AvatarFallback>{user.name?.split(' ').map(n => n[0]).join('') || 'UU'}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.department || 'N/A'}</TableCell>
                      <TableCell>{timeAgo(new Date(user.createdAt))}</TableCell>
                      <TableCell className="text-right">
                        {/* 9. Conditional Action Buttons */}
                        <div className="flex gap-2 justify-end">
                          {currentTab !== 'rejected' && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleUpdateStatus(user._id, 'rejected')}
                              className="text-red-600 hover:text-red-700"
                            >              
                              Reject
                            </Button>
                          )}
                          {currentTab !== 'approved' && (
                            <Button 
                              variant="secondary" 
                              size="sm"
                              onClick={() => handleUpdateStatus(user._id, 'approved')}
                            >
                              Approve
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No {currentTab} users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};