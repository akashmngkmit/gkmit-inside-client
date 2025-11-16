import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const FeedPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Main Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          The `CreatePost` and `PostCard` components will go here.
        </p>
      </CardContent>
    </Card>
  );
};