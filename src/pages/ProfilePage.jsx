import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from 'react-router-dom';

import { PostCard } from '../components/PostCard.jsx';
import { ProfileHeader } from '../components/ProfileHeader.jsx';
import { mockProfileUser, mockProfilePosts } from '../mocks/profileMockData.js';

export const ProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      // mock data
      setProfile(mockProfileUser);
      setPosts(mockProfilePosts);
      setIsLoading(false);
    }, 500); 
  }, [username]);

  if (isLoading || !profile) {
    return (
      <div className="w-full text-center p-10">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <ProfileHeader user={profile} />

      <h2 className="text-2xl font-bold">Posts by {profile.name}</h2>
      {/* mock data */}
      {posts.length > 0 ? (
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-gray-500">This user hasn't posted anything yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};