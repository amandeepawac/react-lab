import LessonPage from "@/components/LessonPage";
import { useState } from "react";
import { Link } from "react-router";

const scenarios = {
  counter: {
    label: "A quantity counter",
    hook: "useState",
    reason:
      "One independent number has a simple update. A reducer would add ceremony without clarifying the behavior.",
    slug: "use-state",
    code: "const [quantity, setQuantity] = useState(1)\nsetQuantity(previous => previous + 1)",
  },
  checkout: {
    label: "A validated multi-step checkout",
    hook: "useReducer",
    reason:
      "Fields, errors, and navigation change together. Named actions keep those transitions consistent.",
    slug: "use-reducer",
    code: "const [checkout, dispatch] = useReducer(reducer, initialCheckout)\ndispatch({ type: 'next' })",
  },
  query: {
    label: "A search input",
    hook: "useState",
    reason:
      "The typed query is independent local state. Results can be derived or loaded without a reducer for the input.",
    slug: "use-state",
    code: "const [query, setQuery] = useState('')\n<input value={query} onChange={event => setQuery(event.target.value)} />",
  },
  editor: {
    label: "An editor with undo history",
    hook: "useReducer",
    reason:
      "Edit, undo, and redo modify related history and current-document fields. A reducer gives each event one coherent transition.",
    slug: "use-reducer",
    code: "const [editor, dispatch] = useReducer(editorReducer, initialEditor)\ndispatch({ type: 'undo' })",
  },
};

export default function StateOrReducerPage() {
  const [scenario, setScenario] = useState<keyof typeof scenarios>("counter");
  const choice = scenarios[scenario];
  return (
    <LessonPage
      title="useState or useReducer?"
      summary="Choose based on how state changes, not how many fields you can count."
      what="Both hooks store component state. useState gives you a setter; useReducer gives you a pure transition function and a dispatch API."
      why="Simple state deserves simple code. Related transitions become easier to reason about when their rules live together."
      how="Start with useState for independent values. Reach for useReducer when events change several related fields or transitions need explicit rules."
      scenario="Choose a real UI task and see which hook is a useful starting point. These are design recommendations, not mandatory rules."
      pitfall="A reducer does not make state global or faster. You can still split independent fields into useState calls. Prefer the version that makes invalid states and update rules easiest to understand."
      docs="https://react.dev/learn/extracting-state-logic-into-a-reducer"
      code={choice.code}
    >
      <label className="demo-label block">
        UI task
        <select
          className="field mt-2"
          value={scenario}
          onChange={(event) =>
            setScenario(event.target.value as keyof typeof scenarios)
          }
        >
          {Object.entries(scenarios).map(([key, item]) => (
            <option key={key} value={key}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <div aria-live="polite" className="mt-5 border-l-2 border-accent pl-4">
        <p className="font-mono text-lg font-semibold">
          Start with {choice.hook}
        </p>
        <p className="mt-2 text-sm leading-6 text-muted">{choice.reason}</p>
        <Link
          className="mt-4 inline-block text-sm font-semibold text-accent"
          to={`/hooks/${choice.slug}`}
        >
          Try the {choice.hook} lesson
        </Link>
      </div>
    </LessonPage>
  );
}
