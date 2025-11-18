import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from '../components/PostCard.jsx';
import { ProfileHeader } from '../components/ProfileHeader.jsx'; 
import {useAxiosPrivate} from '../config/useAxiosPrivate.js';
import { getPostsByUserId } from '@/api/PostApi.js';

const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

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
        const response = await getPostsByUserId(userId, axiosPrivate, {
          signal: controller.signal
        });
        if (!isMounted) return;

        const rawPosts = response.data.data;

         const adaptedPosts = rawPosts.map(post => {
            return {
                ...post,
                reactionCount: post.reactionCount || 0,
                commentCount: post.commentCount || 0,
                isLiked: post.isLiked || false,
                isBookmarked: post.isBookmarked || false,
            };
        });
        
        setAllPosts(adaptedPosts); 

        if (adaptedPosts.length > 0) {
          const authorData = adaptedPosts[0].author; 
          if (authorData && authorData._id) { 
            setProfile({
              _id: authorData._id, 
              name: authorData.name || 'Unknown User', 
              department: authorData.department || 'N/A', 
              email: authorData.email || 'N/A',
              fallback: getInitials(authorData.name), 
              bio: "Developer at GKMIT.", 
              joined: new Date(), 
            });
          }
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

  const approvedPosts = allPosts.filter(post => post.postStatus === 'approved');
  const pendingPosts = allPosts.filter(post => post.postStatus === 'pending');
  const rejectedPosts = allPosts.filter(post => post.postStatus === 'rejected');

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

  const renderProfileHeader = () => {
    if (!profile && allPosts.length === 0) {
        return <h2 className="text-2xl font-bold">User has no posts yet.</h2>;
    }
  
    if (profile) {
        return (
            <>
              <ProfileHeader user={profile} />
              <h2 className="text-2xl font-bold">Posts by {profile.name}</h2>
            </>
        );
    }

    return null;
  };

  const renderPostContent = (postsList, status) => {
    if (postsList.length === 0) {
      return (
        <Card>
          <CardContent className="p-6 text-center text-gray-500">
            <p>This user has no {status} posts yet.</p>
          </CardContent>
        </Card>
      );
    }
    
    return (
      <div className="flex flex-col gap-6 mt-4">
        {postsList.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    );
  };


  return (
    <div className="flex flex-col gap-6">
      
      {renderProfileHeader()}

      <Tabs defaultValue="approved" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="approved">Approved ({approvedPosts.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingPosts.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedPosts.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="approved">
          {renderPostContent(approvedPosts, 'approved')}
        </TabsContent>
        
        <TabsContent value="pending">
          {renderPostContent(pendingPosts, 'pending')}
        </TabsContent>
        
        <TabsContent value="rejected">
          {renderPostContent(rejectedPosts, 'rejected')}
        </TabsContent>
      </Tabs>
      
    </div>
  );
};