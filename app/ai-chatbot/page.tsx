import { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { getToolsByCategory } from "@/lib/tools";

const title = "Beste AI Chatbot Tools van 2026";
const description =
  "Vergelijk de beste AI chatbot tools voor support, sales en productiviteit. Bekijk ChatGPT, Claude, Gemini en andere sterke chatbot-oplossingen.";

const faqs = [
  {
    question: "Wat is de beste AI chatbot voor dagelijks gebruik?",
    answer:
      "ChatGPT en Claude zijn voor de meeste gebruikers de meest complete keuzes. Ze combineren sterke output, brede inzetbaarheid en een laagdrempelige interface.",
  },
  {
    question: "Welke chatbot is het beste voor teams of bedrijven?",
    answer:
      "Kijk dan vooral naar beveiliging, teamfuncties, kennisbronnen en API-mogelijkheden. Claude, Gemini en enterprisevarianten van ChatGPT zijn vaak sterke opties.",
  },
  {
    question: "Zijn AI chatbots ook bruikbaar voor klantenservice?",
    answer:
      "Ja, maar dan moet je letten op handover, integraties en controle over antwoorden. Voor klantgerichte flows zijn gespecialiseerde supporttools soms beter dan algemene chat-assistenten.",
  },
];

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://toolscout.be/ai-chatbot",
  },
  openGraph: {
    title: `${title} | ToolScout`,
    description,
    type: "article",
    url: "https://toolscout.be/ai-chatbot",
  },
};

export default function AiChatbotPage() {
  const tools = getToolsByCategory("ai-assistent").slice(0, 6);

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
        eyebrow="AI chatbot"
        title="Beste AI chatbot tools voor support, research en sneller werken"
        intro="Een goede AI chatbot helpt je sneller schrijven, research doen, ideeën structureren en repetitieve vragen afhandelen. Hier vergelijk je de beste tools voor solo ondernemers, marketeers, developers en teams."
        summary="De beste AI chatbot hangt af van je use case. Sommige tools zijn sterk in reasoning en documentwerk, andere in snelheid, multimodale input of integraties. Daarom focussen we hier op praktische inzetbaarheid in plaats van hype."
        bullets={[
          "Geschikt voor kenniswerk, support, brainstorms, content en dagelijkse productiviteit.",
          "Duidelijk zicht op freemium versus betaalde plannen.",
          "Handig voor wie ChatGPT, Claude, Gemini en alternatieven wil vergelijken zonder ruis.",
          "Sterke keuzehulp voor België en Nederland met focus op bruikbaarheid in echte workflows.",
        ]}
        faqs={faqs}
        tools={tools}
        primaryCtaHref="/categorie/ai-assistent"
        primaryCtaLabel="Bekijk alle chatbot tools"
        secondaryCtaHref="/vergelijk/chatgpt-vs-claude"
        secondaryCtaLabel="Vergelijk ChatGPT en Claude"
      />
    </>
  );
}
