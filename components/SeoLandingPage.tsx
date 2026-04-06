import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Star } from "lucide-react";
import { ToolCard } from "@/components/ToolCard";
import type { Tool } from "@/lib/tools";

interface FaqItem {
  question: string;
  answer: string;
}

interface SeoLandingPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  summary: string;
  bullets: string[];
  faqs: FaqItem[];
  tools: Tool[];
  primaryCtaHref: string;
  primaryCtaLabel: string;
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
}

export function SeoLandingPage({
  eyebrow,
  title,
  intro,
  summary,
  bullets,
  faqs,
  tools,
  primaryCtaHref,
  primaryCtaLabel,
  secondaryCtaHref,
  secondaryCtaLabel,
}: SeoLandingPageProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-transparent px-6 py-12 sm:px-10 sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.14),transparent_28%)]" />
        <div className="relative max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-blue-200">
            <Sparkles className="h-4 w-4" />
            {eyebrow}
          </div>
          <h1 className="mt-6 font-[var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">{intro}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={primaryCtaHref}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-3 font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] transition hover:from-blue-400 hover:to-violet-400"
            >
              {primaryCtaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
            {secondaryCtaHref && secondaryCtaLabel ? (
              <Link
                href={secondaryCtaHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-foreground transition hover:bg-white/10"
              >
                {secondaryCtaLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="grid gap-6 py-16 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold">Waarom deze selectie?</h2>
          <p className="mt-4 text-muted-foreground">{summary}</p>
          <ul className="mt-6 space-y-4">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-sm text-muted-foreground sm:text-base">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold">Waar let je best op?</h2>
          <div className="mt-6 space-y-5 text-sm text-muted-foreground sm:text-base">
            <div>
              <div className="flex items-center gap-2 font-medium text-foreground">
                <Star className="h-4 w-4 text-amber-400" />
                Outputkwaliteit
              </div>
              <p className="mt-2">Kijk niet alleen naar flashy demo’s. Test of de tool consistente resultaten geeft voor jouw echte workflows.</p>
            </div>
            <div>
              <div className="flex items-center gap-2 font-medium text-foreground">
                <Star className="h-4 w-4 text-amber-400" />
                Prijs versus limieten
              </div>
              <p className="mt-2">Freemium is handig, maar check credits, fair use-limieten en commerciële gebruiksrechten voordat je beslist.</p>
            </div>
            <div>
              <div className="flex items-center gap-2 font-medium text-foreground">
                <Star className="h-4 w-4 text-amber-400" />
                Integraties
              </div>
              <p className="mt-2">Een tool wordt pas echt bruikbaar als die goed past in je huidige stack: docs, marketing, design of support.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-[var(--font-display)] text-3xl font-semibold">Beste tools van dit moment</h2>
            <p className="mt-2 text-muted-foreground">Geselecteerd op kwaliteit, gebruiksgemak, prijsmodel en relevantie voor België en Nederland.</p>
          </div>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, index) => (
            <ToolCard key={tool.slug} tool={tool} index={index} />
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="font-[var(--font-display)] text-3xl font-semibold">Veelgestelde vragen</h2>
          <div className="mt-8 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-white/10 bg-black/10 p-5">
                <h3 className="font-medium text-foreground">{faq.question}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
