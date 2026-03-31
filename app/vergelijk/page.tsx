"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { getAllTools, generateVersusSlug, getToolBySlug } from "@/lib/tools";

export default function VergelijkOverviewPage() {
  const tools = getAllTools();

  // Collect all unique comparisons
  const comparisons = new Map<string, { a: string; b: string }>();
  for (const tool of tools) {
    for (const alt of tool.alternativen) {
      const slug = generateVersusSlug(tool.slug, alt);
      if (!comparisons.has(slug)) {
        const sorted = [tool.slug, alt].sort();
        comparisons.set(slug, { a: sorted[0], b: sorted[1] });
      }
    }
  }

  const comparisonList = Array.from(comparisons.entries()).map(([slug, { a, b }]) => ({
    slug,
    toolA: getToolBySlug(a)!,
    toolB: getToolBySlug(b)!,
  })).filter((c) => c.toolA && c.toolB);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        title="Vergelijk AI tools"
        subtitle={`${comparisonList.length} vergelijkingen beschikbaar. Kies twee tools en ontdek welke het beste bij je past.`}
        size="lg"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {comparisonList.map(({ slug, toolA, toolB }, i) => (
          <motion.div
            key={slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.4, ease: "easeOut" as const }}
          >
            <Link
              href={`/vergelijk/${slug}`}
              className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-sm font-bold">
                <Image
                  src={toolA.logo}
                  alt={toolA.naam}
                  width={40}
                  height={40}
                  className="rounded-lg object-contain p-1"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.style.display = "none";
                    t.parentElement!.textContent = toolA.naam.charAt(0);
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {toolA.naam} vs {toolB.naam}
                </p>
                <p className="text-xs text-muted-foreground">
                  {toolA.rating} vs {toolB.rating} rating
                </p>
              </div>
              <ArrowLeftRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-blue-400 transition-colors" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
