import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockActivities } from '@/mocks/ActivityData';

export const ActivityFeed = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <Avatar size="9">
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