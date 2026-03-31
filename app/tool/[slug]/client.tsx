"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X, ChevronRight } from "lucide-react";
import { RatingStars } from "@/components/RatingStars";
import { CategoryBadge } from "@/components/CategoryBadge";
import { AffiliateButton } from "@/components/AffiliateButton";
import { ToolCard } from "@/components/ToolCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import type { Tool } from "@/lib/tools";

interface ToolPageClientProps {
  tool: Tool;
  related: Tool[];
  faqs: { q: string; a: string }[];
  featureLabels: Record<string, string>;
}

export function ToolPageClient({ tool, related, faqs, featureLabels }: ToolPageClientProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/categorie/${tool.categorie_slug}`} className="hover:text-foreground transition-colors">
          {tool.categorie}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{tool.naam}</span>
      </nav>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-start gap-8 sm:flex-row sm:items-center"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 text-3xl font-bold">
          <Image
            src={tool.logo}
            alt={`${tool.naam} logo`}
            width={80}
            height={80}
            className="rounded-2xl object-contain p-2"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.style.display = "none";
              t.parentElement!.textContent = tool.naam.charAt(0);
            }}
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-[var(--font-display)] text-3xl font-bold sm:text-4xl">
              {tool.naam}
            </h1>
            <CategoryBadge naam={tool.categorie} slug={tool.categorie_slug} />
            {tool.verified && (
              <Badge variant="outline" className="bg-blue-500/15 text-blue-400 border-blue-500/20 font-mono text-xs">
                Verified
              </Badge>
            )}
          </div>
          <p className="mt-2 text-lg text-muted-foreground">{tool.tagline}</p>
          <div className="mt-3">
            <RatingStars rating={tool.rating} reviewCount={tool.reviews_aantal} size="md" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <AffiliateButton slug={tool.slug} size="lg" />
          <Link
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Bezoek website
          </Link>
        </div>
      </motion.div>

      {/* Quick overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
        className="mt-12 grid gap-4 rounded-xl border border-white/10 bg-white/5 p-6 sm:grid-cols-3"
      >
        <div>
          <p className="text-sm text-muted-foreground">Prijs</p>
          <p className="mt-1 font-semibold">
            {tool.prijs_vanaf === 0 ? "Gratis" : `Vanaf €${tool.prijs_vanaf}/maand`}
            {tool.prijs_pro > 0 && tool.prijs_vanaf === 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                {" "}— Pro €{tool.prijs_pro}/maand
              </span>
            )}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Voor wie</p>
          <p className="mt-1 font-semibold capitalize">{tool.voor_wie.join(", ")}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Gratis plan</p>
          <p className="mt-1 font-semibold">
            {tool.features.gratis_plan ? (
              <span className="text-emerald-400">Ja, beschikbaar</span>
            ) : (
              <span className="text-muted-foreground">Nee</span>
            )}
          </p>
        </div>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mt-16"
      >
        <h2 className="font-[var(--font-display)] text-2xl font-bold">
          Wat is {tool.naam}?
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">{tool.beschrijving}</p>
      </motion.div>

      {/* Features table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mt-16"
      >
        <h2 className="font-[var(--font-display)] text-2xl font-bold">Features</h2>
        <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
          {Object.entries(tool.features).map(([key, val], i) => (
            <div
              key={key}
              className={`flex items-center justify-between px-6 py-4 ${i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/5"}`}
            >
              <span className="text-sm">{featureLabels[key] || key}</span>
              {val ? (
                <Check className="h-5 w-5 text-emerald-400" />
              ) : (
                <X className="h-5 w-5 text-red-400/60" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Pros & Cons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mt-16 grid gap-6 sm:grid-cols-2"
      >
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <h3 className="font-[var(--font-display)] text-lg font-semibold text-emerald-400">
            Voordelen
          </h3>
          <ul className="mt-4 space-y-3">
            {tool.voor.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
          <h3 className="font-[var(--font-display)] text-lg font-semibold text-red-400">
            Nadelen
          </h3>
          <ul className="mt-4 space-y-3">
            {tool.tegen.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Pricing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mt-16"
      >
        <h2 className="font-[var(--font-display)] text-2xl font-bold">Prijzen</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {tool.features.gratis_plan && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Gratis
              </p>
              <p className="mt-2 font-[var(--font-display)] text-3xl font-bold">€0</p>
              <p className="mt-1 text-sm text-muted-foreground">Per maand</p>
              <p className="mt-4 text-sm text-muted-foreground">
                Basisfuncties, beperkt gebruik
              </p>
            </div>
          )}
          <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-6 ring-1 ring-blue-500/20">
            <p className="font-mono text-xs uppercase tracking-wider text-blue-400">Pro</p>
            <p className="mt-2 font-[var(--font-display)] text-3xl font-bold">
              €{tool.prijs_pro}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Per maand</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Alle features, meer capaciteit
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Enterprise
            </p>
            <p className="mt-2 font-[var(--font-display)] text-3xl font-bold">Op aanvraag</p>
            <p className="mt-1 text-sm text-muted-foreground">Per maand</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Custom limieten, SLA, ondersteuning
            </p>
          </div>
        </div>
      </motion.div>

      {/* Alternatives */}
      {related.length > 0 && (
        <div className="mt-16">
          <SectionHeader
            title={`Alternatieven voor ${tool.naam}`}
            subtitle="Vergelijk met deze populaire alternatieven."
            centered={false}
            size="sm"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t, i) => (
              <ToolCard key={t.slug} tool={t} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mt-16"
      >
        <h2 className="font-[var(--font-display)] text-2xl font-bold">
          Veelgestelde vragen over {tool.naam}
        </h2>
        <div className="mt-6 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl border border-white/10 bg-white/5 transition-colors hover:bg-white/[0.08]"
            >
              <summary className="cursor-pointer px-6 py-4 font-medium list-none flex items-center justify-between">
                {faq.q}
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
              </summary>
              <div className="px-6 pb-4 text-sm text-muted-foreground">{faq.a}</div>
            </details>
          ))}
        </div>
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-transparent p-8 text-center sm:p-12"
      >
        <h2 className="font-[var(--font-display)] text-2xl font-bold sm:text-3xl">
          <span className="bg-gradient-to-r from-white via-blue-100 to-violet-300 bg-clip-text text-transparent">
            Klaar om {tool.naam} te proberen?
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Start vandaag nog{tool.features.gratis_plan ? " gratis" : ""} en ontdek wat {tool.naam}{" "}
          voor jou kan betekenen.
        </p>
        <div className="mt-8">
          <AffiliateButton slug={tool.slug} size="lg" label={`Probeer ${tool.naam}`} />
        </div>
      </motion.div>
    </div>
  );
}
