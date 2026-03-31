import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCategories, getToolsByCategory } from "@/lib/tools";
import { CategoryPageClient } from "./client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCategories().map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = getAllCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) return { title: "Categorie niet gevonden" };

  return {
    title: `Beste ${category.naam} Tools 2026 — Top ${category.aantal} Vergeleken`,
    description: `Vergelijk de beste ${category.naam.toLowerCase()} tools. Prijzen, features en eerlijke reviews. Vind het perfecte ${category.naam.toLowerCase()} tool voor jouw needs.`,
    alternates: {
      canonical: `https://toolscout.be/categorie/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categories = getAllCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const tools = getToolsByCategory(slug);

  return <CategoryPageClient category={category} tools={tools} />;
}
