"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getAllTools, type Tool } from "@/lib/tools";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  compact?: boolean;
  large?: boolean;
  onClose?: () => void;
}

export function SearchBar({ compact, large, onClose }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Tool[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function handleSearch(value: string) {
    setQuery(value);
    if (value.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    const q = value.toLowerCase();
    const filtered = getAllTools().filter(
      (t) =>
        t.naam.toLowerCase().includes(q) ||
        t.categorie.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q)
    );
    setResults(filtered.slice(0, 5));
    setOpen(true);
  }

  function selectTool(slug: string) {
    setQuery("");
    setResults([]);
    setOpen(false);
    onClose?.();
    router.push(`/tool/${slug}`);
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
            large ? "h-5 w-5" : "h-4 w-4"
          )}
        />
        <Input
          type="search"
          placeholder="Zoek een AI tool..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length >= 2 && setOpen(true)}
          className={cn(
            "border-white/10 bg-white/5 pl-10 placeholder:text-muted-foreground focus:border-blue-500/50 focus:ring-blue-500/20",
            large
              ? "h-14 rounded-2xl text-lg pr-12"
              : "h-10 rounded-xl text-sm pr-10"
          )}
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
              setOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#0D1117] shadow-2xl">
          {results.map((tool) => (
            <button
              key={tool.slug}
              onClick={() => selectTool(tool.slug)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/5"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-xs font-bold uppercase">
                {tool.naam.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium">{tool.naam}</p>
                <p className="text-xs text-muted-foreground">{tool.categorie}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
