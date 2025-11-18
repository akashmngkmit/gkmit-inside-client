import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { useSearch } from '@/store/SearchContext';

export const Searchbar = () => {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <form className="w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="search"
          placeholder="Search posts by title or text..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10" 
        />
      </div>
    </form>
  );
};