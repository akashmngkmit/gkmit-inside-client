import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { timeAgo } from '@/lib/dateUtils.jsx';
import { formatActivityMessage, getInitials, formatActorName } from '../lib/activityUtils.js'; // <-- Import formatActorName
import {useAxiosPrivate} from '../config/useAxiosPrivate.js';
import { getActivityLog } from '../api/PostApi.jsx';
import { useAuth } from '@/store/AuthContext.jsx';



export const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
    const { user } = useAuth();
    console.log(user)


  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    setIsLoading(true);

    const fetchActivity = async () => {
      try {
        const response = await getActivityLog(axiosPrivate, { signal: controller.signal });
        if (isMounted) {
          setActivities(response.data.data);
        }
      } catch (err) {
        if (isMounted && err.name !== 'CanceledError') {
          console.error("Failed to fetch activity feed:", err);
          setError(err.message || 'Failed to load activity.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchActivity();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-sm text-gray-500">Loading activity...</p>
        ) : error ? (
          <p className="text-sm text-red-600">Error: {error}</p>
        ) : (
          <div className="flex flex-col gap-4">
            {activities.length > 0 ? (
              activities.map((activity) => {
                const actorDisplayName = formatActorName(activity, user.name);
                
                return (
                  <div key={activity._id} className="flex items-start gap-3">
                    <Avatar className="size-9">
                      <AvatarFallback>{getInitials(actorDisplayName)}</AvatarFallback> 
                    </Avatar>
                    <div className="text-sm">
                      <p className="text-gray-800">
                        {formatActivityMessage(activity, user.name)}
                      </p>
                      <p className="text-xs text-gray-500">{timeAgo(new Date(activity.createdAt))}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500">No recent activity.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};