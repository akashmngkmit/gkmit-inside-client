import React, { useState, useEffect, useCallback } from 'react';
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

  const fetchFeed = useCallback(async (controller) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getFeed(axiosPrivate, { 
        signal: controller.signal
      });
      setPosts(response.data.data);
    } catch (err) {
      if (err.name !== 'CanceledError') {
        console.error("Failed to fetch feed:", err);
        setError(err.message || 'Failed to load feed.');
      }
    } finally {
      if (controller.signal && !controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [axiosPrivate]);

  useEffect(() => {
    const controller = new AbortController();
    fetchFeed(controller);

    return () => {
      controller.abort();
    };
  }, [fetchFeed]);

  const LoadingFeed = () => (
    <Card>
      <CardContent className="p-6 text-center">
        <p>Loading feed...</p>
      </CardContent>
    </Card>
  );

  const ErrorFeed = () => (
    <Card className="border-red-500">
      <CardContent className="p-6 text-center text-red-600">
        <p>Error: {error}</p>
      </CardContent>
    </Card>
  );

  const EmptyFeed = () => (
    <Card>
      <CardContent className="p-6 text-center text-gray-500">
        <p>The feed is empty. Be the first to post!</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full space-y-6">
      <CreatePost onPostCreated={() => fetchFeed(new AbortController())} />
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