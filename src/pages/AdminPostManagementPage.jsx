import React, { useState, useEffect, useCallback } from 'react';
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { PostCard } from '../components/PostCard.jsx'; 
import { useAxiosPrivate } from '@/config/useAxiosPrivate.js';
import {getPostsByStatus, updatePostStatus} from '../api/AdminApi.jsx'

export const AdminPostManagementPage = () => {
  const [posts, setPosts] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const [currentTab, setCurrentTab] = useState('pending');

  const fetchPostsByStatus = useCallback(async (status, controller) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getPostsByStatus(status, axiosPrivate, {
        signal: controller.signal,
      });
      setPosts(response.data.data);
    } catch (err) {
      if (err.name !== 'CanceledError') {
        setError(err.message || 'Failed to load posts.');
      }
    } finally {
      if (controller.signal && !controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [axiosPrivate]); 

  useEffect(() => {
    const controller = new AbortController();
    fetchPostsByStatus(currentTab, controller); 
    return () => controller.abort();
  }, [fetchPostsByStatus, currentTab]);

  const handleUpdateStatus = async (postId, status) => {
    const originalPosts = [...posts];
    setPosts(currentPosts => currentPosts.filter(post => post._id !== postId));

    try {
      const response = await updatePostStatus(postId, status, axiosPrivate);
      toast.success(response.data.message || `Post has been ${status}.`);
    } catch (err) {
      console.error("Failed to update post status:", err);
      toast.error(err.message || 'Failed to update post.');
      setPosts(originalPosts);
    }
  };

  return (
    <div>
      <CardHeader className="p-0 mb-4">
        <CardTitle>Post Management</CardTitle>
        <p className="text-gray-600">Approve or reject new post submissions.</p>
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
            <p>Loading posts...</p>
          ) : error ? (
            <p className="text-red-600">Error: {error}</p>
          ) : (
            <div className="flex flex-col gap-6">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post._id} className="relative">
                    <PostCard 
                      post={{
                        ...post,
                        author: {
                          name: post.userId?.name || 'Unknown User',
                          department: post.userId?.department || 'Unknown Dept',
                          fallback: post.userId?.name?.split(' ').map(n => n[0]).join('') || 'U'
                        }
                      }} 
                    />
                    
                    <div className="absolute top-4 right-4 flex gap-2">
                      {currentTab !== 'rejected' && (
                        <Button 
                          variant="destructive"
                          size="sm"
                          onClick={() => handleUpdateStatus(post._id, 'rejected')}
                        >
                          Reject
                        </Button>
                      )}
                      {currentTab !== 'approved' && (
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleUpdateStatus(post._id, 'approved')}
                        >
                          Approve
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-10">
                  No {currentTab} posts found.
                </p>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};