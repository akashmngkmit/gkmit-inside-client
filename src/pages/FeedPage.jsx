import React, { useState, useEffect } from 'react';
// Fix: Corrected import paths to be relative
import { CreatePost } from '../components/CreatePost.jsx';
import { PostCard } from '../components/PostCard.jsx';
import { useAxiosPrivate } from '@/config/useAxiosPrivate.js';
import { getFeed } from '@/api/PostApi.jsx';
import { Card, CardContent } from '@/components/ui/card';

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchFeed = async () => {
      try {
        const response = await getFeed(axiosPrivate, {
          signal: controller.signal
        });
        if (isMounted) {
          setPosts(response.data.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to fetch feed:", err);
          setError(err.message || 'Failed to load feed.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchFeed();

    // Cleanup function
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]); // Re-run if axiosPrivate instance changes

  // Helper component for loading state
  const LoadingFeed = () => (
    <Card>
      <CardContent className="p-6 text-center">
        <p>Loading feed...</p>
      </CardContent>
    </Card>
  );

  // Helper component for error state
  const ErrorFeed = () => (
    <Card className="border-red-500">
      <CardContent className="p-6 text-center text-red-600">
        <p>Error: {error}</p>
      </CardContent>
    </Card>
  );

  // Helper component for empty state
  const EmptyFeed = () => (
    <Card>
      <CardContent className="p-6 text-center text-gray-500">
        <p>The feed is empty. Be the first to post!</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full space-y-6">
      {/* 1. The "Create Post" component */}
      <CreatePost />

      {/* 2. The main feed list */}
      {isLoading ? (
        <LoadingFeed />
      ) : error ? (
        <ErrorFeed />
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))
      ) : (
        <EmptyFeed />
      )}
    </div>
  );
};