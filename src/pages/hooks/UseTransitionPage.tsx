import LessonPage from "@/components/LessonPage";
import { delay } from "@/lib/demoApi";
import { useState, useTransition } from "react";

const collections = {
  Essentials: ["State & snapshots", "Thinking in components", "Effect cleanup"],
  Advanced: [
    "Concurrent rendering",
    "Actions & optimistic UI",
    "External store subscriptions",
  ],
};
type Collection = keyof typeof collections;

export default function UseTransitionPage() {
  const [selected, setSelected] = useState<Collection>("Essentials");
  const [pending, startTransition] = useTransition();
  const [note, setNote] = useState("");
  function changeCollection(collection: Collection) {
    startTransition(async () => {
      await delay(700);
      startTransition(() => setSelected(collection));
    });
  }
  return (
    <LessonPage
      title="useTransition"
      summary="Mark an update as non-urgent and keep the rest of the interface responsive."
      what="Returns an isPending flag and a startTransition function for scheduling interruptible, lower-priority updates."
      why="Keeps urgent interactions usable while switching views or performing an async action. Existing content can remain visible instead of flashing away."
      how="Wrap the non-urgent update in startTransition. Keep controlled text-input updates outside transitions."
      scenario="Switch between course collections with a simulated 700 ms request. The current collection stays visible and the note input remains usable."
      pitfall="Transitions do not make work faster or move it off the main thread. Updates after an await currently need another startTransition. Real requests also need race handling; these tabs disable new requests while pending."
      code={`const [isPending, startTransition] = useTransition()\n\nfunction selectCollection(collection) {\n  startTransition(async () => {\n    const data = await fetchCollection(collection)\n    startTransition(() => setCollection(data))\n  })\n}\n\n// Urgent text input stays outside the transition.\n<input onChange={event => setNote(event.target.value)} />`}
    >
      <div className="flex gap-2" role="group" aria-label="Course collection">
        {(Object.keys(collections) as Collection[]).map((collection) => (
          <button
            key={collection}
            disabled={pending}
            aria-pressed={selected === collection}
            className={selected === collection ? "button" : "button-secondary"}
            onClick={() => changeCollection(collection)}
          >
            {collection}
          </button>
        ))}
      </div>
      <div
        aria-busy={pending}
        className={`mt-5 transition-opacity ${pending ? "opacity-50" : ""}`}
      >
        <h3 className="demo-label">{selected}</h3>
        <ul className="mt-3 space-y-2 text-sm text-muted">
          {collections[selected].map((course) => (
            <li key={course}>{course}</li>
          ))}
        </ul>
      </div>
      <p role="status" className="mt-3 min-h-5 text-xs text-accent">
        {pending ? "Loading the next collection..." : "Collection ready"}
      </p>
      <label className="mt-4 block text-xs font-semibold">
        Your note
        <input
          className="field mt-2"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Still responsive during the transition"
        />
      </label>
    </LessonPage>
  );
}
