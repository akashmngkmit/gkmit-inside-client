import React from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, CalendarDays } from 'lucide-react';


export const ProfileHeader = ({ user }) => (
  <Card className="w-full">
    <CardHeader>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <Avatar className="h-24 w-24 text-4xl">
          <AvatarFallback>{user.fallback}</AvatarFallback>
          {/* <AvatarImage src={user.avatarUrl} /> */}
        </Avatar>
        <div className="flex-1 text-center md:text-left">
          <CardTitle className="text-3xl">{user.name}</CardTitle>
          <p className="text-xl text-gray-600">{user.department}</p>
          <p className="mt-2 text-gray-700">{user.bio}</p>
          <div className="flex justify-center md:justify-start gap-4 mt-3 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Mail className="h-4 w-4" /> {user.email}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" /> Joined {new Date(user.joined).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </CardHeader>
  </Card>
);