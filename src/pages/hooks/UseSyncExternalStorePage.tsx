import LessonPage from "@/components/LessonPage";
import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}
const getSnapshot = () => window.innerWidth;
const getServerSnapshot = () => 1024;

export default function UseSyncExternalStorePage() {
  const width = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <LessonPage
      title="useSyncExternalStore"
      summary="Read an external source without inconsistent snapshots during concurrent rendering."
      what="Subscribes to a store outside React and rerenders when its snapshot changes."
      why="Useful for browser APIs and existing stores. It coordinates external subscriptions with React's concurrent rendering."
      how="Provide a stable subscribe function, a getSnapshot function, and a getServerSnapshot when server rendering is supported."
      scenario="The browser owns the viewport width. Resize the window and the snapshot updates through a resize-event subscription."
      pitfall="Snapshots must be cached or primitive, not a fresh object on every read. Return an unsubscribe function. The server snapshot must match the initial client snapshot during hydration; this Vite app is client-rendered."
      code={`function subscribe(callback) {\n  window.addEventListener('resize', callback)\n  return () => window.removeEventListener('resize', callback)\n}\n\nconst width = useSyncExternalStore(\n  subscribe,\n  () => window.innerWidth,\n  () => 1024,\n)`}
    >
      <p className="demo-label">Browser viewport</p>
      <output className="mt-3 block font-mono text-4xl">
        {width}
        <span className="ml-2 text-base text-muted">px</span>
      </output>
      <p className="mt-4 text-sm text-muted">
        {width < 768 ? "Compact layout" : "Wide layout"} · Resize your window to
        change this external snapshot.
      </p>
    </LessonPage>
  );
}
