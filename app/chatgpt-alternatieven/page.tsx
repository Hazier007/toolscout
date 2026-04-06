import { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { getToolBySlug } from "@/lib/tools";

const title = "Beste ChatGPT Alternatieven van 2026";
const description =
  "Op zoek naar een alternatief voor ChatGPT? Vergelijk Claude, Gemini, Copilot, Poe en andere sterke ChatGPT alternatieven op prijs, kwaliteit en use case.";

const faqs = [
  {
    question: "Wat is het beste alternatief voor ChatGPT?",
    answer:
      "Claude is een van de sterkste alternatieven voor wie veel met lange teksten, documenten en nuance werkt. Gemini is interessant als je diep in het Google-ecosysteem zit.",
  },
  {
    question: "Waarom kiezen mensen een ChatGPT alternatief?",
    answer:
      "Meestal omwille van prijs, outputstijl, integraties, betere prestaties voor coderen of documentanalyse, of omdat ze meerdere modellen naast elkaar willen testen.",
  },
  {
    question: "Zijn er gratis alternatieven voor ChatGPT?",
    answer:
      "Ja. Verschillende tools bieden een gratis of freemium plan, zoals Claude, Gemini, Poe en Pi. Let wel op limieten en beschikbare modellen.",
  },
];

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://toolscout.be/chatgpt-alternatieven",
  },
  openGraph: {
    title: `${title} | ToolScout`,
    description,
    type: "article",
    url: "https://toolscout.be/chatgpt-alternatieven",
  },
};

export default function ChatgptAlternatievenPage() {
  const tools = [
    getToolBySlug("claude"),
    getToolBySlug("gemini"),
    getToolBySlug("microsoft-copilot"),
    getToolBySlug("poe"),
    getToolBySlug("pi-ai"),
    getToolBySlug("grok"),
  ].filter(Boolean);

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
        eyebrow="ChatGPT alternatieven"
        title="Beste ChatGPT alternatieven voor wie meer wil dan één model"
        intro="ChatGPT is sterk, maar niet altijd de beste keuze voor elke workflow. Sommige alternatieven zijn beter in documentanalyse, andere in coderen, research, prijs-kwaliteit of gebruik in teams. Hier vind je de beste opties naast elkaar."
        summary="Wie zoekt naar een ChatGPT alternatief wil meestal niet 'meer van hetzelfde', maar een tool die beter past bij een specifieke taak. Daarom focust deze pagina op praktische verschillen: outputstijl, reasoning, prijsmodel, ecosystemen en dagelijkse inzetbaarheid."
        bullets={[
          "Snelle vergelijking van de sterkste alternatieven voor schrijven, research en productiviteit.",
          "Interessant voor ondernemers, marketeers, developers en teams die modelkeuze belangrijk vinden.",
          "Helpt je vermijden dat je te snel vasthangt aan één tool of ecosysteem.",
          "Ideaal als je meerdere AI-assistenten wilt testen voor België en Nederland.",
        ]}
        faqs={faqs}
        tools={tools as NonNullable<(typeof tools)[number]>[]}
        primaryCtaHref="/alternatieven/chatgpt"
        primaryCtaLabel="Bekijk alle ChatGPT alternatieven"
        secondaryCtaHref="/categorie/ai-assistent"
        secondaryCtaLabel="Ga naar AI assistenten"
      />
    </>
  );
}
