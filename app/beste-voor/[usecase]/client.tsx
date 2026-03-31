"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Trophy } from "lucide-react";
import { type Tool, type VoorWieEntry } from "@/lib/tools";
import { ToolCard } from "@/components/ToolCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";

interface BesteVoorClientProps {
  entry: VoorWieEntry;
  tools: Tool[];
  relatedEntries: VoorWieEntry[];
}

export function BesteVoorClient({ entry, tools, relatedEntries }: BesteVoorClientProps) {
  const topTool = tools[0];
  const freemiumTools = tools.filter((t) => t.features.gratis_plan);
  const dutchTools = tools.filter((t) => t.features.nederlandstalig);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <Link href="/beste-voor" className="hover:text-foreground transition-colors">Beste voor</Link>
        <span>/</span>
        <span className="text-foreground capitalize">{entry.label}</span>
      </nav>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/10 border border-blue-500/20">
            <Users className="h-6 w-6 text-blue-400" />
          </div>
          <Badge variant="secondary" className="font-[var(--font-code)] text-xs capitalize">
            {entry.aantal} tools
          </Badge>
        </div>
        <h1 className="mb-4 font-[var(--font-display)] text-3xl font-bold sm:text-4xl lg:text-5xl">
          Beste AI tools voor{" "}
          <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent capitalize">
            {entry.label}
          </span>{" "}
          in 2026
        </h1>
        <p className="max-w-3xl text-lg text-muted-foreground leading-relaxed">
          We hebben <strong className="text-foreground">{tools.length} AI tools</strong> vergeleken die speciaal geschikt zijn voor {entry.label}.
          {freemiumTools.length > 0 && ` ${freemiumTools.length} daarvan hebben een gratis plan.`}
          {dutchTools.length > 0 && ` ${dutchTools.length} tools werken in het Nederlands.`}
        </p>

        {/* Quick stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Tools vergeleken", value: tools.length },
            { label: "Gratis beschikbaar", value: freemiumTools.length },
            { label: "Nederlandstalig", value: dutchTools.length },
            { label: "Gemiddelde rating", value: (tools.reduce((s, t) => s + t.rating, 0) / tools.length).toFixed(1) },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <p className="font-[var(--font-display)] text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Winner highlight */}
      {topTool && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-amber-600/5 p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="h-5 w-5 text-amber-400" />
            <span className="text-sm font-semibold text-amber-400">Beste keuze voor {entry.label}</span>
          </div>
          <h2 className="font-[var(--font-display)] text-2xl font-bold mb-2">{topTool.naam}</h2>
          <p className="text-muted-foreground mb-4">{topTool.beschrijving.slice(0, 200)}...</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/tool/${topTool.slug}`}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Bekijk {topTool.naam}
            </Link>
            <Link
              href={`/go/${topTool.slug}`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium transition-all hover:bg-white/10"
            >
              Probeer gratis
            </Link>
          </div>
        </motion.div>
      )}

      {/* Tools grid */}
      <div className="mb-16">
        <h2 className="mb-2 font-[var(--font-display)] text-2xl font-bold">
          Alle {tools.length} AI tools voor {entry.label}
        </h2>
        <p className="mb-8 text-muted-foreground">Gesorteerd op rating — van beste naar slechtste voor {entry.label}.</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4, ease: "easeOut" as const }}
            >
              <ToolCard tool={tool} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Use cases section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16 rounded-2xl border border-white/10 bg-white/5 p-8"
      >
        <h2 className="mb-6 font-[var(--font-display)] text-2xl font-bold">
          Wat zoek je als {entry.label}?
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from(
            new Set(tools.flatMap((t) => t.use_cases))
          ).slice(0, 12).map((uc) => (
            <div
              key={uc}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
              {uc}
            </div>
          ))}
        </div>
      </motion.div>

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-bold">
          Veelgestelde vragen
        </h2>
        <div className="space-y-4">
          {[
            {
              q: `Welke AI tool is het beste voor ${entry.label}?`,
              a: topTool
                ? `${topTool.naam} is de best beoordeelde AI tool voor ${entry.label} met een rating van ${topTool.rating}/5. Het biedt ${topTool.tagline.toLowerCase()}. ${topTool.features.gratis_plan ? "Er is ook een gratis plan beschikbaar." : `Plannen starten vanaf €${topTool.prijs_vanaf}/maand.`}`
                : `Er zijn meerdere goede opties voor ${entry.label}. Vergelijk ze op prijs en features via ToolScout.`,
            },
            {
              q: `Zijn er gratis AI tools voor ${entry.label}?`,
              a: freemiumTools.length > 0
                ? `Ja! ${freemiumTools.slice(0, 3).map(t => t.naam).join(", ")} bieden allemaal een gratis plan aan voor ${entry.label}. Je kunt ze uitproberen zonder creditcard.`
                : `De meeste AI tools voor ${entry.label} zijn betaald, maar velen bieden een gratis proefperiode aan.`,
            },
            {
              q: `Welke AI tools voor ${entry.label} werken in het Nederlands?`,
              a: dutchTools.length > 0
                ? `${dutchTools.slice(0, 4).map(t => t.naam).join(", ")} ondersteunen allemaal de Nederlandse taal. Ideaal voor Belgische en Nederlandse gebruikers.`
                : `De meeste AI tools werken voornamelijk in het Engels, maar kunnen ook Nederlandse content verwerken.`,
            },
            {
              q: `Hoe kies ik de juiste AI tool als ${entry.label}?`,
              a: `Let op deze factoren: (1) Use cases — wat wil je precies doen? (2) Budget — gratis of betaald? (3) Taal — heb je Nederlandse interface nodig? (4) Integraties — werkt het met je bestaande tools? Vergelijk de opties op ToolScout om de beste keuze te maken.`,
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

      {/* Related target groups */}
      {relatedEntries.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-6 font-[var(--font-display)] text-xl font-bold">Gerelateerde doelgroepen</h2>
          <div className="flex flex-wrap gap-3">
            {relatedEntries.map((related) => (
              <Link
                key={related.slug}
                href={`/beste-voor/${related.slug}`}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm transition-all hover:border-blue-500/30 hover:bg-white/10 capitalize"
              >
                {related.label}
                <Badge variant="secondary" className="text-xs">{related.aantal}</Badge>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
