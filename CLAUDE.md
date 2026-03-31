# CLAUDE.md — toolscout.be

> AI tool vergelijker & discovery platform voor de Nederlandstalige markt.
> Gebouwd in Next.js 14 App Router. Deploy via Vercel.

---

## 🎯 Project context

**Wat:** Programmatic SEO affiliate site met AI tool reviews, vergelijkingen en rankings.
**Wie:** Nederlandstalige gebruikers (BE + NL) die op zoek zijn naar het juiste AI tool voor hun use case.
**Toon:** Modern, betrouwbaar, licht tech-savvy — geen hype, wél enthousiast.
**Business model:** Affiliate links (SaaS tools) + featured listings.

---

## 🗂️ Projectstructuur

```
toolscout.be/
├── app/
│   ├── layout.tsx                  # Root layout + metadata
│   ├── page.tsx                    # Homepage
│   ├── categorie/[slug]/page.tsx   # Categorie overzicht
│   ├── tool/[slug]/page.tsx        # Tool review pagina
│   ├── vergelijk/[a]-vs-[b]/page.tsx  # Versus pagina
│   ├── alternatieven/[slug]/page.tsx  # Alternatieven pagina
│   └── beste-voor/[usecase]/page.tsx  # Use-case pagina
├── components/
│   ├── ui/                         # shadcn/ui componenten
│   ├── ToolCard.tsx
│   ├── CompareTable.tsx
│   ├── AffiliateButton.tsx
│   ├── RatingStars.tsx
│   ├── CategoryBadge.tsx
│   └── SearchBar.tsx
├── lib/
│   ├── tools.ts                    # Data laden uit JSON/Airtable
│   ├── metadata.ts                 # SEO metadata generators
│   └── utils.ts
├── data/
│   └── tools.json                  # Lokale database (fase 1)
└── public/
    └── logos/                      # Tool logo's
```

---

## 🎨 Design System

### Filosofie
**Stijl:** Dark-first, premium tech — denk Linear.app meets Vercel.com.
Glassmorphism voor cards. Subtiele gradiënten. Veel witruimte (of donkere ruimte).
Geen generieke AI-look. Geen paars-op-wit. Geen Inter font.

### Kleurenpalet

```css
/* Primair */
--color-bg:           #080B14;   /* Diepdonker navy */
--color-bg-secondary: #0D1117;   /* Kaartachtergrond */
--color-surface:      #ffffff08; /* Glassmorphism */
--color-border:       #ffffff12; /* Subtiele randen */

/* Accenten */
--color-primary:      #3B82F6;   /* Helder blauw */
--color-primary-glow: #3B82F640; /* Glow effect */
--color-secondary:    #8B5CF6;   /* Violet voor gradients */
--color-success:      #10B981;   /* Groen voor badges */
--color-warning:      #F59E0B;   /* Oranje voor scores */

/* Tekst */
--color-text:         #F1F5F9;   /* Hoofdtekst */
--color-text-muted:   #64748B;   /* Subtekst */
--color-text-dimmed:  #334155;   /* Placeholder */
```

### Typography

```css
/* Fonts — laad via next/font */
--font-display: 'Syne', sans-serif;    /* Headlines — sterk, modern */
--font-body:    'DM Sans', sans-serif; /* Body — leesbaar, clean */
--font-mono:    'JetBrains Mono', monospace; /* Code/badges */
```

> Installeer via Google Fonts in layout.tsx. NOOIT Inter, Roboto of Arial gebruiken.

### Spacing & Grid

```css
/* 8px grid — gebruik altijd veelvouden van 8 */
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-6:  24px;
--space-8:  32px;
--space-12: 48px;
--space-16: 64px;
--space-24: 96px;
```

### Border radius
```css
--radius-sm:   6px;
--radius-md:   12px;
--radius-lg:   16px;
--radius-xl:   24px;
--radius-full: 9999px;
```

---

## 🧩 Component regels

### ToolCard
```tsx
// Altijd glassmorphism + hover glow
className="
  bg-white/5 backdrop-blur-md
  border border-white/10
  rounded-xl p-6
  hover:border-blue-500/30 hover:bg-white/8
  hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]
  transition-all duration-300
  group
"
```

### AffiliateButton (primair CTA)
```tsx
// Gradient button met glow
className="
  bg-gradient-to-r from-blue-500 to-violet-500
  hover:from-blue-400 hover:to-violet-400
  text-white font-semibold
  px-6 py-3 rounded-full
  shadow-[0_0_20px_rgba(59,130,246,0.4)]
  hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]
  transition-all duration-300
"
```

### Badges / CategoryBadge
```tsx
// Klein, monospace, kleurgecodeerd per categorie
className="
  font-mono text-xs uppercase tracking-wider
  px-3 py-1 rounded-full
  bg-blue-500/15 text-blue-400
  border border-blue-500/20
"
```

