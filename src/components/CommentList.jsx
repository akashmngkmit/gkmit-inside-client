import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { timeAgo } from '@/lib/dateUtils';
import { Card, CardContent } from "@/components/ui/card";

/**
 * Renders a list of comments for a post.
 */
export const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          <p>No comments yet. Be the first to reply!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Comments</h3>
      {comments.map((comment) => (
        <div key={comment._id} className="flex items-start gap-3">
          <Avatar className="h-9 w-9">
            {/* Defensive check for comments from deleted users.
              Your API doc shows comment.userId is an object.
            */}
            <AvatarFallback>
              {comment.userId?.name?.split(' ').map(n => n[0]).join('') || 'U'}
            </AvatarFallback>
            {/* <AvatarImage src={comment.userId?.avatarUrl} /> */}
          </Avatar>
          <div className="flex-1 rounded-md bg-gray-50 p-3">
            <div className="flex items-center justify-between">
              <p className="font-medium text-sm">
                {comment.userId?.name || 'Unknown User'}
              </p>
              <p className="text-xs text-gray-500">
                {timeAgo(new Date(comment.createdAt))}
              </p>
            </div>
            <p className="text-sm text-gray-800 mt-1">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};