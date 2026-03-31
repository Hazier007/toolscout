"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { SearchBar } from "@/components/SearchBar";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/categorie", label: "Categorieën" },
  { href: "/vergelijk", label: "Vergelijk" },
  { href: "/alternatieven", label: "Alternatieven" },
  { href: "/beste-voor", label: "Beste voor" },
];

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--background)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 transition-shadow duration-300 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-[var(--font-display)] text-xl font-bold tracking-tight">
            ToolScout
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop search + CTA */}
        <div className="hidden items-center gap-3 md:flex">
          {searchOpen ? (
            <div className="w-64">
              <SearchBar
                compact
                onClose={() => setSearchOpen(false)}
              />
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Search className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Mobile menu */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-muted-foreground"
          >
            <Search className="h-4 w-4" />
          </Button>
          <Sheet>
            <SheetTrigger className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-[var(--background)] border-white/10">
              <SheetTitle className="sr-only">Navigatie</SheetTitle>
              <nav className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="border-t border-white/10 px-4 py-3 md:hidden">
          <SearchBar compact onClose={() => setSearchOpen(false)} />
        </div>
      )}
    </header>
  );
}
