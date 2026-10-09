import LessonPage from "@/components/LessonPage";
import { useRef, useState } from "react";

export default function StateOrRefPage() {
  const [count, setCount] = useState(0);
  const requests = useRef(0);
  const [snapshot, setSnapshot] = useState(0);
  return (
    <LessonPage
      title="State or refs?"
      summary="If a change belongs on screen, React needs to know about it."
      what="State is a render snapshot with queued updates. A ref is a stable mutable container that React does not observe for rerendering."
      why="Putting visual data in a ref leaves the UI stale. Putting non-visual handles in state creates unnecessary renders."
      how="Use state for selected items, form values, and counters shown on screen. Use refs for DOM nodes, timers, and bookkeeping read in handlers."
      scenario="Increment state and see its output update. Record a ref request: its displayed snapshot stays unchanged until you explicitly read it into state."
      pitfall="Even an unrelated rerender should not be used to expose a ref's current value. Read or write refs in handlers and effects, not in render. The ref output here deliberately shows a state snapshot."
      docs="https://react.dev/learn/referencing-values-with-refs"
      code={`const [count, setCount] = useState(0)\nconst requests = useRef(0)\nconst [snapshot, setSnapshot] = useState(0)\n\nsetCount(previous => previous + 1)\nrequests.current += 1\n\n// Only the explicit read updates the visual snapshot.\nsetSnapshot(requests.current)`}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <section>
          <h3 className="demo-label">Reactive state</h3>
          <output className="my-4 block font-mono text-3xl">{count}</output>
          <button
            className="button"
            onClick={() => setCount((previous) => previous + 1)}
          >
            Increment state
          </button>
        </section>
        <section>
          <h3 className="demo-label">Last ref snapshot</h3>
          <output className="my-4 block font-mono text-3xl">{snapshot}</output>
          <div className="flex flex-wrap gap-2">
            <button
              className="button-secondary"
              onClick={() => {
                requests.current += 1;
              }}
            >
              Record ref request
            </button>
            <button
              className="button-secondary"
              onClick={() => setSnapshot(requests.current)}
            >
              Read snapshot
            </button>
          </div>
        </section>
      </div>
    </LessonPage>
  );
}
