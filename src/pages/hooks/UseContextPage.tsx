import LessonPage from "@/components/LessonPage";
import { createContext, useContext, useState } from "react";

const AccentContext = createContext("forest");

function PreviewButton() {
  const accent = useContext(AccentContext);
  return (
    <div className="mt-5 border-t border-line pt-5">
      <p className="mb-3 text-xs text-muted">
        A nested component reads the shared accent without a prop.
      </p>
      <span
        className={`inline-block rounded-md px-4 py-2 text-sm font-semibold text-white ${accent === "forest" ? "bg-accent" : "bg-blue-600"}`}
      >
        Current accent: {accent}
      </span>
    </div>
  );
}

export default function UseContextPage() {
  const [accent, setAccent] = useState("forest");
  return (
    <LessonPage
      title="useContext"
      summary="Share a value across a component tree, without passing it through every level."
      what="Reads and subscribes to the nearest matching context provider above the component."
      why="Avoids prop drilling for broadly needed data such as a theme, locale, or signed-in user."
      how="Create a context outside components. Wrap the subtree in its provider and read it with useContext."
      scenario="Change the theme accent. A nested preview reads the new value directly from context."
      pitfall="Every consumer updates when the provided value changes. Context is not automatically a replacement for a state store; keep unrelated values in separate contexts."
      code={`const AccentContext = createContext('forest')\n\nfunction Preview() {\n  const accent = useContext(AccentContext)\n  return <span>{accent}</span>\n}\n\n// React 19 supports context as a provider directly.\n<AccentContext value={accent}><Preview /></AccentContext>`}
    >
      <AccentContext value={accent}>
        <label className="demo-label flex flex-wrap items-center gap-3">
          Theme accent
          <select
            className="field max-w-48"
            value={accent}
            onChange={(event) => setAccent(event.target.value)}
          >
            <option value="forest">Forest</option>
            <option value="blue">Blue</option>
          </select>
        </label>
        <PreviewButton />
      </AccentContext>
    </LessonPage>
  );
}
