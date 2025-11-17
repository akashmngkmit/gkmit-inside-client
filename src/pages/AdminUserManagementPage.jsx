import React, { useState, useEffect } from 'react';
import { CardHeader, CardTitle } from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { mockPendingUsers } from '@/mocks/adminMockData.js'; 
import { timeAgo } from '@/lib/dateUtils';

export const AdminUserManagementPage = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setPendingUsers(mockPendingUsers);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleApprove = (userId) => {
    console.log(`Approving user ${userId}`);
    setPendingUsers(users => users.filter(user => user.id !== userId));
  };

  const handleReject = (userId) => {
    console.log(`Rejecting user ${userId}`);
    setPendingUsers(users => users.filter(user => user.id !== userId));
  };

  return (
    <div>
      <CardHeader className="p-0 mb-4">
        <CardTitle>User Management</CardTitle>
        <p className="text-gray-600">Approve or reject new user registrations.</p>
      </CardHeader>

      {isLoading ? (
        <p>Loading pending users...</p>
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
            {pendingUsers.length > 0 ? (
              pendingUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback>{user.fallback}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{timeAgo(new Date(user.createdAt))}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleReject(user.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Reject
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => handleApprove(user.id)}
                      >
                        Approve
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No pending users.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};