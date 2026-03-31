"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Filter } from "lucide-react";
import { ToolCard } from "@/components/ToolCard";
import { Badge } from "@/components/ui/badge";
import type { Tool, Category } from "@/lib/tools";

interface CategoryPageClientProps {
  category: Category;
  tools: Tool[];
}

export function CategoryPageClient({ category, tools }: CategoryPageClientProps) {
  const [filter, setFilter] = useState<string>("all");

  const filteredTools =
    filter === "all"
      ? tools
      : filter === "gratis"
        ? tools.filter((t) => t.features.gratis_plan)
        : filter === "top"
          ? [...tools].sort((a, b) => b.rating - a.rating)
          : tools;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{category.naam}</span>
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h1 className="font-[var(--font-display)] text-3xl font-bold sm:text-4xl md:text-5xl">
          <span className="bg-gradient-to-r from-white via-blue-100 to-violet-300 bg-clip-text text-transparent">
            Beste {category.naam} Tools
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Vergelijk de top {category.aantal} {category.naam.toLowerCase()} tools. Eerlijke reviews,
          transparante prijzen en onze aanbevelingen.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="mt-8 flex items-center gap-3">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {[
          { key: "all", label: "Alle tools" },
          { key: "gratis", label: "Gratis plan" },
          { key: "top", label: "Hoogste rating" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === f.key
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "bg-white/5 text-muted-foreground border border-white/10 hover:bg-white/10"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Tools grid */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTools.map((tool, i) => (
          <ToolCard key={tool.slug} tool={tool} index={i} />
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">Geen tools gevonden met deze filters.</p>
        </div>
      )}
    </div>
  );
}
