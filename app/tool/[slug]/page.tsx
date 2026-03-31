import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, X, ChevronRight, ExternalLink } from "lucide-react";
import { getAllTools, getToolBySlug, getRelatedTools, type Tool } from "@/lib/tools";
import { RatingStars } from "@/components/RatingStars";
import { CategoryBadge } from "@/components/CategoryBadge";
import { AffiliateButton } from "@/components/AffiliateButton";
import { ToolCard } from "@/components/ToolCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { ToolPageClient } from "./client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllTools().map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Tool niet gevonden" };

  return {
    title: `${tool.naam} Review 2026 — Eerlijk & Onafhankelijk`,
    description: `Lees onze uitgebreide review van ${tool.naam}. Prijzen vanaf €${tool.prijs_vanaf}, features, voor- en nadelen. Inclusief beste alternatieven.`,
    openGraph: {
      title: `${tool.naam} Review 2026 | ToolScout`,
      description: tool.tagline,
      type: "article",
    },
    alternates: {
      canonical: `https://toolscout.be/tool/${slug}`,
    },
  };
}

const featureLabels: Record<string, string> = {
  gratis_plan: "Gratis plan",
  api_beschikbaar: "API beschikbaar",
  nederlandstalig: "Nederlandstalig",
  mobiele_app: "Mobiele app",
  browser_extensie: "Browser extensie",
  team_functies: "Team functies",
};

const faqQuestions = (tool: Tool) => [
  {
    q: `Is ${tool.naam} gratis te gebruiken?`,
    a: tool.features.gratis_plan
      ? `Ja, ${tool.naam} biedt een gratis plan aan. Voor meer functies kun je upgraden naar het Pro-plan vanaf €${tool.prijs_pro}/maand.`
      : `Nee, ${tool.naam} heeft geen gratis plan. Prijzen beginnen vanaf €${tool.prijs_vanaf}/maand.`,
  },
  {
    q: `Werkt ${tool.naam} in het Nederlands?`,
    a: tool.features.nederlandstalig
      ? `Ja, ${tool.naam} ondersteunt de Nederlandse taal.`
      : `${tool.naam} heeft momenteel beperkte ondersteuning voor Nederlands. De interface en output zijn primair in het Engels.`,
  },
  {
    q: `Voor wie is ${tool.naam} het meest geschikt?`,
    a: `${tool.naam} is ideaal voor ${tool.voor_wie.join(", ")}. Populaire use cases zijn: ${tool.use_cases.join(", ")}.`,
  },
  {
    q: `Wat zijn de beste alternatieven voor ${tool.naam}?`,
    a: `Populaire alternatieven voor ${tool.naam} zijn ${tool.alternativen.map((a) => a.charAt(0).toUpperCase() + a.slice(1)).join(", ")}. Vergelijk ze op ToolScout om de beste keuze voor jouw situatie te maken.`,
  },
  {
    q: `Heeft ${tool.naam} een API?`,
    a: tool.features.api_beschikbaar
      ? `Ja, ${tool.naam} biedt een API aan waarmee developers de functionaliteit kunnen integreren in hun eigen applicaties.`
      : `Nee, ${tool.naam} biedt momenteel geen publieke API aan.`,
  },
];

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const related = getRelatedTools(tool, 3);
  const faqs = faqQuestions(tool);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.naam,
    description: tool.beschrijving,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: tool.prijs_vanaf,
      priceCurrency: "EUR",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tool.rating,
      reviewCount: tool.reviews_aantal,
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <ToolPageClient tool={tool} related={related} faqs={faqs} featureLabels={featureLabels} />
    </>
  );
}
