import { MetadataRoute } from "next";
import { getAllTools, getAllCategories, generateVersusSlug, getAllVoorWie } from "@/lib/tools";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://toolscout.be";

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = getAllTools();
  const categories = getAllCategories();

  const toolPages = tools.map((tool) => ({
    url: `${BASE_URL}/tool/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryPages = categories.map((cat) => ({
    url: `${BASE_URL}/categorie/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const versusPages = new Set<string>();
  for (const tool of tools) {
    for (const alt of tool.alternativen) {
      versusPages.add(generateVersusSlug(tool.slug, alt));
    }
  }

  const versusEntries = Array.from(versusPages).map((slug) => ({
    url: `${BASE_URL}/vergelijk/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const alternativePages = tools.map((tool) => ({
    url: `${BASE_URL}/alternatieven/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const voorWieEntries = getAllVoorWie().map((entry) => ({
    url: `${BASE_URL}/beste-voor/${entry.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    { url: `${BASE_URL}/vergelijk`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${BASE_URL}/alternatieven`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${BASE_URL}/beste-voor`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${BASE_URL}/categorie`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 },
    ...toolPages,
    ...categoryPages,
    ...versusEntries,
    ...alternativePages,
    ...voorWieEntries,
  ];
}
