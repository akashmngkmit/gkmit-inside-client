import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from '../components/PostCard.jsx';
import { ProfileHeader } from '../components/ProfileHeader.jsx'; 
import { useAxiosPrivate } from '@/config/useAxiosPrivate.js';
import { getPostsByUserId } from '@/api/PostApi.jsx';

export const ProfilePage = () => {
  const { userId } = useParams(); 
  
  const [profile, setProfile] = useState(null);
  const [allPosts, setAllPosts] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);
    setProfile(null);
    setAllPosts([]); 

    const fetchProfileData = async () => {
      try {
        const response = await getPostsByUserId(userId, axiosPrivate);
        if (!isMounted) return;

        const userPosts = response.data.data;
        setAllPosts(userPosts); 

        if (userPosts.length > 0) {
          setProfile(userPosts[0].author); 
        } else {
          setProfile(null); 
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
  }, [userId, axiosPrivate]); 

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

  const approvedPosts = allPosts.filter(post => post.postStatus === 'approved');
  const pendingPosts = allPosts.filter(post => post.postStatus === 'pending');
  const rejectedPosts = allPosts.filter(post => post.postStatus === 'rejected');

  return (
    <div className="flex flex-col gap-6">
      
      {profile ? (
        <ProfileHeader user={profile} />
      ) : (
        <h2 className="text-2xl font-bold">User Profile</h2>
      )}

      <Tabs defaultValue="approved" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="approved">Approved ({approvedPosts.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingPosts.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedPosts.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="approved">
          {approvedPosts.length > 0 ? (
            <div className="flex flex-col gap-6 mt-4">
              {approvedPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                <p>This user has no approved posts yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="pending">
          {pendingPosts.length > 0 ? (
            <div className="flex flex-col gap-6 mt-4">
              {pendingPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                <p>This user has no pending posts.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="rejected">
          {rejectedPosts.length > 0 ? (
            <div className="flex flex-col gap-6 mt-4">
              {rejectedPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                <p>This user has no rejected posts.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
    </div>
  );
};