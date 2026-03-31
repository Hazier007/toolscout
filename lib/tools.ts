import toolsData from "@/data/tools.json";

export interface ToolFeatures {
  gratis_plan: boolean;
  api_beschikbaar: boolean;
  nederlandstalig: boolean;
  mobiele_app: boolean;
  browser_extensie: boolean;
  team_functies: boolean;
}

export interface Tool {
  id: string;
  naam: string;
  slug: string;
  tagline: string;
  beschrijving: string;
  categorie: string;
  categorie_slug: string;
  prijs_model: "Gratis" | "Freemium" | "Betaald";
  prijs_vanaf: number;
  prijs_pro: number;
  rating: number;
  reviews_aantal: number;
  voor_wie: string[];
  use_cases: string[];
  features: ToolFeatures;
  voor: string[];
  tegen: string[];
  affiliate_url: string;
  website: string;
  logo: string;
  alternativen: string[];
  featured: boolean;
  nieuw: boolean;
  verified: boolean;
}

export interface Category {
  naam: string;
  slug: string;
  aantal: number;
}

const tools: Tool[] = toolsData as Tool[];

export function getAllTools(): Tool[] {
  return tools;
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return tools.filter((t) => t.categorie_slug === categorySlug);
}

export function getFeaturedTools(): Tool[] {
  return tools.filter((t) => t.featured);
}

export function getRelatedTools(tool: Tool, n: number = 3): Tool[] {
  const alternativeTools = tool.alternativen
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter(Boolean) as Tool[];

  if (alternativeTools.length >= n) {
    return alternativeTools.slice(0, n);
  }

  const sameCategoryTools = tools.filter(
    (t) =>
      t.categorie_slug === tool.categorie_slug &&
      t.slug !== tool.slug &&
      !tool.alternativen.includes(t.slug)
  );

  return [...alternativeTools, ...sameCategoryTools].slice(0, n);
}

export function getAllCategories(): Category[] {
  const categoryMap = new Map<string, { naam: string; slug: string; aantal: number }>();

  for (const tool of tools) {
    const existing = categoryMap.get(tool.categorie_slug);
    if (existing) {
      existing.aantal++;
    } else {
      categoryMap.set(tool.categorie_slug, {
        naam: tool.categorie,
        slug: tool.categorie_slug,
        aantal: 1,
      });
    }
  }

  return Array.from(categoryMap.values());
}

export function generateVersusSlug(a: string, b: string): string {
  return [a, b].sort().join("-vs-");
}

export function parseVersusSlug(slug: string): { a: string; b: string } | null {
  const match = slug.match(/^(.+)-vs-(.+)$/);
  if (!match) return null;
  return { a: match[1], b: match[2] };
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export interface VoorWieEntry {
  label: string;
  slug: string;
  aantal: number;
}

export function getAllVoorWie(): VoorWieEntry[] {
  const map = new Map<string, { label: string; slug: string; aantal: number }>();

  for (const tool of tools) {
    for (const vw of tool.voor_wie) {
      const slug = slugify(vw);
      const existing = map.get(slug);
      if (existing) {
        existing.aantal++;
      } else {
        map.set(slug, { label: vw, slug, aantal: 1 });
      }
    }
  }

  return Array.from(map.values()).sort((a, b) => b.aantal - a.aantal);
}

export function getToolsByVoorWie(slug: string): Tool[] {
  return tools.filter((t) => t.voor_wie.some((vw) => slugify(vw) === slug));
}

export function getVoorWieLabel(slug: string): string | undefined {
  for (const tool of tools) {
    for (const vw of tool.voor_wie) {
      if (slugify(vw) === slug) return vw;
    }
  }
  return undefined;
}
