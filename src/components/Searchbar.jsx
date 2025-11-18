import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
// 1. Import the new hook
import { useSearch } from '@/store/SearchContext';

export const Searchbar = () => {
  // 2. Get state and setter from the context
  const { searchQuery, setSearchQuery } = useSearch();

  // 3. We don't need onSubmit, we'll filter as the user types
  return (
    <form className="w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="search"
          placeholder="Search posts by title or text..."
          // 4. Use the context state and setter
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10" // Padding left for the icon
        />
      </div>
    </form>
  );
};