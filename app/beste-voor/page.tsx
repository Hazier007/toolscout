"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { getAllVoorWie } from "@/lib/tools";
import { Badge } from "@/components/ui/badge";

export default function BesteVoorOverviewPage() {
  const entries = getAllVoorWie();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        title="Beste AI tools per doelgroep"
        subtitle={`${entries.length} doelgroepen — vind de perfecte AI tools voor jouw situatie en rol.`}
        size="lg"
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {entries.map((entry, i) => (
          <motion.div
            key={entry.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.02, duration: 0.4, ease: "easeOut" as const }}
          >
            <Link
              href={`/beste-voor/${entry.slug}`}
              className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(59,130,246,0.08)]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                <Users className="h-4 w-4 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium capitalize truncate">{entry.label}</p>
                <p className="text-xs text-muted-foreground">{entry.aantal} tools</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-blue-400 transition-colors" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
