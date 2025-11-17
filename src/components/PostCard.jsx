import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageSquare, Bookmark } from 'lucide-react';
import { timeAgo } from '@/lib/dateUtils';

export const PostCard = ({ post }) => {
  const { author, title, subtitle, description, mediaUrl, tags, createdAt, stats } = post;
  
  return (
    <Card className="w-full overflow-hidden">
      {mediaUrl && (
        <img 
          src={mediaUrl} 
          alt={title} 
          className="w-full h-64 object-cover" 
        />
      )}

      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{author.fallback}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{author.name}</p>
            <p className="text-sm text-gray-500">
              {author.department} · {timeAgo(new Date(createdAt))}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{title}</h2>
          <h3 className="text-lg text-gray-600 font-medium">{subtitle}</h3>
          <p className="text-gray-800">{description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-4 pt-4 border-t">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>{stats.likes} Likes</span>
          <span>{stats.comments} Comments</span>
        </div>
        
        <div className="w-full grid grid-cols-3 gap-2">
          <Button variant="ghost" className="flex items-center gap-2">
            <ThumbsUp className="w-5 h-5" /> Like
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" /> Comment
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <Bookmark className="w-5 h-5" /> Bookmark
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};