import LessonPage from "@/components/LessonPage";
import SubmitButton from "@/components/SubmitButton";
import { delay } from "@/lib/demoApi";
import { useOptimistic, useState } from "react";

type Message = { id: string; text: string; pending?: boolean };
const initialMessages: Message[] = [
  { id: "welcome", text: "Welcome to the lab!" },
];

export default function UseOptimisticPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [error, setError] = useState("");
  const [optimisticMessages, addOptimistic] = useOptimistic(
    messages,
    (current, message: Message) => [...current, { ...message, pending: true }],
  );
  async function sendMessage(formData: FormData) {
    const text = String(formData.get("message") ?? "").trim();
    if (!text) {
      setError("Write a message first.");
      return;
    }
    const message = { id: crypto.randomUUID(), text };
    setError("");
    addOptimistic(message);
    await delay(1200);
    if (formData.has("fail")) {
      setError(
        "Simulated request failed. The optimistic message was rolled back.",
      );
      return;
    }
    setMessages((current) => [...current, message]);
  }

  return (
    <LessonPage
      title="useOptimistic"
      summary="Show the expected result immediately while an action is still in flight."
      what="Layers temporary optimistic state over confirmed state during an action, then reconciles with the actual result."
      why="Makes sending messages, liking a post, or editing a record feel responsive without pretending the request has already succeeded."
      how="Provide confirmed state and a pure update function. Add optimistic updates inside an action or transition, then commit the confirmed result."
      scenario="Send a message to a simulated service. It appears immediately with a sending label. Check the failure option to see automatic rollback after 1.2 seconds."
      pitfall="An optimistic update must happen in an action or transition. Always handle failure and update the confirmed source of truth on success. Optimism is not a replacement for backend validation."
      code={`const [optimistic, addOptimistic] = useOptimistic(\n  messages,\n  (current, message) => [...current, { ...message, pending: true }],\n)\n\nasync function send(formData) {\n  const message = { id: crypto.randomUUID(), text: formData.get('message') }\n  addOptimistic(message)\n  await saveMessage(message)\n  setMessages(current => [...current, message])\n}\n\n<form action={send}>...</form>`}
    >
      <ul aria-live="polite" className="mb-5 max-h-64 space-y-2 overflow-auto">
        {optimisticMessages.map((message) => (
          <li
            key={message.id}
            className={`flex flex-wrap items-center justify-between gap-2 border-b border-line py-3 text-sm ${message.pending ? "text-muted" : ""}`}
          >
            <span className="min-w-0 break-words">{message.text}</span>
            {message.pending && <span className="badge">Sending...</span>}
          </li>
        ))}
      </ul>
      <form action={sendMessage} className="space-y-3">
        <label className="demo-label block">
          Message
          <input
            name="message"
            className="field mt-2"
            placeholder="What are you learning?"
            required
            maxLength={160}
          />
        </label>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-xs text-muted">
            <input name="fail" type="checkbox" />
            Simulate request failure
          </label>
          <SubmitButton label="Send message" />
        </div>
      </form>
      <p role="alert" className="mt-3 text-sm text-red-700">
        {error}
      </p>
    </LessonPage>
  );
}
