import Link from "next/link";
import { Sparkles } from "lucide-react";
import { getAllCategories } from "@/lib/tools";

export function Footer() {
  const categories = getAllCategories();

  return (
    <footer className="border-t border-white/10 bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-500">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-[var(--font-display)] text-xl font-bold">ToolScout</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Vind en vergelijk de beste AI tools voor jouw needs. Eerlijke reviews, transparante
              prijzen, onafhankelijk advies.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-[var(--font-display)] text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Categorieën
            </h3>
            <ul className="mt-4 space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categorie/${cat.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {cat.naam}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-[var(--font-display)] text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              ToolScout
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/vergelijk/chatgpt-vs-claude"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Vergelijk tools
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} ToolScout. Alle rechten voorbehouden.
            </p>
            <p className="text-xs text-muted-foreground max-w-md">
              * ToolScout bevat affiliate links. Bij aankoop via onze links ontvangen wij een
              commissie, zonder meerprijs voor jou. Dit helpt ons om deze site gratis aan te bieden.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
