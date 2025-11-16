import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// mock data
const activities = [
  {
    id: 1,
    user: 'Akash M Nandan',
    action: 'posted about "Web APIs and folder structures"',
    time: '3h ago',
    fallback: 'AM',
  },
  {
    id: 2,
    user: 'Yuvraj GKMIT',
    action: 'reacted to your post "Vanta.js Integration"',
    time: '5h ago',
    fallback: 'H',
  },
  {
    id: 3,
    user: 'Chandrapal GKMIT',
    action: 'commented on "ShadCN Refactor"',
    time: '1d ago',
    fallback: 'CG',
  },
];

export const ActivityFeed = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback>{activity.fallback}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="text-gray-800">
                  <span className="font-medium">{activity.user}</span>{' '}
                  {activity.action}
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};