"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { RatingStars } from "@/components/RatingStars";
import { CategoryBadge } from "@/components/CategoryBadge";
import { Badge } from "@/components/ui/badge";
import type { Tool } from "@/lib/tools";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: Tool;
  index?: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
  }),
};

function PrijsBadge({ model }: { model: string }) {
  const colorMap: Record<string, string> = {
    Gratis: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    Freemium: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    Betaald: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  };

  return (
    <Badge
      variant="outline"
      className={cn("font-mono text-xs", colorMap[model] || colorMap.Betaald)}
    >
      {model}
    </Badge>
  );
}

export function ToolCard({ tool, index = 0 }: ToolCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
    >
      <div
        className={cn(
          "group relative flex flex-col rounded-xl p-6",
          "bg-white/5 backdrop-blur-md",
          "border border-white/10",
          "hover:border-blue-500/30 hover:bg-white/[0.08]",
          "hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
          "transition-all duration-300",
          "h-full"
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-white/10 flex items-center justify-center text-lg font-bold">
              <Image
                src={tool.logo}
                alt={`${tool.naam} logo`}
                width={40}
                height={40}
                className="object-contain p-1"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.parentElement!.textContent = tool.naam.charAt(0);
                }}
              />
            </div>
            <div>
              <h3 className="font-[var(--font-display)] font-semibold leading-tight">
                {tool.naam}
              </h3>
              <CategoryBadge naam={tool.categorie} slug={tool.categorie_slug} />
            </div>
          </div>
          <PrijsBadge model={tool.prijs_model} />
        </div>

        {/* Tagline */}
        <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">{tool.tagline}</p>

        {/* Rating */}
        <div className="mt-4">
          <RatingStars rating={tool.rating} reviewCount={tool.reviews_aantal} />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="mt-6 flex items-center gap-3">
          <Link
            href={`/tool/${tool.slug}`}
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10"
          >
            Bekijk tool
          </Link>
          <Link
            href={`/go/${tool.slug}`}
            rel="nofollow sponsored"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 hover:from-blue-400 hover:to-violet-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
          >
            Probeer gratis
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>

        {/* Badges */}
        <div className="mt-3 flex gap-2">
          {tool.nieuw && (
            <Badge variant="outline" className="bg-emerald-500/15 text-emerald-400 border-emerald-500/20 font-mono text-xs">
              Nieuw
            </Badge>
          )}
          {tool.verified && (
            <Badge variant="outline" className="bg-blue-500/15 text-blue-400 border-blue-500/20 font-mono text-xs">
              Verified
            </Badge>
          )}
        </div>
      </div>
    </motion.div>
  );
}
