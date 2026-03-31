import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  naam: string;
  slug: string;
  linked?: boolean;
}

const categoryColors: Record<string, string> = {
  "ai-assistent": "bg-blue-500/15 text-blue-400 border-blue-500/20",
  "ai-code-assistent": "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  "ai-schrijven": "bg-violet-500/15 text-violet-400 border-violet-500/20",
  "ai-beeldgeneratie": "bg-pink-500/15 text-pink-400 border-pink-500/20",
  "ai-zoekmachine": "bg-amber-500/15 text-amber-400 border-amber-500/20",
  "ai-productiviteit": "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  "ai-audio": "bg-orange-500/15 text-orange-400 border-orange-500/20",
};

export function CategoryBadge({ naam, slug, linked = true }: CategoryBadgeProps) {
  const colorClass = categoryColors[slug] || "bg-blue-500/15 text-blue-400 border-blue-500/20";

  const badge = (
    <span
      className={cn(
        "inline-flex items-center font-mono text-xs uppercase tracking-wider px-3 py-1 rounded-full border transition-colors",
        colorClass,
        linked && "hover:brightness-125"
      )}
    >
      {naam}
    </span>
  );

  if (linked) {
    return <Link href={`/categorie/${slug}`}>{badge}</Link>;
  }

  return badge;
}
