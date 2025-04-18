"use client"

import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [shortcut, setShortcut] = useState<string | null>(null);
  const [value, setValue] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Set mounted to true after client-side render
    setMounted(true);

    // Detect OS via User-Agent
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("mac")) {
      setShortcut("⌘ K");
    } else if (userAgent.includes("win")) {
      setShortcut("Ctrl + K");
    } else if (userAgent.includes("linux")) {
      setShortcut("Ctrl + K");
    } else {
      setShortcut(null);
    }

    // Handle Cmd + K or Ctrl + K
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // New useEffect to handle pathname changes
  useEffect(() => {
    if (pathname.startsWith("/search/")) {
      const encodedQuery = pathname.split("/search/")[1];
      if (encodedQuery) {
        const decodedQuery = decodeURIComponent(encodedQuery);
        const replacedQuery = decodedQuery.replace(/^query=/, "")
        setValue(replacedQuery);
      }
    }
  }, [pathname]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) {
      const encodedQuery = encodeURIComponent(value.trim());
      router.push(`/search/query=${encodedQuery}`);
    }
  };

  // Render minimal component during SSR to avoid mismatch
  if (!mounted) {
    return (
      <div className="relative w-full">
        <div className="md:block hidden">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            className="w-full pr-20 dark:bg-background max-w-[260px]"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        
        <div className="md:hidden block">
          <Button asChild>
            <Link href="/search">
              <Search />
              Search
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Render full component with shortcut after mounting
  return (
    <div className="relative w-full">
      <div className="md:block hidden">
        <div className="absolute left-2 top-1/2 -translate-y-1/2 color-(--text-muted-foreground)">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className="w-full pr-14 pl-7 max-w-[260px]"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {shortcut && (
          <kbd
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2",
              "pointer-events-none inline-flex h-5 select-none items-center gap-1",
              "rounded border bg-muted px-1.5 font-mono text-[10px] font-medium",
              "text-muted-foreground opacity-100"
            )}
          >
            {shortcut}
          </kbd>
        )}
      </div>

      <div className="md:hidden block">
        <Button asChild>
          <Link href="/search">
            <Search />
            Search
          </Link>
        </Button>
      </div>
    </div>
  );
}