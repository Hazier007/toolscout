"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bot,
  Code,
  PenTool,
  ImageIcon,
  Search,
  BrainCircuit,
  Volume2,
  Zap,
} from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { getAllCategories, getToolsByCategory } from "@/lib/tools";

const categoryIcons: Record<string, React.ReactNode> = {
  "ai-assistent": <Bot className="h-8 w-8" />,
  "ai-code-assistent": <Code className="h-8 w-8" />,
  "ai-schrijven": <PenTool className="h-8 w-8" />,
  "ai-beeldgeneratie": <ImageIcon className="h-8 w-8" />,
  "ai-zoekmachine": <Search className="h-8 w-8" />,
  "ai-productiviteit": <BrainCircuit className="h-8 w-8" />,
  "ai-audio": <Volume2 className="h-8 w-8" />,
};

const categoryColors: Record<string, string> = {
  "ai-assistent": "from-blue-500/20 to-blue-600/5 border-blue-500/20 hover:border-blue-500/40",
  "ai-code-assistent": "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20 hover:border-emerald-500/40",
  "ai-schrijven": "from-violet-500/20 to-violet-600/5 border-violet-500/20 hover:border-violet-500/40",
  "ai-beeldgeneratie": "from-pink-500/20 to-pink-600/5 border-pink-500/20 hover:border-pink-500/40",
  "ai-zoekmachine": "from-amber-500/20 to-amber-600/5 border-amber-500/20 hover:border-amber-500/40",
  "ai-productiviteit": "from-cyan-500/20 to-cyan-600/5 border-cyan-500/20 hover:border-cyan-500/40",
  "ai-audio": "from-orange-500/20 to-orange-600/5 border-orange-500/20 hover:border-orange-500/40",
};

export default function CategorieOverviewPage() {
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        title="Alle categorieën"
        subtitle="Ontdek AI tools per categorie. Van chatbots tot beeldgeneratie — vind het perfecte tool voor jouw use case."
        size="lg"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => {
          const tools = getToolsByCategory(cat.slug);
          const topTool = tools.sort((a, b) => b.rating - a.rating)[0];

          return (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" as const }}
            >
              <Link
                href={`/categorie/${cat.slug}`}
                className={`group flex flex-col rounded-xl border bg-gradient-to-br p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] ${categoryColors[cat.slug] || "from-blue-500/20 to-blue-600/5 border-blue-500/20"}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-foreground transition-colors group-hover:bg-white/15">
                    {categoryIcons[cat.slug] || <Zap className="h-8 w-8" />}
                  </div>
                  <div>
                    <h2 className="font-[var(--font-display)] text-xl font-semibold">
                      {cat.naam}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {cat.aantal} {cat.aantal === 1 ? "tool" : "tools"}
                    </p>
                  </div>
                </div>
                {topTool && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Populairste: <span className="text-foreground font-medium">{topTool.naam}</span>{" "}
                    ({topTool.rating}/5)
                  </p>
                )}
                <p className="mt-2 text-sm text-muted-foreground">
                  Bekijk alle {cat.naam.toLowerCase()} tools →
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
