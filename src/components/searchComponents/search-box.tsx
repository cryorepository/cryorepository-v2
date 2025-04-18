// components/SearchBox.tsx
"use client"

import React, { useState, KeyboardEvent } from "react"
import { AlignLeft, Brain, CornerDownRight, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"



export function SearchBox() {
  const [textSearch, setTextSearch] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setErrorText(""); // Clear error on input change
  };

  const handleSearchClick = () => {
    if (!searchTerm.trim()) {
      setErrorText("Please enter a search term");
      return;
    }

    if (searchTerm.length <= 1) {
      setErrorText("Search term must be more than 1 character");
      return;
    }

    const encodedSearchTerm = encodeURIComponent(searchTerm);
    window.location.href = textSearch
      ? `/search/query/${encodedSearchTerm}`
      : `/search/vector/query/${encodedSearchTerm}`;
  };

  const toggleSearch = () => {
    setTextSearch((prev) => !prev);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearchClick();
    }
  };

  return (
    <div className="flex flex-col">
      {errorText && (
        <p className="text-lg font-semibold text-purple-400 pb-2">{errorText}</p>
      )}
      <div className="flex flex-col items-center gap-2 bg-transparent w-fit p-2 rounded-lg backdrop-blur-sm transition-all duration-300 max-w-[420px] sm:w-[420px] max-sm:w-full">
        {/* Search Input */}
        <div className="flex items-center gap-1 h-6 w-full">
          <Search />
          <Input
            value={searchTerm}
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            placeholder="Search..."
          />
        </div>

        {/* Search Type Toggle and Button */}
        <div className="flex items-center justify-between w-full">
          <Button
            onClick={toggleSearch}
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            {textSearch ? (
              <>
                <AlignLeft />
              </>
            ) : (
              <>
                <Brain />
              </>
            )}
          </Button>
          <Button
            onClick={handleSearchClick}
            className="bg-purple-600 text-white px-2 py-1 rounded-lg font-semibold cursor-pointer hover:bg-purple-700 transition-colors duration-200"
          >
            <CornerDownRight />
          </Button>
        </div>
      </div>
    </div>
  );
}