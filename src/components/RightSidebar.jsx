import React from 'react';
import { Searchbar } from './Searchbar.jsx';
import { ActivityFeed } from './ActivityFeed.jsx';

export const RightSidebar = () => {
  return (
    <div className="w-full h-full sticky top-6">
      <div className="flex flex-col gap-6">
        <Searchbar />
        <ActivityFeed />
      </div>
    </div>
  );
};