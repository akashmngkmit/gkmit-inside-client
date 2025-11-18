import React, { useState } from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';

// --- API & Hook Imports (FIX: Using @/ alias and 'from') ---
import { useAuth } from '@/store/AuthContext.jsx';
import { useAxiosPrivate } from '@/config/useAxiosPrivate';
import { addComment } from '@/api/PostApi';

/**
 * A form for adding a new comment to a post.
 */
export const AddCommentForm = ({ postId, onCommentPosted }) => {
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() === '') {
      toast.error('Comment cannot be empty.');
      return;
    }
    setIsLoading(true);

    try {
      // Call API: POST /api/posts/:id/comment
      await addComment(postId, comment, axiosPrivate);
      toast.success('Comment posted successfully!');
      
      // Clear the form
      setComment('');
      
      // Tell the parent page (PostDetailPage) to refetch comments
      if (onCommentPosted) {
        onCommentPosted();
      }

    } catch (err) {
      console.error("Failed to post comment:", err);
      toast.error(err.response?.data?.message || err.message || 'Failed to post comment.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-start gap-3">
      <Avatar className="h-9 w-9">
        <AvatarFallback>
          {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
        </AvatarFallback>
        {/* <AvatarImage src={user?.avatarUrl} /> */}
      </Avatar>
      <div className="flex-1 space-y-2">
        <Textarea
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={isLoading}
          className="min-h-[80px]"
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Posting...' : 'Post Comment'}
          </Button>
        </div>
      </div>
    </form>
  );
};