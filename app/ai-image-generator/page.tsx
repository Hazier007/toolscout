import { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { getToolsByCategory } from "@/lib/tools";

const title = "Beste AI Image Generator Tools van 2026";
const description =
  "Vergelijk de beste AI image generator tools voor visuals, mockups en marketingbeelden. Ontdek Midjourney, DALL·E, Flux AI en meer.";

const faqs = [
  {
    question: "Wat is de beste AI image generator?",
    answer:
      "Voor pure beeldkwaliteit blijft Midjourney een topkeuze. Zoek je meer gebruiksgemak of integraties, dan zijn DALL·E, Leonardo AI en Adobe Firefly sterke alternatieven.",
  },
  {
    question: "Bestaan er gratis AI image generators?",
    answer:
      "Ja. Stable Diffusion is gratis beschikbaar in verschillende vormen en meerdere tools hebben een freemium plan met credits of beperkte exports.",
  },
  {
    question: "Welke tool is het beste voor commerciële visuals?",
    answer:
      "Let op licentievoorwaarden, exportkwaliteit en merksafety. Firefly en Leonardo AI zijn vaak interessant voor teams die commerciële assets nodig hebben.",
  },
];

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://toolscout.be/ai-image-generator",
  },
  openGraph: {
    title: `${title} | ToolScout`,
    description,
    type: "article",
    url: "https://toolscout.be/ai-image-generator",
  },
};

export default function AiImageGeneratorPage() {
  const tools = getToolsByCategory("ai-beeldgeneratie").slice(0, 6);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SeoLandingPage
        eyebrow="AI beeldgeneratie"
        title="Beste AI image generator tools voor snelle visuals"
        intro="Zoek je een AI image generator voor advertenties, social content, productmockups of creatieve concepten? Op deze pagina vergelijk je de sterkste tools voor 2026 op outputkwaliteit, snelheid, prijsmodel en gebruiksgemak."
        summary="Niet elke AI image generator is geschikt voor dezelfde workflow. Sommige tools blinken uit in artistieke kwaliteit, andere in snelheid, consistente prompts of commerciële bruikbaarheid. Daarom hebben we de beste opties voor makers, marketeers en ondernemers naast elkaar gezet."
        bullets={[
          "Sterke mix van premium en freemium tools voor verschillende budgetten.",
          "Handig voor social visuals, thumbnails, branding, ads en productconcepten.",
          "Gefilterd op gebruiksgemak, beeldkwaliteit, credits en commerciële relevantie.",
          "Ideaal voor België en Nederland: snel vergelijken zonder tientallen tabs open te zetten.",
        ]}
        faqs={faqs}
        tools={tools}
        primaryCtaHref="/categorie/ai-beeldgeneratie"
        primaryCtaLabel="Bekijk alle image tools"
        secondaryCtaHref="/vergelijk/midjourney-vs-dall-e-3"
        secondaryCtaLabel="Vergelijk populaire opties"
      />
    </>
  );
}
