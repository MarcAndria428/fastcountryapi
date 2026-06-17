"use client";

import {
  Command,
  CommandGroup,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const Home = () => {
  const [input, setInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<{
    results: string[];
    duration: number;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setSearchResults(undefined);
      try {
        const res = await fetch(`/api/search?q=${input}`);
        const data = (await res.json()) as {
          results: string[];
          duration: number;
        };
        setSearchResults(data);
      } catch (err) {
        console.error("Erreur fetch :", err);
      }
    };
    fetchData();
  }, [input]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center mx-auto bg-black">
      <div className="max-w-xl text-center">
        <h1 className="text-white text-3xl mb-8 font-bold flex justify-center items-center gap-2">
          Fast Api Country Search
          <span>
            <Search />
          </span>
        </h1>
        <p className="text-zinc-300 ext-base mb-8">
          A high performance API build with hono, NextJs and cloudfare. Type a
          query below and get your result in miliseconds
        </p>

        <div className="max-w-md w-full flex items-center justify-center mx-auto">
          <Command>
            <CommandInput
              value={input}
              onValueChange={setInput}
              placeholder="Search Countries..."
              className="placeholder:text-zinc-400 py-2 px-4"
            />
            <CommandList>
              {!searchResults?.results || searchResults.results.length === 0 ? (
                <CommandEmpty>No result found.</CommandEmpty>
              ) : (
                <CommandGroup heading="Results">
                  {searchResults.results.map((result) => (
                    <CommandItem
                      key={result}
                      value={result}
                      onSelect={(value) => setInput(value)}
                    >
                      {result}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {searchResults?.results ? (
                <>
                  <div className="h-px bg-zinc-600 mt-4" />

                  <p className="p-2 text-xs text-zinc-300">
                    Found {searchResults.results.length} results in{" "}
                    {searchResults?.duration.toFixed(0)} ms
                  </p>
                </>
              ) : null}
            </CommandList>
          </Command>
        </div>
      </div>
    </div>
  );
};

export default Home;
