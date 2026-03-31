import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTools, getToolBySlug, getRelatedTools } from "@/lib/tools";
import { AlternativePageClient } from "./client";

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
    title: `Beste ${tool.naam} Alternatieven 2026 — Top ${tool.alternativen.length + 5} Opties`,
    description: `Op zoek naar een alternatief voor ${tool.naam}? Vergelijk de beste ${tool.categorie.toLowerCase()} alternatieven op prijs, features en gebruiksgemak. Vind de perfecte vervanger.`,
    openGraph: {
      title: `${tool.naam} Alternatieven 2026 | ToolScout`,
      description: `De beste alternatieven voor ${tool.naam} vergeleken. Gratis opties, goedkopere keuzes en betere features.`,
      type: "article",
    },
    alternates: {
      canonical: `https://toolscout.be/alternatieven/${slug}`,
    },
  };
}

export default async function AlternatiefPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  // Named alternatives from the tool data
  const alternatives = tool.alternativen
    .map((s) => getToolBySlug(s))
    .filter(Boolean) as ReturnType<typeof getToolBySlug>[];

  // Fill up with same-category tools if needed
  const allTools = getAllTools();
  const namedSlugs = new Set([tool.slug, ...tool.alternativen]);
  const sameCategoryTools = allTools
    .filter((t) => t.categorie_slug === tool.categorie_slug && !namedSlugs.has(t.slug))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, Math.max(0, 9 - alternatives.length));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Beste alternatieven voor ${tool.naam}`,
    description: `De top alternatieven voor ${tool.naam} in 2026`,
    numberOfItems: alternatives.length + sameCategoryTools.length,
    itemListElement: [...(alternatives.filter(Boolean) as NonNullable<ReturnType<typeof getToolBySlug>>[]), ...sameCategoryTools].map((alt, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: alt.naam,
      url: `https://toolscout.be/tool/${alt.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AlternativePageClient
        tool={tool}
        alternatives={(alternatives.filter(Boolean) as NonNullable<ReturnType<typeof getToolBySlug>>[]) }
        sameCategoryTools={sameCategoryTools}
      />
    </>
  );
}
