import LessonPage from "@/components/LessonPage";
import { useState } from "react";

const skills = [
  "Effects",
  "State",
  "Transitions",
  "Actions",
  "Context",
  "References",
];

function SkillList({ skills }: { skills: string[] }) {
  return (
    <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
      {skills.map((skill) => (
        <li className="border-b border-line py-2" key={skill}>
          {skill}
        </li>
      ))}
    </ul>
  );
}

export default function CompilerPage() {
  const [query, setQuery] = useState("");
  const [note, setNote] = useState("");
  const filtered = skills.filter((skill) =>
    skill.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <LessonPage
      title="React Compiler"
      summary="Write clear, idiomatic React and let the compiler handle much of the memoization."
      what="A build-time optimizer that automatically memoizes eligible calculations, callbacks, and component rendering while preserving React semantics."
      why="Reduces repetitive useMemo, useCallback, and memo code so performance work doesn't obscure your component logic."
      how="Keep rendering pure, use immutable updates, and follow the Rules of React. This app already enables reactCompilerPreset through the Vite Babel plugin."
      scenario="Filter a skill list with an ordinary derived array. The note is unrelated. No manual memoization is needed; inspect the component in React DevTools or its compiled output to study optimization."
      pitfall="The compiler doesn't fix impure code, replace good architecture, or make network requests faster. It can skip unsupported patterns. Keep explicit memoization where it is actually required and profile real interactions."
      docs="https://react.dev/learn/react-compiler"
      code={`function SkillBrowser() {\n  const [query, setQuery] = useState('')\n  const [note, setNote] = useState('')\n  const filtered = skills.filter(skill =>\n    skill.toLowerCase().includes(query.toLowerCase())\n  )\n  return <SkillList skills={filtered} />\n}\n\n// Vite: babel({ presets: [reactCompilerPreset()] })`}
    >
      <label className="demo-label block">
        Filter skills
        <input
          className="field mt-2"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try state"
        />
      </label>
      <SkillList skills={filtered} />
      {filtered.length === 0 && (
        <p className="mt-4 text-sm text-muted">No matching skills.</p>
      )}
      <label className="mt-5 block text-xs font-semibold">
        Independent note
        <input
          className="field mt-2"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="No manual useMemo or useCallback here"
        />
      </label>
    </LessonPage>
  );
}
