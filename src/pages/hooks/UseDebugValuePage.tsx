import LessonPage from "@/components/LessonPage";
import useConnectionStatus from "@/hooks/useConnectionStatus";

export default function UseDebugValuePage() {
  const online = useConnectionStatus();
  return (
    <LessonPage
      title="useDebugValue"
      summary="Give a custom hook a useful label in React DevTools."
      what="Annotates a custom hook's value in the Components panel of React DevTools. It doesn't render anything in the page."
      why="Helps consumers inspect shared hooks such as connection status or a complex store subscription."
      how="Call useDebugValue inside a custom hook. Optionally pass a formatter for expensive labels, evaluated only when inspected."
      scenario="A reusable connection-status hook annotates itself as Online or Offline in DevTools. The page independently renders its returned boolean."
      pitfall="The debug label is only visible in React DevTools, not the browser console or this UI. Use it for shared custom hooks, not every local variable. Browser online status doesn't guarantee a server is reachable."
      code={`function useConnectionStatus() {\n  const online = useSyncExternalStore(\n    subscribe,\n    () => navigator.onLine,\n    () => true,\n  )\n  useDebugValue(online ? 'Online' : 'Offline')\n  return online\n}`}
    >
      <p className="demo-label">Browser connection status</p>
      <p className="mt-4 flex items-center gap-2 text-xl font-semibold">
        <span
          className={`size-2.5 rounded-full ${online ? "bg-accent" : "bg-orange-500"}`}
        />
        {online ? "Online" : "Offline"}
      </p>
      <p className="mt-4 text-sm leading-6 text-muted">
        Inspect UseDebugValuePage in the React DevTools Components panel to see
        the custom hook label. Network emulation can change the browser's
        connection status.
      </p>
    </LessonPage>
  );
}
