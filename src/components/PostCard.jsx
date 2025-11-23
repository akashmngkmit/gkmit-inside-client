import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageSquare, Bookmark, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { useAxiosPrivate } from '@/config/useAxiosPrivate.js';
import { toggleBookmark, toggleLike } from '@/api/PostApi.js';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

import { timeAgo } from '@/lib/dateUtils.jsx';
import { useAuth } from '../store/AuthContext.jsx'; 
import { EditPostModal } from './EditPostModal.jsx';

export const PostCard = ({ post }) => {
  const { user } = useAuth(); 
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.reactionCount || 0);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const axiosPrivate = useAxiosPrivate();

  const { 
    _id: postId, 
    author, 
    title, 
    subtitle, 
    description, 
    mediaUrl, 
    tags, 
    createdAt, 
    commentCount,
    postStatus,
  } = post;

  const isAuthor = user?._id === author?._id; 
  const canEdit = isAuthor && postStatus === 'pending';
  const isDisabled = postStatus !== 'approved';

  const handleToggleLike = async () => {
    setIsLiked(prev => !prev);
    setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
    try {
      await toggleLike(postId, axiosPrivate);
    } catch (error) {
      console.error("Failed to toggle like:", error);
      toast.error("Failed to update like status.");
      setIsLiked(prev => !prev); 
      setLikeCount(prev => (isLiked ? prev + 1 : prev - 1)); 
    }
  };
  
  const handleToggleBookmark = async () => {
    setIsBookmarked(prev => !prev);
    try {
      const response = await toggleBookmark(postId, axiosPrivate);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
      toast.error("Failed to update bookmark.");
      setIsBookmarked(prev => !prev);
    }
  };
  
  const handleDeletePost = async () => {
    try {
      toast.success("Post deleted successfully.");
      window.location.reload();
    } catch (err) {
      console.error("Failed to delete post:", err);
      toast.error(err.response?.data?.message || "Failed to delete post.");
    }
  };

  const handleClick = () => {
    navigate(`/post/${postId}`)
  }

  return (
    <>
      <Card className="w-full overflow-hidden">
        {mediaUrl && (
          <img 
            src={mediaUrl} 
            alt={title || 'Post image'} 
            className="w-full h-auto max-h-[400px] object-cover" 
            onError={(e) => { e.target.style.display = 'none'; }} 
          />
        )}

        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  {author?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{author?.name || 'Unknown User'}</p>
                <p className="text-sm text-gray-500">
                  {author?.department || 'No Department'} · {timeAgo(new Date(createdAt))}
                </p>
              </div>
            </div>
            
            {canEdit && (
              <AlertDialog>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your
                      post.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeletePost} className="bg-red-600 hover:bg-red-700">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{title}</h2>
            {subtitle && (
              <h3 className="text-lg text-gray-600 font-medium">{subtitle}</h3>
            )}
            <p className="text-gray-800">{description}</p>
          </div>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          )}
        </CardContent>

        {user.role!=='admin' && <CardFooter className="flex flex-col items-start gap-4 pt-4 border-t">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{likeCount} Likes</span>
            <span>{commentCount || 0} Comments</span>
          </div>
          
          <div className="w-full grid grid-cols-3 gap-2">
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 data-[active=true]:text-blue-600"
              data-active={isLiked}
              onClick={handleToggleLike} 
              disabled={isDisabled}
            >
              <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-blue-600 text-blue-600' : ''}`} /> 
              Like
            </Button>
            
            <Button onClick={handleClick} variant="ghost" className="flex items-center gap-2" disabled={isDisabled}>
                <MessageSquare className="w-5 h-5" /> Comment
            </Button>
            
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 data-[active=true]:text-yellow-600"
              data-active={isBookmarked}
              onClick={handleToggleBookmark} 
              disabled={isDisabled}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-yellow-600 text-yellow-600' : ''}`} /> 
              Bookmark
            </Button>
          </div>
        </CardFooter>}
      </Card>
      
      <EditPostModal
        post={post}
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onPostUpdated={() => {
          window.location.reload(); 
        }}
      />
    </>
  );
};