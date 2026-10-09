import LessonPage from "@/components/LessonPage";
import { useDeferredValue, useState } from "react";

const topics = [
  "State",
  "Effects",
  "Context",
  "Refs",
  "Actions",
  "Suspense",
  "Compiler",
  "Transitions",
];
const lessons = Array.from(
  { length: 4000 },
  (_, index) => `${topics[index % topics.length]} workshop ${index + 1}`,
);

function Results({ query }: { query: string }) {
  const matches = lessons.filter((lesson) =>
    lesson.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <p className="mb-3 text-xs text-muted">
        {matches.length.toLocaleString()} matching workshops
      </p>
      <ul className="grid max-h-60 grid-cols-1 gap-2 overflow-y-auto text-xs sm:grid-cols-2">
        {matches.map((lesson) => (
          <li key={lesson} className="border-b border-line py-2">
            {lesson}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function UseDeferredValuePage() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const stale = query !== deferredQuery;
  return (
    <LessonPage
      title="useDeferredValue"
      summary="Let a slower part of the screen catch up with an urgent input."
      what="Returns a deferred version of a value, letting React render dependent UI in the background while keeping the previous result visible."
      why="Useful when typing drives a costly results list or chart and you don't control the code that sets the incoming value."
      how="Update the input normally and give the deferred value to the slower subtree. React Compiler can reuse that subtree when its props haven't changed."
      scenario="Search 4,000 workshop titles. The input receives the current query immediately; the list receives the deferred query. On fast devices the delay may be barely visible."
      pitfall="This is not debouncing: there is no fixed delay, and it doesn't reduce network requests. Use request caching or debouncing separately if needed. The heavy subtree must be able to skip urgent rerenders."
      code={`const [query, setQuery] = useState('')\nconst deferredQuery = useDeferredValue(query)\nconst stale = query !== deferredQuery\n\n<input value={query} onChange={event => setQuery(event.target.value)} />\n<div style={{ opacity: stale ? 0.5 : 1 }}>\n  <Results query={deferredQuery} />\n</div>`}
    >
      <label className="demo-label">
        Search workshops
        <input
          className="field mt-2"
          placeholder="Try context or effects"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <div aria-busy={stale} className={`mt-5 ${stale ? "opacity-50" : ""}`}>
        <Results query={deferredQuery} />
      </div>
    </LessonPage>
  );
}
