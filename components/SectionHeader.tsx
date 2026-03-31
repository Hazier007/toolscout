import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  gradient?: boolean;
  centered?: boolean;
  size?: "sm" | "md" | "lg";
}

export function SectionHeader({
  title,
  subtitle,
  gradient = true,
  centered = true,
  size = "md",
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", centered && "text-center")}>
      <h2
        className={cn(
          "font-[var(--font-display)] font-bold tracking-tight",
          gradient
            ? "bg-gradient-to-r from-white via-blue-100 to-violet-300 bg-clip-text text-transparent"
            : "",
          size === "sm" && "text-2xl md:text-3xl",
          size === "md" && "text-3xl md:text-4xl",
          size === "lg" && "text-4xl md:text-6xl"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-muted-foreground",
            size === "sm" && "text-sm",
            size === "md" && "text-base max-w-2xl",
            size === "lg" && "text-lg max-w-3xl",
            centered && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
