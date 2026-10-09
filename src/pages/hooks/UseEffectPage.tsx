import LessonPage from "@/components/LessonPage";
import { delay } from "@/lib/demoApi";
import { RotateCcw, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

const workshops = [
  "State snapshots",
  "State machines with reducers",
  "Effect cleanup",
  "Context and preferences",
  "Refs and focus",
  "Form Actions",
  "Optimistic interfaces",
  "React Compiler",
];
type Result = { key: string; items: string[]; error: string };

export default function UseEffectPage() {
  const [input, setInput] = useState("");
  const [fail, setFail] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<Result>({
    key: "",
    items: [],
    error: "",
  });
  const query = input.trim().toLowerCase();
  const requestKey = JSON.stringify([query, fail, attempt]);
  const loading = !!query && result.key !== requestKey;

  useEffect(() => {
    if (!query) return;
    const controller = new AbortController();
    async function search() {
      try {
        await delay(650, controller.signal);
        if (controller.signal.aborted) return;
        if (fail)
          throw new Error(
            "Simulated service unavailable. Turn off failure and retry.",
          );
        setResult({
          key: requestKey,
          items: workshops.filter((workshop) =>
            workshop.toLowerCase().includes(query),
          ),
          error: "",
        });
      } catch (error) {
        if (!controller.signal.aborted)
          setResult({
            key: requestKey,
            items: [],
            error: error instanceof Error ? error.message : "Search failed.",
          });
      }
    }
    void search();
    return () => controller.abort();
  }, [query, fail, requestKey]);

  return (
    <LessonPage
      title="useEffect"
      summary="Keep your component synchronized with something outside React."
      what="Runs a setup after a commit and cleans it up before a changed dependency reruns it or the component unmounts."
      why="A search request must follow the current query, and an old response must not overwrite a newer one. Cleanup handles that lifecycle."
      how="Start the request in an effect with an AbortController. Pass its signal to the request and abort it during cleanup."
      scenario="Search the workshop catalog through a local 650 ms service simulation. Type a new query while loading to cancel the old request, clear to cancel, or simulate a failure and retry."
      pitfall="This local timer models a request; production code would use fetch(url, { signal }). Cleanup runs before changed dependencies and on unmount. Do not move pure filtering into an effect unless it belongs to the external request, as in this simulation."
      code={`useEffect(() => {\n  const controller = new AbortController()\n  fetch('/api/workshops?q=' + encodeURIComponent(query), {\n    signal: controller.signal,\n  })\n    .then(response => {\n      if (!response.ok) throw new Error('Search failed')\n      return response.json()\n    })\n    .then(items => {\n      if (!controller.signal.aborted) setItems(items)\n    })\n    .catch(error => {\n      if (!controller.signal.aborted) setError(error.message)\n    })\n  return () => controller.abort()\n}, [query])`}
    >
      <label className="demo-label block">
        Search workshops
        <div className="mt-2 flex items-center gap-3">
          <Search size={17} className="shrink-0 text-muted" />
          <input
            className="field"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Try state, context, or refs"
          />
          <button
            className="icon-button"
            type="button"
            aria-label="Clear search"
            title="Clear search"
            disabled={!input}
            onClick={() => setInput("")}
          >
            <X size={16} />
          </button>
        </div>
      </label>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-xs text-muted">
          <input
            type="checkbox"
            checked={fail}
            onChange={(event) => setFail(event.target.checked)}
          />
          Simulate service failure
        </label>
        <button
          className="button-secondary"
          disabled={!query || loading}
          onClick={() => setAttempt((previous) => previous + 1)}
        >
          <RotateCcw size={14} />
          Retry search
        </button>
      </div>
      <div className="mt-5 min-h-24" aria-busy={loading}>
        <p role="status" className="text-sm text-muted">
          {!query
            ? "Enter a query to begin."
            : loading
              ? "Searching... Previous request cancelled when the query changes."
              : !result.error
                ? `${result.items.length} workshop${result.items.length === 1 ? "" : "s"} found.`
                : "Search could not finish."}
        </p>
        {query && !loading && result.error && (
          <p role="alert" className="mt-3 text-sm text-red-700">
            {result.error}
          </p>
        )}
        {query && !loading && !result.error && (
          <ul className="mt-3 divide-y divide-line text-sm">
            {result.items.map((item) => (
              <li key={item} className="py-3">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </LessonPage>
  );
}
