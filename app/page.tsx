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
  Shield,
  TrendingUp,
  ArrowRight,
  BarChart3,
  Users,
  Star,
} from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { ToolCard } from "@/components/ToolCard";
import { SearchBar } from "@/components/SearchBar";
import { getAllTools, getFeaturedTools, getAllCategories } from "@/lib/tools";

const categoryIcons: Record<string, React.ReactNode> = {
  "ai-assistent": <Bot className="h-6 w-6" />,
  "ai-code-assistent": <Code className="h-6 w-6" />,
  "ai-schrijven": <PenTool className="h-6 w-6" />,
  "ai-beeldgeneratie": <ImageIcon className="h-6 w-6" />,
  "ai-zoekmachine": <Search className="h-6 w-6" />,
  "ai-productiviteit": <BrainCircuit className="h-6 w-6" />,
  "ai-audio": <Volume2 className="h-6 w-6" />,
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

export default function HomePage() {
  const allTools = getAllTools();
  const featured = getFeaturedTools();
  const categories = getAllCategories();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-grid-pattern absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="font-[var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-white via-blue-100 to-violet-300 bg-clip-text text-transparent">
                Vind het perfecte
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                AI tool
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Vergelijk {allTools.length}+ AI tools op prijs, features en reviews. Van ChatGPT tot
              Midjourney — ontdek welk tool bij jou past.
            </p>

            {/* Search */}
            <div className="mx-auto mt-10 max-w-xl">
              <SearchBar large />
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
              {[
                { icon: <BarChart3 className="h-4 w-4" />, label: `${allTools.length} AI tools` },
                { icon: <Users className="h-4 w-4" />, label: `${categories.length} categorieën` },
                {
                  icon: <Star className="h-4 w-4" />,
                  label: `${allTools.reduce((sum, t) => sum + t.reviews_aantal, 0).toLocaleString("nl-BE")} reviews`,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground"
                >
                  {stat.icon}
                  {stat.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeader
          title="Populaire categorieën"
          subtitle="Ontdek AI tools per categorie en vind de beste optie voor jouw use case."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
            >
              <Link
                href={`/categorie/${cat.slug}`}
                className={`group flex items-center gap-4 rounded-xl border bg-gradient-to-br p-5 transition-all duration-300 hover:shadow-lg ${categoryColors[cat.slug] || "from-blue-500/20 to-blue-600/5 border-blue-500/20"}`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-foreground transition-colors group-hover:bg-white/15">
                  {categoryIcons[cat.slug] || <Zap className="h-6 w-6" />}
                </div>
                <div>
                  <h3 className="font-[var(--font-display)] font-semibold">{cat.naam}</h3>
                  <p className="text-sm text-muted-foreground">
                    {cat.aantal} {cat.aantal === 1 ? "tool" : "tools"}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured tools */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeader
          title="Uitgelichte AI tools"
          subtitle="De populairste en best beoordeelde AI tools van dit moment."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.slice(0, 6).map((tool, i) => (
            <ToolCard key={tool.slug} tool={tool} index={i} />
          ))}
        </div>
      </section>

      {/* Versus CTA */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-transparent p-8 sm:p-12"
        >
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="relative">
            <h2 className="font-[var(--font-display)] text-3xl font-bold md:text-4xl">
              <span className="bg-gradient-to-r from-white via-blue-100 to-violet-300 bg-clip-text text-transparent">
                Weet je nog niet wat te kiezen?
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Vergelijk twee AI tools zij aan zij. Features, prijzen en onze aanbeveling — alles
              wat je nodig hebt om de juiste keuze te maken.
            </p>
            <Link
              href="/vergelijk/chatgpt-vs-claude"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-8 py-4 font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 hover:from-blue-400 hover:to-violet-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
            >
              Vergelijk tools
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Recent tools */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeader title="Recent toegevoegd" subtitle="De nieuwste AI tools op ToolScout." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allTools.slice(0, 3).map((tool, i) => (
            <ToolCard key={tool.slug} tool={tool} index={i} />
          ))}
        </div>
      </section>

      {/* Trust section */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeader
          title="Waarom ToolScout?"
          subtitle="Wij helpen je de juiste AI tool te vinden — onafhankelijk, transparant en in het Nederlands."
        />
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            {
              icon: <Shield className="h-8 w-8 text-blue-400" />,
              title: "Eerlijk & onafhankelijk",
              desc: "Onze reviews zijn gebaseerd op uitgebreid testen. Geen betaalde rankings — transparantie staat voorop.",
            },
            {
              icon: <TrendingUp className="h-8 w-8 text-emerald-400" />,
              title: "Altijd up-to-date",
              desc: "AI evolueert snel. Wij houden prijzen, features en reviews doorlopend actueel zodat jij altijd de laatste info hebt.",
            },
            {
              icon: <Users className="h-8 w-8 text-violet-400" />,
              title: "Voor de Nederlandstalige markt",
              desc: "Speciaal voor België en Nederland. Reviews in het Nederlands, met aandacht voor lokale beschikbaarheid.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
              className="rounded-xl border border-white/10 bg-white/5 p-8 text-center transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
                {item.icon}
              </div>
              <h3 className="mt-6 font-[var(--font-display)] text-lg font-semibold">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
