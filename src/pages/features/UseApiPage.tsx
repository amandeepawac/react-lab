import LessonPage from "@/components/LessonPage";
import { delay } from "@/lib/demoApi";
import { Suspense, use, useState } from "react";

async function loadProfile(name: string) {
  await delay(1000);
  return {
    name,
    role: name === "Ada" ? "Computing pioneer" : "Compiler pioneer",
  };
}
const initialProfile = loadProfile("Ada");

function Profile({ promise }: { promise: ReturnType<typeof loadProfile> }) {
  const profile = use(promise);
  return (
    <div className="border-l-2 border-accent pl-4">
      <h3 className="font-display text-xl font-semibold">{profile.name}</h3>
      <p className="mt-1 text-sm text-muted">{profile.role}</p>
    </div>
  );
}

export default function UseApiPage() {
  const [profilePromise, setProfilePromise] = useState(initialProfile);
  return (
    <LessonPage
      title="use"
      summary="Read a resource during rendering and let Suspense handle the wait."
      what="Reads a Promise or context. A pending Promise suspends the component; a rejected one is handled by an error boundary."
      why="Lets a component express the data it needs without manually managing loading flags. It can also read context conditionally."
      how="Pass a stable Promise to use inside a component under Suspense, or pass a context. Unlike hooks, use may be called inside conditions and loops."
      scenario="Load Ada or Grace from a simulated one-second request. The Promise is created outside rendering and passed to a small resource-reading component."
      pitfall="use is a React API, not a conventional hook. Do not create a new Promise on each render. Production data fetching should use a Suspense-aware framework or cache. Vite alone does not provide React Server Components."
      code={`function Profile({ promise }) {\n  const profile = use(promise)\n  return <h2>{profile.name}</h2>\n}\n\n// Create a stable Promise in an event handler, not render.\nsetProfilePromise(loadProfile('Grace'))\n\n<Suspense fallback={<p>Loading profile...</p>}>\n  <Profile promise={profilePromise} />\n</Suspense>`}
    >
      <div className="mb-5 flex flex-wrap gap-2">
        {["Ada", "Grace"].map((name) => (
          <button
            className="button-secondary"
            key={name}
            onClick={() => setProfilePromise(loadProfile(name))}
          >
            Load {name}
          </button>
        ))}
      </div>
      <div className="min-h-20">
        <Suspense
          fallback={
            <p role="status" className="text-sm text-muted">
              Loading profile...
            </p>
          }
        >
          <Profile promise={profilePromise} />
        </Suspense>
      </div>
    </LessonPage>
  );
}
