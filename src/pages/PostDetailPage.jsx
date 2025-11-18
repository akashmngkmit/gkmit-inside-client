import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

// --- API & Hook Imports (Fix: Using @/ alias) ---
import { PostCard } from '@/components/PostCard.jsx';
import { AddCommentForm } from '@/components/AddCommentForm.jsx';
import { CommentList } from '@/components/CommentList.jsx';
import { useAxiosPrivate } from '@/config/useAxiosPrivate';
import { getPostById } from '@/api/PostApi';

/**
 * A page that displays a single post and its comments.
 */
export const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  // --- Fetch Data Function ---
  // We wrap this in useCallback so we can pass it to the
  // AddCommentForm component to trigger a refetch.
  const fetchPostDetails = useCallback(async (controller) => {
    setIsLoading(true); // Always show loading when refetching
    setError(null);
    try {
      const response = await getPostById(postId, axiosPrivate, {
        signal: controller?.signal
      });
      // The API returns the full post object with comments
      const { comments, ...postData } = response.data.data;
      setPost(postData);
      setComments(comments || []);
    } catch (err) {
      if (err.name !== 'CanceledError') {
        console.error("Failed to fetch post details:", err);
        setError(err.message || 'Failed to load post.');
        toast.error(err.message || 'Failed to load post.');
      }
    } finally {
      if (!controller?.signal?.aborted) {
        setIsLoading(false);
      }
    }
  }, [postId, axiosPrivate]); // Dependencies

  // --- Load Data on Mount ---
  useEffect(() => {
    const controller = new AbortController();
    fetchPostDetails(controller);
    return () => controller.abort();
  }, [fetchPostDetails]); // Run when the function (i.e., its dependencies) changes

  if (isLoading && !post) { // Only show full-page loader on initial load
    return (
      <div className="w-full text-center p-10">
        <p>Loading post details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-500">
        <CardContent className="p-6 text-center text-red-600">
          <p>Error: {error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!post) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          <p>Post not found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* 1. The Post Itself */}
      <PostCard post={post} />

      {/* 2. The "Add Comment" Form */}
      <AddCommentForm 
        postId={postId}
        onCommentPosted={() => {
          // This callback refreshes the post and comments
          // after a new one is added.
          toast.success('Refreshing comments...');
          fetchPostDetails(new AbortController());
        }}
      />
      
      {/* 3. The List of Comments */}
      {/* We pass the 'comments' array we got from the API */}
      <CommentList comments={comments} />
    </div>
  );
};