### Section headers
```tsx
// Gradient tekst voor H1/H2
className="
  text-4xl md:text-6xl font-bold
  font-display
  bg-gradient-to-r from-white via-blue-100 to-violet-300
  bg-clip-text text-transparent
"
```

---

## ✨ Animaties

Gebruik **Framer Motion** voor:
- Page transitions (fade + slight Y movement)
- Card reveals bij scroll (staggered, delay per index)
- Hover states op cards

```tsx
// Standaard card entrance animatie
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" }
  })
}
```

**Regels:**
- Geen animatie langer dan 400ms
- Altijd `ease-out` of `spring`
- Nooit animaties die de gebruiker blokkeren
- `prefers-reduced-motion` altijd respecteren

---

## 📐 Pagina layouts

### Homepage hero
- Grote gradient headline
- Subline met muted tekst
- Zoekbalk centraal (prominent)
- Achtergrond: subtiel grid patroon of dot grid met radiale gradient overlay

### ToolCard grid
- 3 kolommen desktop, 2 tablet, 1 mobiel
- `gap-6` tussen cards
- Lazy load met Intersection Observer

### Vergelijkingspagina
- Sticky header met tool namen
- Tabel met feature rijen
- Groen vinkje / rood kruisje per feature
- Duidelijke winner badge bovenaan

---

## 🔍 SEO regels

### Metadata per template
```tsx
// Altijd dynamische metadata genereren
export async function generateMetadata({ params }) {
  return {
    title: `${tool.name} Review 2025 — Eerlijk & Onafhankelijk | ToolScout`,
    description: `Lees onze review van ${tool.name}. Prijzen, features, voor- en nadelen. 
                  Inclusief beste alternatieven.`,
    openGraph: { ... },
    alternates: { canonical: `https://toolscout.be/tool/${params.slug}` }
  }
}
```

### Structured data (JSON-LD)
Voeg altijd toe aan tool review pagina's:
- `SoftwareApplication` schema
- `Review` schema
- `FAQPage` schema (onderaan elke pagina)

### Interne linking
- Elke tool pagina linkt naar 3 alternatieven
- Elke categoriepagina linkt naar top 5 tools
- Vergelijkingspagina's crosslinken naar individuele reviews

---

## 🔗 Affiliate links

```tsx
// Gebruik altijd redirect via eigen domein
// NOOIT directe affiliate URL in href

<a href="/go/toolnaam" rel="nofollow sponsored" target="_blank">
  Probeer gratis →
</a>

// /go/[slug] → redirect naar affiliate URL (via Next.js route handler)
```

Voeg altijd een disclaimer toe onder affiliate buttons:
```tsx
<p className="text-xs text-muted-foreground mt-2">
  * Gesponsorde link. We ontvangen commissie bij aankoop, zonder meerprijs voor jou.
</p>
```

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "tailwindcss": "3.x",
    "framer-motion": "^11",
    "lucide-react": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest",
    "next-themes": "latest"
  },
  "devDependencies": {
    "@types/node": "latest",
    "@types/react": "latest",
    "typescript": "5.x"
  }
}
```

### shadcn/ui componenten (installeer bij opstart)
```bash
npx shadcn@latest add button card badge input
npx shadcn@latest add tabs table tooltip
npx shadcn@latest add sheet dialog
```

---

## 🚫 Verboden

- ❌ Geen `style={{ }}` inline styles — altijd Tailwind classes
- ❌ Geen standaard Tailwind grijs als primaire kleur
- ❌ Geen component zonder hover state
- ❌ Geen pagina zonder `generateMetadata()`
- ❌ Geen directe affiliate URLs in de HTML
- ❌ Nooit Inter, Roboto of Arial als font
- ❌ Geen `<img>` tags — altijd `next/image`
- ❌ Geen hardcoded tekst in componenten — altijd props

---

## ✅ Checklist nieuwe pagina

Elke nieuwe pagina moet hebben:
- [ ] `generateMetadata()` met title + description + OG
- [ ] JSON-LD structured data
- [ ] Canonical URL
- [ ] Framer Motion entrance animatie
- [ ] Mobile responsive (test op 375px)
- [ ] Dark mode werkt correct
- [ ] Affiliate link via `/go/` redirect
- [ ] Interne links naar gerelateerde pagina's
- [ ] FAQPage sectie onderaan

---

## 🌐 Deployment

- **Platform:** Vercel
- **Branch:** `main` → productie, `dev` → preview
- **Env vars:** `AIRTABLE_API_KEY`, `NEXT_PUBLIC_SITE_URL`
- **Analytics:** Vercel Analytics (ingebouwd) + optioneel Plausible

---

*Laatste update: toolscout.be v1.0 — Bart*