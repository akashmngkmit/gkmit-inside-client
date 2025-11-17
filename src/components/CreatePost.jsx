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

export const CreatePost = () => {
  const { user } = useAuth();
  
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
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview('');
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    document.getElementById('file-upload').value = null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!imageFile) {
      setError('An image is required to create a post.');
      return;
    }
    
    // clearing form
    setFormData({ title: '', subtitle: '', description: '' });
    setTags([]);
    setCurrentTag('');
    removeImage();
  };

  const TITLE_MAX = 30;
  const SUBTITLE_MAX = 50;

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
              {/* title */}
              <div className="space-y-1">
                <Input
                  name="title"
                  placeholder="Post Title (Required)"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  maxLength={TITLE_MAX}
                  className="font-semibold"
                />
                <p className="text-xs text-right text-gray-500">
                  {formData.title.length} / {TITLE_MAX}
                </p>
              </div>
              
              {/* subtitle */}
              <div className="space-y-1">
                <Textarea
                  name="subtitle"
                  placeholder="Subtitle (Optional)"
                  value={formData.subtitle}
                  onChange={handleChange}
                  maxLength={SUBTITLE_MAX}
                  className="min-h-20"
                />
                <p className="text-xs text-right text-gray-500">
                  {formData.subtitle.length} / {SUBTITLE_MAX}
                </p>
              </div>

              {/* desc */}
              <Textarea
                name="description"
                placeholder={`What's on your mind, ${user?.name}? (Required)`}
                value={formData.description}
                onChange={handleChange}
                required
                className="min-h-[100px]"
              />
              
              {/* tag */}
              <div className="space-y-2">
                <Label htmlFor="tags-input">Tags</Label>
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
                  placeholder="Type a tag and press Enter..."
                  value={currentTag}
                  onChange={handleTagChange}
                  onKeyDown={handleTagKeyDown}
                />
              </div>
              
              {/* thumbnail */}
              <div className="space-y-2">
                <Label htmlFor="file-upload">Attach Image (Required)</Label>
                <Input
                  id="file-upload"
                  type="file"
                  name="media"
                  required
                  onChange={handleFileChange}
                  className="file:text-sm file:font-medium"
                  accept="image/png, image/jpeg, image/gif"
                />
              </div>

              {/* image preview */}
              {imagePreview && (
                <div className="relative w-full h-64 rounded-md overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-7 w-7"
                    onClick={removeImage}
                  >
                  </Button>
                </div>
              )}
              
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="gap-2">
              <Send className="h-4 w-4" />
              Post
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};