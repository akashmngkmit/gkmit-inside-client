import React, { useState, useEffect, useCallback, useMemo } from 'react';
// 1. Import the new Search hook
import { useSearch } from '@/store/SearchContext.jsx';
import { CreatePost } from '../components/CreatePost.jsx';
import { PostCard } from '../components/PostCard.jsx';
import { useAxiosPrivate } from '@/config/useAxiosPrivate.js';
import { getFeed } from '@/api/PostApi.jsx';
import { Card, CardContent } from '@/components/ui/card';

export const FeedPage = () => {
  // 2. Get the searchQuery from the context
  const { searchQuery } = useSearch(); 
  
  const [posts, setPosts] = useState([]); // This will hold ALL posts from the API
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  // Fetch data logic (remains the same)
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

  // 3. Create the filtered list
  // useMemo ensures this only re-runs if 'searchQuery' or 'posts' change
  const filteredPosts = useMemo(() => {
    if (!searchQuery) {
      return posts; // No search, return all posts
    }
    
    // Perform a case-insensitive search on title and description
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]); // Dependencies

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

  // Helper component for empty/no results state
  const EmptyFeed = () => (
    <Card>
      <CardContent className="p-6 text-center text-gray-500">
        <p>
          {searchQuery 
            ? `No posts found matching "${searchQuery}"` 
            : "The feed is empty. Be the first to post!"
          }
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full space-y-6">
      <CreatePost onPostCreated={() => fetchFeed(new AbortController())} />

      {/* 4. The main feed list (now renders 'filteredPosts') */}
      {isLoading ? (
        <LoadingFeed />
      ) : error ? (
        <ErrorFeed />
      ) : filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))
      ) : (
        <EmptyFeed /> // This now handles both "empty" and "no results"
      )}
    </div>
  );
};