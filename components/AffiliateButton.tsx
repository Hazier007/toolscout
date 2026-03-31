import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface AffiliateButtonProps {
  slug: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
}

export function AffiliateButton({
  slug,
  label = "Probeer gratis",
  size = "md",
  variant = "primary",
}: AffiliateButtonProps) {
  return (
    <div>
      <Link
        href={`/go/${slug}`}
        rel="nofollow sponsored"
        target="_blank"
        className={cn(
          "inline-flex items-center gap-2 font-semibold transition-all duration-300 rounded-full",
          variant === "primary"
            ? "bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-400 hover:to-violet-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
            : "bg-white/10 hover:bg-white/15 text-foreground border border-white/10 hover:border-white/20",
          size === "sm" && "px-4 py-2 text-sm",
          size === "md" && "px-6 py-3 text-sm",
          size === "lg" && "px-8 py-4 text-base"
        )}
      >
        {label}
        <ExternalLink className={cn(size === "sm" ? "h-3 w-3" : "h-4 w-4")} />
      </Link>
      <p className="mt-2 text-xs text-muted-foreground">
        * Gesponsorde link. We ontvangen commissie bij aankoop, zonder meerprijs voor jou.
      </p>
    </div>
  );
}
