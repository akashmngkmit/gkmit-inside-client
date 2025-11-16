import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from 'react-router-dom';

export const ProfilePage = () => {
  const { userId } = useParams();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Page</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is the profile page for user: {userId}</p>
      </CardContent>
    </Card>
  );
};