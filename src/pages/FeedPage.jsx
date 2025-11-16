import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";import { CreatePost } from '../components/CreatePost'; 

export const FeedPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <CreatePost />
      <Card>
        <CardHeader>
          <CardTitle>Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            The `PostCard` components will go here.
          </p>
        </CardContent>
      </Card>

    </div>
  );
};