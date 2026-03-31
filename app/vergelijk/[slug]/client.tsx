"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, X, ChevronRight, Trophy, ArrowRight } from "lucide-react";
import { RatingStars } from "@/components/RatingStars";
import { AffiliateButton } from "@/components/AffiliateButton";
import { ToolCard } from "@/components/ToolCard";
import { Badge } from "@/components/ui/badge";
import { getRelatedTools, type Tool } from "@/lib/tools";

interface ComparePageClientProps {
  toolA: Tool;
  toolB: Tool;
}

const featureLabels: Record<string, string> = {
  gratis_plan: "Gratis plan",
  api_beschikbaar: "API beschikbaar",
  nederlandstalig: "Nederlandstalig",
  mobiele_app: "Mobiele app",
  browser_extensie: "Browser extensie",
  team_functies: "Team functies",
};

export function ComparePageClient({ toolA, toolB }: ComparePageClientProps) {
  const winner = toolA.rating >= toolB.rating ? toolA : toolB;
  const relatedA = getRelatedTools(toolA, 2).filter((t) => t.slug !== toolB.slug);
  const relatedB = getRelatedTools(toolB, 2).filter((t) => t.slug !== toolA.slug);
  const allRelated = [...relatedA, ...relatedB].slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">
          {toolA.naam} vs {toolB.naam}
        </span>
      </nav>

      {/* Sticky header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="sticky top-16 z-40 -mx-4 mb-12 border-b border-white/10 bg-[var(--background)]/90 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-sm font-bold">
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
            <span className="font-[var(--font-display)] font-semibold">{toolA.naam}</span>
          </div>

          <span className="font-mono text-sm text-muted-foreground">VS</span>

          <div className="flex items-center gap-3">
            <span className="font-[var(--font-display)] font-semibold">{toolB.naam}</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-sm font-bold">
              <Image
                src={toolB.logo}
                alt={toolB.naam}
                width={40}
                height={40}
                className="rounded-lg object-contain p-1"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = "none";
                  t.parentElement!.textContent = toolB.naam.charAt(0);
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Title */}
      <h1 className="text-center font-[var(--font-display)] text-3xl font-bold sm:text-4xl md:text-5xl">
        <span className="bg-gradient-to-r from-white via-blue-100 to-violet-300 bg-clip-text text-transparent">
          {toolA.naam} vs {toolB.naam}
        </span>
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
        Welk AI tool is de betere keuze in 2026? Vergelijk features, prijzen en onze beoordeling.
      </p>

      {/* Winner badge */}
      <div className="mt-8 flex justify-center">
        <Badge className="gap-2 bg-amber-500/15 text-amber-400 border-amber-500/20 px-4 py-2 text-sm">
          <Trophy className="h-4 w-4" />
          {winner.naam} wint met een rating van {winner.rating}
        </Badge>
      </div>

      {/* Rating comparison */}
      <div className="mt-12 grid grid-cols-2 gap-6">
        {[toolA, toolB].map((tool) => (
          <motion.div
            key={tool.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`rounded-xl border p-6 text-center ${
              tool.slug === winner.slug
                ? "border-amber-500/30 bg-amber-500/5"
                : "border-white/10 bg-white/5"
            }`}
          >
            <p className="font-[var(--font-display)] text-xl font-bold">{tool.naam}</p>
            <div className="mt-3 flex justify-center">
              <RatingStars rating={tool.rating} reviewCount={tool.reviews_aantal} size="md" />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{tool.tagline}</p>
            <div className="mt-4">
              <AffiliateButton slug={tool.slug} size="sm" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Features comparison table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mt-16"
      >
        <h2 className="font-[var(--font-display)] text-2xl font-bold">Feature vergelijking</h2>
        <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
          {/* Header */}
          <div className="grid grid-cols-3 bg-white/5 px-6 py-3 text-sm font-semibold">
            <span>Feature</span>
            <span className="text-center">{toolA.naam}</span>
            <span className="text-center">{toolB.naam}</span>
          </div>
          {Object.keys(featureLabels).map((key, i) => (
            <div
              key={key}
              className={`grid grid-cols-3 px-6 py-4 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-sm">{featureLabels[key]}</span>
              <span className="flex justify-center">
                {toolA.features[key as keyof typeof toolA.features] ? (
                  <Check className="h-5 w-5 text-emerald-400" />
                ) : (
                  <X className="h-5 w-5 text-red-400/60" />
                )}
              </span>
              <span className="flex justify-center">
                {toolB.features[key as keyof typeof toolB.features] ? (
                  <Check className="h-5 w-5 text-emerald-400" />
                ) : (
                  <X className="h-5 w-5 text-red-400/60" />
                )}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Price comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mt-16"
      >
        <h2 className="font-[var(--font-display)] text-2xl font-bold">Prijsvergelijking</h2>
        <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
          <div className="grid grid-cols-3 bg-white/5 px-6 py-3 text-sm font-semibold">
            <span>Plan</span>
            <span className="text-center">{toolA.naam}</span>
            <span className="text-center">{toolB.naam}</span>
          </div>
          <div className="grid grid-cols-3 px-6 py-4 bg-white/[0.02]">
            <span className="text-sm">Gratis</span>
            <span className="text-center text-sm">
              {toolA.features.gratis_plan ? (
                <span className="text-emerald-400">Beschikbaar</span>
              ) : (
                <span className="text-muted-foreground">-</span>
              )}
            </span>
            <span className="text-center text-sm">
              {toolB.features.gratis_plan ? (
                <span className="text-emerald-400">Beschikbaar</span>
              ) : (
                <span className="text-muted-foreground">-</span>
              )}
            </span>
          </div>
          <div className="grid grid-cols-3 px-6 py-4">
            <span className="text-sm">Pro plan</span>
            <span className="text-center text-sm font-semibold">€{toolA.prijs_pro}/maand</span>
            <span className="text-center text-sm font-semibold">€{toolB.prijs_pro}/maand</span>
          </div>
        </div>
      </motion.div>

      {/* Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mt-16 grid gap-6 sm:grid-cols-2"
      >
        {[toolA, toolB].map((tool) => (
          <div
            key={tool.slug}
            className="rounded-xl border border-white/10 bg-white/5 p-6"
          >
            <h3 className="font-[var(--font-display)] text-lg font-semibold">
              Kies {tool.naam} als...
            </h3>
            <ul className="mt-4 space-y-2">
              {tool.voor.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-blue-400" />
                  {item}
                </li>
              ))}
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-blue-400" />
                Je zoekt een tool voor: {tool.use_cases.slice(0, 2).join(", ")}
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href={`/tool/${tool.slug}`}
                className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                Lees volledige review →
              </Link>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Alternatives */}
      {allRelated.length > 0 && (
        <div className="mt-16">
          <h2 className="font-[var(--font-display)] text-2xl font-bold">
            Andere alternatieven
          </h2>
          <p className="mt-2 text-muted-foreground">
            Bekijk ook deze populaire AI tools.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allRelated.map((tool, i) => (
              <ToolCard key={tool.slug} tool={tool} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
