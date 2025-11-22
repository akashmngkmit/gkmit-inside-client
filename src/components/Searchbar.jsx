import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

export const Searchbar = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="search"
          placeholder="Search for title....."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 bg-white text-black"
        />
      </div>
    </form>
  );
};