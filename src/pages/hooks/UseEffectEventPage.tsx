import LessonPage from "@/components/LessonPage";
import { useEffect, useEffectEvent, useState } from "react";

export default function UseEffectEventPage() {
  const [name, setName] = useState("Ada");
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const onHeartbeat = useEffectEvent(() => {
    setMessages((previous) => [
      ...previous.slice(-3),
      `Heartbeat for ${name} at ${new Date().toLocaleTimeString()}`,
    ]);
  });
  useEffect(() => {
    if (!connected) return;
    const interval = window.setInterval(() => onHeartbeat(), 2000);
    return () => window.clearInterval(interval);
  }, [connected]);

  return (
    <LessonPage
      title="useEffectEvent"
      summary="Read the latest values inside an effect without reconnecting the effect."
      what="Creates an Effect Event whose callback sees current props and state without being a reactive dependency of the effect."
      why="Useful when a subscription must stay connected but a notification should use the latest name, theme, or preferences."
      how="Define an Effect Event and call it only from effects or their callbacks. Keep actual connection dependencies in the effect."
      scenario="Connect the heartbeat, then edit your name. The next message uses the latest name without restarting the interval."
      pitfall="Available in React 19.2. Effect Events are not general event handlers and must not be passed to other components. Do not use them to hide dependencies that should reconnect an effect."
      code={`const onHeartbeat = useEffectEvent(() => {\n  logMessage('Heartbeat for ' + name)\n})\n\nuseEffect(() => {\n  if (!connected) return\n  const timer = setInterval(() => onHeartbeat(), 2000)\n  return () => clearInterval(timer)\n}, [connected])`}
    >
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex-1 text-xs font-semibold">
          Display name
          <input
            className="field mt-2"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <button className="button" onClick={() => setConnected(!connected)}>
          {connected ? "Disconnect" : "Connect"}
        </button>
      </div>
      <ul
        aria-live="polite"
        className="mt-5 space-y-2 font-mono text-xs text-muted"
      >
        {messages.length === 0 ? (
          <li>No heartbeats yet. Connect to begin.</li>
        ) : (
          messages.map((message, index) => (
            <li key={`${index}-${message}`}>{message}</li>
          ))
        )}
      </ul>
    </LessonPage>
  );
}
