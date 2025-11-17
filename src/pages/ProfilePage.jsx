import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from 'react-router-dom';

// Import our reusable components
// FIX: Changed alias paths '@/' to relative paths '../'
import { PostCard } from '../components/PostCard.jsx';
import { ProfileHeader } from '../components/ProfileHeader.jsx'; 
import { useAxiosPrivate } from '@/config/useAxiosPrivate.js';
import { getPostsByUserId } from '@/api/PostApi.jsx';

// We no longer import mock data

/**
 * The main profile page, which displays a user's details and their posts.
 */
export const ProfilePage = () => {
  // FIX: Get userId from the URL, not username
  const { userId } = useParams(); 
  
  // State for the profile data and posts
  const [profile, setProfile] = useState(null); // We'll infer this from the first post
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  // --- NEW: Real Data Fetch ---
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);
    setProfile(null);
    setPosts([]);

    const fetchProfileData = async () => {
      try {
        // 1. Call the API using the userId from the URL
        const response = await getPostsByUserId(userId, axiosPrivate);
        if (!isMounted) return;

        const userPosts = response.data.data;
        console.log(userPosts)
        setPosts(userPosts);

        // 2. Infer Profile Header Data
        // We assume the user's details are on the author object
        // of the first post. This is a workaround for not having
        // a dedicated /api/users/:userId endpoint.
        if (userPosts.length > 0) {
          // ASSUMPTION: Your API returns an 'author' object here,
          // just like the /api/posts (main feed) endpoint.
          setProfile(userPosts[0].author); 
        } else {
          // If the user has no posts, we can't show a header.
          // This is a limitation we'd fix by adding a
          // GET /api/users/:userId endpoint.
          setProfile(null); // Or some default
        }

      } catch (err) {
        if (!isMounted) return;
        console.error("Failed to fetch profile data:", err);
        setError(err.message || 'Failed to load profile.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProfileData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [userId, axiosPrivate]); // Re-fetch if the userId in the URL changes

  if (isLoading) {
    return (
      <div className="w-full text-center p-10">
        <p>Loading profile...</p>
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

  return (
    <div className="flex flex-col gap-6">
      
      {/* 1. The Profile Header Card */}
      {/* We only show the header if we successfully inferred the profile */}
      {profile ? (
        <>
          <ProfileHeader user={profile} />
          <h2 className="text-2xl font-bold">Posts by {profile.name}</h2>
        </>
      ) : (
        <h2 className="text-2xl font-bold">User Profile</h2>
      )}

      {/* 2. The list of posts */}
      {posts.length > 0 ? (
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center text-gray-500">
            <p>This user hasn't posted anything yet.</p>
          </CardContent>
        </Card>
      )}

    </div>
  );
};