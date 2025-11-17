import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PostCard } from '@/components/PostCard.jsx';
import { useAxiosPrivate } from '@/config/useAxiosPrivate';
import { getBookmarkedPosts } from '@/api/PostApi';
import { Bookmark } from 'lucide-react';

export const BookmarkPage = () => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    const fetchBookmarks = async () => {
      try {
        const response = await getBookmarkedPosts(axiosPrivate);
        if (isMounted) {
          setBookmarkedPosts(response.data.data);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to fetch bookmarks:", err);
          setError(err.message || 'Failed to load bookmarks.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchBookmarks();
    
    // Cleanup
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

  return (
    <div className="flex flex-col gap-6">
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Bookmark className="h-6 w-6" />
            Your Bookmarks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Posts you've saved for later.
          </p>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="w-full text-center p-10">
          <p>Loading bookmarks...</p>
        </div>
      ) : error ? (
         <Card className="border-red-500">
          <CardContent className="p-6 text-center text-red-600">
            <p>Error: {error}</p>
          </CardContent>
        </Card>
      ) : bookmarkedPosts.length > 0 ? (
        <div className="flex flex-col gap-6">
          {bookmarkedPosts.map((post) => (
            <PostCard 
              key={post._id} 
              post={{
                ...post,
                author: { 
                  name: post.userId.name, 
                  department: post.userId.department,
                  fallback: post.userId.name.split(' ').map(n => n[0]).join('')
                },
                reactionCount: post.reactionCount || 0,
                commentCount: post.commentCount || 0,
                isLiked: post.isLiked || false,
                isBookmarked: true,
              }} 
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center text-gray-500">
            <p>
              You haven't bookmarked any posts yet.
            </p>
          </CardContent>
        </Card>
      )}

    </div>
  );
};