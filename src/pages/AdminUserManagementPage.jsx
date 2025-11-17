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
// 1. Import ShadCN Tabs
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --- API & Hook Imports ---
// FIX: Corrected relative paths to alias paths
import { useAxiosPrivate } from '@/config/useAxiosPrivate';
// 2. Import the RENAMED function
import  {getUsersByStatus, updateUserStatus } from '../api/AdminApi'
import { timeAgo } from '@/lib/dateUtils';

export const AdminUserManagementPage = () => {
  // 3. Rename state to be generic
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  // 4. Add state for the current tab
  const [currentTab, setCurrentTab] = useState('pending');

  // --- 5. Fetch Data Function (now dynamic) ---
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

  // --- 6. Load Data on Mount & on Tab Change ---
  useEffect(() => {
    const controller = new AbortController();
    fetchUsersByStatus(currentTab, controller); // Use currentTab
    return () => controller.abort();
  }, [fetchUsersByStatus, currentTab]); // Re-run if currentTab changes

  // --- 7. Handle Approve/Reject ---
  const handleUpdateStatus = async (userId, status) => {
    // Optimistic UI update
    const originalUsers = [...users];
    setUsers(currentUsers => 
      currentUsers.filter(user => user._id !== userId) 
    );

    try {
      // API call
      const response = await updateUserStatus(userId, status, axiosPrivate);
      toast.success(response.data.message || `User has been ${status}.`);
    } catch (err) {
      // Revert on failure
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

      {/* 8. Add the Tabs component */}
      <Tabs 
        defaultValue="pending" 
        className="w-full"
        onValueChange={(value) => setCurrentTab(value)} // This triggers the API call
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        
        {/* We only need one TabsContent because our 'users' state updates */}
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