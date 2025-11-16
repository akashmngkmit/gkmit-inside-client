import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PostCard } from '../components/PostCard.jsx';
import { mockBookmarks } from '../mocks/bookmarksMockData.js';
import { Bookmark } from 'lucide-react';

export const BookmarkPage = () => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      // mock data
      setBookmarkedPosts(mockBookmarks);
      setIsLoading(false);
    }, 500);
  }, []);

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
      ) : bookmarkedPosts.length > 0 ? (
        <div className="flex flex-col gap-6">
          {/* mock data */}
          {bookmarkedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-gray-500">
              You haven't bookmarked any posts yet.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};