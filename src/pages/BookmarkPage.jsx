import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const BookmarkPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bookmarks</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This page will show the user's saved posts.</p>
      </CardContent>
    </Card>
  );
};