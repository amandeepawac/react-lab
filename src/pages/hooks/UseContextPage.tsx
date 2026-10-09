import LessonPage from "@/components/LessonPage";
import { createContext, useContext, useState } from "react";

type Language = "en" | "es";
const LanguageContext = createContext<Language>("en");
const translations = {
  en: {
    heading: "Your workspace essentials",
    product: "Notebook bundle",
    delivery: "Free standard delivery",
    locale: "en-US",
  },
  es: {
    heading: "Esenciales para tu escritorio",
    product: "Paquete de cuadernos",
    delivery: "Envio estandar gratis",
    locale: "es-ES",
  },
};

function CatalogHeading() {
  const language = useContext(LanguageContext);
  return (
    <h3 className="font-display text-lg font-semibold">
      {translations[language].heading}
    </h3>
  );
}

function ProductSummary() {
  const language = useContext(LanguageContext);
  const text = translations[language];
  return (
    <div className="mt-4 flex flex-wrap justify-between gap-4 border-y border-line py-4">
      <div>
        <p className="demo-label">{text.product}</p>
        <p className="mt-2 text-xs text-muted">{text.delivery}</p>
      </div>
      <output className="font-mono text-xl">
        {new Intl.NumberFormat(text.locale, {
          style: "currency",
          currency: "USD",
        }).format(24)}
      </output>
    </div>
  );
}

export default function UseContextPage() {
  const [language, setLanguage] = useState<Language>("en");
  return (
    <LessonPage
      title="useContext"
      summary="Share a value across a component tree, without passing it through every level."
      what="Reads and subscribes to the nearest matching context provider above the component."
      why="Avoids prop drilling for broadly needed data such as a theme, locale, or signed-in user."
      how="Create a context outside components. Wrap the subtree in its provider and read it with useContext."
      scenario="Choose a language for a small storefront. The heading and product summary read the same preference independently, including localized currency formatting."
      pitfall="Every consumer updates when the provided value changes. Context is not automatically a replacement for a state store; keep unrelated values in separate contexts."
      code={`const LanguageContext = createContext('en')\n\nfunction ProductSummary() {\n  const language = useContext(LanguageContext)\n  return <p>{translations[language].product}</p>\n}\n\n<LanguageContext value={language}>\n  <CatalogHeading />\n  <ProductSummary />\n</LanguageContext>`}
    >
      <LanguageContext value={language}>
        <label className="demo-label flex flex-wrap items-center gap-3">
          Storefront language
          <select
            className="field max-w-48"
            value={language}
            onChange={(event) => setLanguage(event.target.value as Language)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
        </label>
        <div lang={language} className="mt-6">
          <CatalogHeading />
          <ProductSummary />
        </div>
      </LanguageContext>
    </LessonPage>
  );
}
