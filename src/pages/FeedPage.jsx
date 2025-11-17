import React, { useState, useEffect } from 'react';
import { CreatePost } from '../components/CreatePost.jsx';
import { PostCard } from '../components/PostCard.jsx'; 
import { mockFeed } from '@/mocks/FeedData.js';

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPosts(mockFeed);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <CreatePost />

      {isLoading ? (
        <p>Loading feed...</p>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

    </div>
  );
};