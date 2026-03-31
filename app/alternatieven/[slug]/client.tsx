"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Star, Check, X, ExternalLink } from "lucide-react";
import { type Tool } from "@/lib/tools";
import { ToolCard } from "@/components/ToolCard";
import { AffiliateButton } from "@/components/AffiliateButton";
import { RatingStars } from "@/components/RatingStars";
import { CategoryBadge } from "@/components/CategoryBadge";
import { Badge } from "@/components/ui/badge";

interface AlternativePageClientProps {
  tool: Tool;
  alternatives: Tool[];
  sameCategoryTools: Tool[];
}

export function AlternativePageClient({ tool, alternatives, sameCategoryTools }: AlternativePageClientProps) {
  const allAlts = [...alternatives, ...sameCategoryTools].slice(0, 9);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <Link href="/alternatieven" className="hover:text-foreground transition-colors">Alternatieven</Link>
        <span>/</span>
        <span className="text-foreground">{tool.naam}</span>
      </nav>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 border border-white/10">
            <Image
              src={tool.logo}
              alt={tool.naam}
              width={48}
              height={48}
              className="rounded-xl object-contain p-1"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.style.display = "none";
                if (t.parentElement) t.parentElement.textContent = tool.naam.charAt(0);
              }}
            />
          </div>
          <div>
            <CategoryBadge naam={tool.categorie} slug={tool.categorie_slug} />
            <h1 className="mt-1 font-[var(--font-display)] text-3xl font-bold sm:text-4xl lg:text-5xl">
              Beste alternatieven voor{" "}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                {tool.naam}
              </span>{" "}
              in 2026
            </h1>
          </div>
        </div>
        <p className="max-w-3xl text-lg text-muted-foreground leading-relaxed">
          Op zoek naar een alternatief voor {tool.naam}? We hebben <strong className="text-foreground">{allAlts.length} alternatieven</strong> vergeleken op prijs, features en gebruiksgemak.
          Of je nu een gratis optie zoekt of meer geavanceerde functies nodig hebt — er is een passende {tool.categorie.toLowerCase()} voor elke situatie.
        </p>
      </motion.div>

      {/* Current tool quick summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-6"
      >
        <h2 className="mb-4 font-[var(--font-display)] text-xl font-semibold">Waarom een alternatief voor {tool.naam}?</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider">Voordelen van {tool.naam}</p>
            <ul className="space-y-2">
              {tool.voor.map((v) => (
                <li key={v} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider">Nadelen (reden om te switchen)</p>
            <ul className="space-y-2">
              {tool.tegen.map((v) => (
                <li key={v} className="flex items-start gap-2 text-sm">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-4">
          <div className="flex items-center gap-2">
            <RatingStars rating={tool.rating} />
            <span className="text-sm text-muted-foreground">{tool.rating}/5 ({tool.reviews_aantal} reviews)</span>
          </div>
          <Badge variant="secondary" className="font-[var(--font-code)] text-xs">
            {tool.prijs_model === "Gratis" ? "Gratis" : tool.prijs_vanaf === 0 ? "Gratis plan" : `v.a. €${tool.prijs_vanaf}/mnd`}
          </Badge>
        </div>
      </motion.div>

      {/* Alternatives grid */}
      <div className="mb-16">
        <h2 className="mb-2 font-[var(--font-display)] text-2xl font-bold">
          {allAlts.length} alternatieven voor {tool.naam}
        </h2>
        <p className="mb-8 text-muted-foreground">Gesorteerd op rating — van beste naar slechtste.</p>

        <div className="space-y-6">
          {allAlts.map((alt, i) => (
            <motion.div
              key={alt.slug}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" as const }}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.08] hover:shadow-[0_0_30px_rgba(59,130,246,0.08)]"
            >
              {/* Rank badge */}
              <div className="absolute -left-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-xs font-bold text-white shadow-lg">
                {i + 1}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                {/* Logo */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg font-bold border border-white/10">
                  <Image
                    src={alt.logo}
                    alt={alt.naam}
                    width={40}
                    height={40}
                    className="rounded-lg object-contain p-1"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      t.style.display = "none";
                      if (t.parentElement) t.parentElement.textContent = alt.naam.charAt(0);
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <Link href={`/tool/${alt.slug}`} className="font-[var(--font-display)] text-xl font-semibold hover:text-blue-400 transition-colors">
                      {alt.naam}
                    </Link>
                    <CategoryBadge naam={alt.categorie} slug={alt.categorie_slug} />
                    {alt.featured && <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">Aanbevolen</Badge>}
                    {alt.nieuw && <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 text-xs">Nieuw</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{alt.tagline}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    {alt.features.gratis_plan && (
                      <span className="flex items-center gap-1 text-xs text-emerald-400">
                        <Check className="h-3 w-3" /> Gratis plan
                      </span>
                    )}
                    {alt.features.nederlandstalig && (
                      <span className="flex items-center gap-1 text-xs text-blue-400">
                        <Check className="h-3 w-3" /> Nederlands
                      </span>
                    )}
                    {alt.features.api_beschikbaar && (
                      <span className="flex items-center gap-1 text-xs text-violet-400">
                        <Check className="h-3 w-3" /> API
                      </span>
                    )}
                    {alt.features.mobiele_app && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Check className="h-3 w-3" /> Mobiele app
                      </span>
                    )}
                  </div>

                  {/* Pros */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {alt.voor.slice(0, 2).map((v) => (
                      <span key={v} className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Check className="h-3 w-3 text-emerald-400/70 shrink-0" />
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price + CTA */}
                <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
                  <div className="text-right">
                    <RatingStars rating={alt.rating} size="sm" />
                    <p className="text-xs text-muted-foreground mt-0.5">{alt.rating}/5</p>
                  </div>
                  <Badge variant="secondary" className="font-[var(--font-code)] text-xs">
                    {alt.prijs_model === "Gratis" ? "Gratis" : alt.prijs_vanaf === 0 ? "Gratis plan" : `v.a. €${alt.prijs_vanaf}/mnd`}
                  </Badge>
                  <div className="flex gap-2 mt-1">
                    <Link
                      href={`/tool/${alt.slug}`}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                    >
                      Review
                    </Link>
                    <AffiliateButton slug={alt.slug} size="sm" label="Probeer gratis" />
                  </div>
                </div>
              </div>

              {/* Versus link */}
              <div className="mt-4 border-t border-white/10 pt-3">
                <Link
                  href={`/vergelijk/${[tool.slug, alt.slug].sort().join("-vs-")}`}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-blue-400 transition-colors"
                >
                  <ArrowRight className="h-3 w-3" />
                  {tool.naam} vs {alt.naam} — directe vergelijking
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-bold">Veelgestelde vragen over {tool.naam} alternatieven</h2>
        <div className="space-y-4">
          {[
            {
              q: `Wat is het beste gratis alternatief voor ${tool.naam}?`,
              a: `${allAlts.filter(t => t.features.gratis_plan).map(t => t.naam).slice(0, 3).join(", ")} bieden allemaal een gratis plan aan. ${allAlts.find(t => t.features.gratis_plan)?.naam ?? allAlts[0]?.naam} scoort het hoogst van de gratis opties met een rating van ${allAlts.find(t => t.features.gratis_plan)?.rating ?? allAlts[0]?.rating}/5.`,
            },
            {
              q: `Welk alternatief voor ${tool.naam} ondersteunt Nederlands?`,
              a: `${allAlts.filter(t => t.features.nederlandstalig).map(t => t.naam).join(", ")||"Meerdere alternatieven"} ondersteunen de Nederlandse taal. Dit is handig voor Nederlandse en Belgische gebruikers.`,
            },
            {
              q: `Is er een goedkoper alternatief voor ${tool.naam}?`,
              a: tool.prijs_vanaf === 0
                ? `${tool.naam} heeft al een gratis plan, maar betaalde alternatieven zoals ${allAlts.filter(t => t.prijs_vanaf > 0 && t.prijs_vanaf < (tool.prijs_pro || 999)).map(t => t.naam).slice(0, 2).join(", ")} kunnen meer waarde bieden voor specifieke use cases.`
                : `Ja, ${allAlts.filter(t => t.prijs_vanaf < tool.prijs_vanaf || t.features.gratis_plan).map(t => t.naam).slice(0, 3).join(", ")} zijn goedkopere of gratis alternatieven voor ${tool.naam}.`,
            },
            {
              q: `Kan ik ${tool.naam} en een alternatief combineren?`,
              a: `Absoluut. Veel gebruikers combineren meerdere AI-tools voor verschillende taken. ${tool.naam} kan je gebruiken voor ${tool.use_cases.slice(0, 2).join(" en ")}, terwijl je een alternatief inzet voor andere taken.`,
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="group rounded-xl border border-white/10 bg-white/5 p-5 open:border-blue-500/20 open:bg-white/[0.08]"
            >
              <summary className="flex cursor-pointer items-center justify-between font-medium list-none">
                {faq.q}
                <span className="ml-4 shrink-0 text-muted-foreground group-open:text-foreground transition-colors">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-violet-500/5 p-8 text-center"
      >
        <h2 className="mb-2 font-[var(--font-display)] text-2xl font-bold">Nog niet zeker?</h2>
        <p className="mb-6 text-muted-foreground">
          Vergelijk {tool.naam} direct met een specifiek alternatief voor een gedetailleerde analyse.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {alternatives.slice(0, 3).map((alt) => (
            <Link
              key={alt.slug}
              href={`/vergelijk/${[tool.slug, alt.slug].sort().join("-vs-")}`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition-all hover:border-blue-500/30 hover:bg-white/10"
            >
              {tool.naam} vs {alt.naam}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
