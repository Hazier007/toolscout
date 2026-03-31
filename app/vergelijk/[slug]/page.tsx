import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTools, getToolBySlug, parseVersusSlug, generateVersusSlug } from "@/lib/tools";
import { ComparePageClient } from "./client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tools = getAllTools();
  const slugs = new Set<string>();

  for (const tool of tools) {
    for (const alt of tool.alternativen) {
      slugs.add(generateVersusSlug(tool.slug, alt));
    }
  }

  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseVersusSlug(slug);
  if (!parsed) return { title: "Vergelijking niet gevonden" };

  const toolA = getToolBySlug(parsed.a);
  const toolB = getToolBySlug(parsed.b);
  if (!toolA || !toolB) return { title: "Vergelijking niet gevonden" };

  return {
    title: `${toolA.naam} vs ${toolB.naam} — Welke is beter in 2026?`,
    description: `Vergelijk ${toolA.naam} en ${toolB.naam} op prijs, features en reviews. Ontdek welk AI tool het best bij jou past.`,
    alternates: {
      canonical: `https://toolscout.be/vergelijk/${slug}`,
    },
  };
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseVersusSlug(slug);
  if (!parsed) notFound();

  const toolA = getToolBySlug(parsed.a);
  const toolB = getToolBySlug(parsed.b);
  if (!toolA || !toolB) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${toolA.naam} vs ${toolB.naam}`,
    description: `Vergelijking tussen ${toolA.naam} en ${toolB.naam}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ComparePageClient toolA={toolA} toolB={toolB} />
    </>
  );
}
