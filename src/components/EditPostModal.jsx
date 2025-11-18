import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

import { useAxiosPrivate } from '@/config/useAxiosPrivate.js';
// import { updatePostStatus } from '@/api/AdminApi.jsx';

export const EditPostModal = ({ post, isOpen, onOpenChange, onPostUpdated }) => {
  const [formData, setFormData] = useState({
    title: post.title || '',
    description: post.description || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  // const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setFormData({
      title: post.title || '',
      description: post.description || '',
    });
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updateData = {
      title: formData.title,
      description: formData.description,
    };

    try {
    //   await updatePost(post._id, updateData, axiosPrivate);
      toast.success('Post updated successfully!');
      
      if (onPostUpdated) {
        onPostUpdated();
      }
      onOpenChange(false); // Close the modal

    } catch (err) {
      console.error("Failed to update post:", err);
      toast.error(err.response?.data?.message || err.message || 'Failed to update post.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>
            You can only edit a post while it's "pending".
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="min-h-[120px]"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};