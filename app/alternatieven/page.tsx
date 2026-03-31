"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { getAllTools, getAllCategories, getToolsByCategory } from "@/lib/tools";
import { CategoryBadge } from "@/components/CategoryBadge";

export default function AlternativenOverviewPage() {
  const tools = getAllTools().sort((a, b) => b.rating - a.rating);
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        title="Alternatieven voor AI tools"
        subtitle={`${tools.length} tools — vind het beste alternatief voor elke AI tool die je gebruikt.`}
        size="lg"
      />

      {categories.map((cat) => {
        const catTools = tools.filter((t) => t.categorie_slug === cat.slug);
        if (catTools.length === 0) return null;

        return (
          <div key={cat.slug} className="mb-12">
            <h2 className="mb-4 font-[var(--font-display)] text-xl font-semibold text-muted-foreground">
              {cat.naam}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {catTools.map((tool, i) => (
                <motion.div
                  key={tool.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03, duration: 0.4, ease: "easeOut" as const }}
                >
                  <Link
                    href={`/alternatieven/${tool.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(59,130,246,0.08)]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-sm font-bold border border-white/10">
                      <Image
                        src={tool.logo}
                        alt={tool.naam}
                        width={32}
                        height={32}
                        className="rounded-md object-contain p-0.5"
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          t.style.display = "none";
                          if (t.parentElement) t.parentElement.textContent = tool.naam.charAt(0);
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        Alternatieven voor {tool.naam}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {tool.alternativen.length} directe alternatieven • {tool.rating}/5
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-blue-400 transition-colors" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
