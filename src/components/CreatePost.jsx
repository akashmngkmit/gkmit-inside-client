import React, { useState } from 'react';
import { useAuth } from '@/store/AuthContext.jsx'; 
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Send, XIcon, Image as ImageImageIcon } from 'lucide-react';
import { toast } from 'sonner';

import {useAxiosPrivate} from '@/config/useAxiosPrivate.js';
import { createPost } from '@/api/PostApi.js'; 
import { FloatingInput } from './FloatingInput';

export const CreatePost = () => {
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate(); 
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '', 
    description: '',
  });
  
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleTagChange = (e) => {
    setCurrentTag(e.target.value);
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && currentTag.trim() !== '') {
      e.preventDefault(); 
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag(''); 
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { 
        setError('File is too large. Maximum size is 5MB.');
        removeImage();
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    } else {
      setImageFile(null);
      setImagePreview('');
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    if (document.getElementById('file-upload')) {
      document.getElementById('file-upload').value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!imageFile) {
      setError('An image is required to create a post.');
      setIsLoading(false);
      return;
    }
    
    const postData = new FormData();
    postData.append('title', formData.title);
    postData.append('subtitle', formData.subtitle);
    postData.append('description', formData.description);
    postData.append('image', imageFile);
    
    if (tags.length > 0) {
      postData.append('tags', tags.join(','));
    }

    try {
      const response = await createPost(postData, axiosPrivate);
      toast.success(response.data.message || 'Post created successfully!');
      setFormData({ title: '', subtitle: '', description: '' });
      setTags([]);
      setCurrentTag('');
      removeImage();

    } catch (err) {
      console.error("Post creation failed:", err);
      const apiErrorMessage = err.response?.data?.message || err.message || 'An unknown error occurred.';
      setError(apiErrorMessage); 
      toast.error(apiErrorMessage); 
    } finally {
      setIsLoading(false);
    }
  };

  const TITLE_MAX = 100;
  const SUBTITLE_MAX = 300;

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>
                {user?.name?.split(' ').map((n) => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-3">
              <div className="space-y-1">
                <FloatingInput
                  id="title"
                  label="Post Title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  maxLength={TITLE_MAX}
                  disabled={isLoading}
                />
                <p className="text-xs text-right text-gray-500">
                  {formData.title.length} / {TITLE_MAX}
                </p>
              </div>
              
              <div className="space-y-1">
                <FloatingInput
                  id="subtitle"
                  label="Subtitle (Optional)"
                  type="text"
                  value={formData.subtitle}
                  onChange={handleChange}
                  maxLength={SUBTITLE_MAX}
                  disabled={isLoading}
                />
                <p className="text-xs text-right text-gray-500">
                  {formData.subtitle.length} / {SUBTITLE_MAX}
                </p>
              </div>

              <Label htmlFor="description" className="sr-only">Description * </Label>
              <Textarea
                id="description"
                name="description"
                placeholder={`What's on your mind, ${user?.name}?`}
                value={formData.description}
                onChange={handleChange}
                required
                className="min-h-[100px]"
                disabled={isLoading}
              />
              
              <div className="space-y-2">
                <Label htmlFor="tags-input">Tags (Type and press Enter)</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <XIcon 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeTag(tag)} 
                      />
                    </Badge>
                  ))}
                </div>
                <Input
                  id="tags-input"
                  placeholder="e.g., react, devops, frontend..."
                  value={currentTag}
                  onChange={handleTagChange}
                  onKeyDown={handleTagKeyDown}
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="file-upload">Attach Image *</Label>
                <Input
                  id="file-upload"
                  type="file"
                  name="image" 
                  required
                  onChange={handleFileChange}
                  className="file:text-sm file:font-medium"
                  accept="image/png, image/jpeg, image/gif"
                  disabled={isLoading}
                />
              </div>

              {imagePreview && (
                <div className="relative w-full h-64 rounded-md overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-7 w-7"
                    onClick={removeImage}
                    disabled={isLoading}
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="gap-2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full"></span>
                  Posting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Post
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};