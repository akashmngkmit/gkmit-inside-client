import React, { useState, useEffect } from 'react';
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PostCard } from '@/components/PostCard.jsx';
import { mockPendingPosts } from '@/mocks/adminPostMockData.js';

export const AdminPostManagementPage = () => {
  const [pendingPosts, setPendingPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPendingPosts(mockPendingPosts);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleApprove = (postId) => {
    console.log(`Approving post ${postId}`);
    setPendingPosts(posts => posts.filter(post => post.id !== postId));
  };

  const handleReject = (postId) => {
    console.log(`Rejecting post ${postId}`);
    setPendingPosts(posts => posts.filter(post => post.id !== postId));
  };

  return (
    <div>
      <CardHeader className="p-0 mb-4">
        <CardTitle>Post Management</CardTitle>
        <p className="text-gray-600">Approve or reject new post submissions.</p>
      </CardHeader>
      
      {isLoading ? (
        <p>Loading pending posts...</p>
      ) : (
        <div className="flex flex-col gap-6">
          {pendingPosts.length > 0 ? (
            pendingPosts.map((post) => (
              <div key={post.id} className="relative">
                <PostCard post={post} />
                
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button 
                    variant="destructive"
                    onClick={() => handleReject(post.id)}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="default" 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleApprove(post.id)}
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