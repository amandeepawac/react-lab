import LessonPage from "@/components/LessonPage";
import { delay } from "@/lib/demoApi";
import { lazy, Suspense, useState } from "react";

const WorkshopPreview = lazy(async () => {
  await delay(1000);
  return import("@/components/WorkshopPreview");
});

export default function SuspensePage() {
  const [visible, setVisible] = useState(false);
  return (
    <LessonPage
      title="Suspense & lazy"
      summary="Split code into smaller pieces and give waiting a deliberate place in your UI."
      what="lazy defers loading a component module. Suspense displays its fallback while a child suspends."
      why="Reduces initial JavaScript and keeps loading states scoped to the part of the page that is actually waiting."
      how="Declare lazy at module scope using a dynamic import. Render the lazy component inside a Suspense boundary."
      scenario="Load a workshop module on demand. An artificial one-second delay makes the first fallback visible; subsequent openings use the cached module."
      pitfall="Suspense doesn't detect ordinary fetching in an effect. It responds to lazy loading and supported resource reads such as use. Lazy component modules need a default export; rejected imports need an error boundary."
      docs="https://react.dev/reference/react/Suspense"
      code={`const Workshop = lazy(() => import('./Workshop'))\n\nfunction Page() {\n  return <Suspense fallback={<p>Loading workshop...</p>}>\n    <Workshop />\n  </Suspense>\n}`}
    >
      <button className="button" onClick={() => setVisible(!visible)}>
        {visible ? "Hide workshop" : "Load workshop"}
      </button>
      <div className="mt-5 min-h-28">
        {visible ? (
          <Suspense
            fallback={
              <p role="status" className="text-sm text-muted">
                Loading workshop...
              </p>
            }
          >
            <WorkshopPreview />
          </Suspense>
        ) : (
          <p className="text-sm text-muted">Workshop is not mounted.</p>
        )}
      </div>
    </LessonPage>
  );
}
