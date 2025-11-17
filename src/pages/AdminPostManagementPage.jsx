import React, { useState, useEffect, useCallback } from 'react';
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

// --- API & Hook Imports ---
import { PostCard } from '../components/PostCard.jsx'; 
import { useAxiosPrivate } from '@/config/useAxiosPrivate.js';
import { getPostsByStatus,updatePostStatus } from '@/api/AdminApi.jsx';

export const AdminPostManagementPage = () => {
  const [pendingPosts, setPendingPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  // --- 1. Fetch Data Function ---
  const fetchPendingPosts = useCallback(async (controller) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getPostsByStatus('pending', axiosPrivate, {
        signal: controller.signal,
      });
      setPendingPosts(response.data.data);
    } catch (err) {
      if (err.name !== 'CanceledError') {
        console.error("Failed to fetch pending posts:", err);
        setError(err.message || 'Failed to load posts.');
      }
    } finally {
      if (controller.signal && !controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [axiosPrivate]);

  // --- 2. Load Data on Mount ---
  useEffect(() => {
    const controller = new AbortController();
    fetchPendingPosts(controller);
    return () => controller.abort();
  }, [fetchPendingPosts]);

  // --- 3. Handle Approve/Reject ---
  const handleUpdateStatus = async (postId, status) => {
    // Optimistic UI update: Remove the post from the list immediately
    const originalPosts = [...pendingPosts];
    setPendingPosts(posts => posts.filter(post => post._id !== postId));

    try {
      // Send API call
      const response = await updatePostStatus(postId, status, axiosPrivate);
      toast.success(response.data.message || `Post has been ${status}.`);
    } catch (err) {
      // On failure, show error and revert the UI
      console.error("Failed to update post status:", err);
      toast.error(err.message || 'Failed to update post.');
      setPendingPosts(originalPosts); // Put the post back
    }
  };

  return (
    <div>
      <CardHeader className="p-0 mb-4">
        <CardTitle>Post Management</CardTitle>
        <p className="text-gray-600">Approve or reject new post submissions.</p>
      </CardHeader>
      
      {isLoading ? (
        <p>Loading pending posts...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : (
        <div className="flex flex-col gap-6">
          {pendingPosts.length > 0 ? (
            pendingPosts.map((post) => (
              <div key={post._id} className="relative">
                {/* We have to adapt the data slightly for the PostCard,
                  which expects 'author' not 'userId'
                */}
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
                  <Button 
                    variant="destructive"
                    onClick={() => handleUpdateStatus(post._id, 'rejected')}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="default" 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleUpdateStatus(post._id, 'approved')}
                  >
                    Approve
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No pending posts.</p>
          )}
        </div>
      )}
    </div>
  );
};