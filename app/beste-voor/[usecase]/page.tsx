import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllVoorWie, getToolsByVoorWie, getVoorWieLabel } from "@/lib/tools";
import { BesteVoorClient } from "./client";

interface PageProps {
  params: Promise<{ usecase: string }>;
}

export async function generateStaticParams() {
  return getAllVoorWie().map((entry) => ({ usecase: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { usecase } = await params;
  const label = getVoorWieLabel(usecase);
  if (!label) return { title: "Niet gevonden" };

  const tools = getToolsByVoorWie(usecase);

  return {
    title: `Beste AI Tools voor ${label.charAt(0).toUpperCase() + label.slice(1)} 2026 — Top ${tools.length} Vergeleken`,
    description: `Ontdek de beste AI tools voor ${label}. We vergeleken ${tools.length} tools op prijs, features en gebruiksgemak. Vind de perfecte AI tool voor jouw situatie.`,
    openGraph: {
      title: `Beste AI Tools voor ${label} 2026 | ToolScout`,
      description: `Top ${tools.length} AI tools voor ${label} vergeleken. Gratis & betaald, met en zonder Nederlandse interface.`,
      type: "article",
    },
    alternates: {
      canonical: `https://toolscout.be/beste-voor/${usecase}`,
    },
  };
}

export default async function BesteVoorPage({ params }: PageProps) {
  const { usecase } = await params;
  const label = getVoorWieLabel(usecase);
  if (!label) notFound();

  const tools = getToolsByVoorWie(usecase).sort((a, b) => b.rating - a.rating);
  if (tools.length === 0) notFound();

  const allVoorWie = getAllVoorWie();
  const currentEntry = allVoorWie.find((e) => e.slug === usecase)!;
  const relatedEntries = allVoorWie
    .filter((e) => e.slug !== usecase)
    .slice(0, 10);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Beste AI tools voor ${label}`,
    description: `De top ${tools.length} AI tools voor ${label} in 2026`,
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.naam,
      url: `https://toolscout.be/tool/${tool.slug}`,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Welke AI tool is het beste voor ${label}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: tools[0]
            ? `${tools[0].naam} is de best beoordeelde AI tool voor ${label} met een rating van ${tools[0].rating}/5.`
            : `Er zijn meerdere goede opties voor ${label}.`,
        },
      },
      {
        "@type": "Question",
        name: `Zijn er gratis AI tools voor ${label}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: tools.filter((t) => t.features.gratis_plan).length > 0
            ? `Ja, ${tools.filter((t) => t.features.gratis_plan).map((t) => t.naam).slice(0, 3).join(", ")} bieden een gratis plan aan.`
            : `De meeste tools voor ${label} zijn betaald, maar bieden vaak een gratis proefperiode.`,
        },
      },
    ],
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
      <BesteVoorClient
        entry={currentEntry}
        tools={tools}
        relatedEntries={relatedEntries}
      />
    </>
  );
}
