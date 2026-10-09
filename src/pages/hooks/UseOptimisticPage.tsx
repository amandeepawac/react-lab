import LessonPage from "@/components/LessonPage";
import { delay } from "@/lib/demoApi";
import { Check, Pencil, X } from "lucide-react";
import { useOptimistic, useState, useTransition } from "react";

type Task = { id: string; text: string; done: boolean; pending?: boolean };
type Update = { id: string; text?: string; done?: boolean };
const initialTasks: Task[] = [
  { id: "checkout", text: "Build a checkout reducer", done: false },
  { id: "cleanup", text: "Practice effect cleanup", done: true },
];

export default function UseOptimisticPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [error, setError] = useState("");
  const [fail, setFail] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [pending, startTransition] = useTransition();
  const [optimisticTasks, updateOptimistic] = useOptimistic(
    tasks,
    (current, update: Update) =>
      current.map((task) =>
        task.id === update.id ? { ...task, ...update, pending: true } : task,
      ),
  );

  function saveTask(update: Update) {
    if (update.text !== undefined && !update.text.trim()) {
      setError("Task title cannot be empty.");
      return;
    }
    const shouldFail = fail;
    setError("");
    setEditing(null);
    startTransition(async () => {
      updateOptimistic(update);
      await delay(1000);
      if (shouldFail) {
        setError(
          "Save failed. The task was rolled back to its confirmed value. Try again with failure switched off.",
        );
        return;
      }
      startTransition(() =>
        setTasks((current) =>
          current.map((task) =>
            task.id === update.id ? { ...task, ...update } : task,
          ),
        ),
      );
    });
  }

  return (
    <LessonPage
      title="useOptimistic"
      summary="Show the expected result immediately while an action is still in flight."
      what="Layers temporary optimistic state over confirmed state during an action, then reconciles with the actual result."
      why="Makes sending messages, liking a post, or editing a record feel responsive without pretending the request has already succeeded."
      how="Provide confirmed state and a pure update function. Add optimistic updates inside an action or transition, then commit the confirmed result."
      scenario="Rename or complete a learning task. The update appears immediately, then a local one-second save confirms it. Switch on failure to see the original title or completion state restored."
      pitfall="Optimistic updates must happen in an action or transition. Updates are applied to confirmed state again during reconciliation, so the update function should safely handle that rebase. This demo matches by stable ID and disables overlapping saves."
      code={`const [optimisticTasks, updateOptimistic] = useOptimistic(\n  tasks,\n  (current, update) => current.map(task =>\n    task.id === update.id ? { ...task, ...update, pending: true } : task\n  ),\n)\n\nstartTransition(async () => {\n  updateOptimistic(update)\n  await saveTask(update)\n  startTransition(() => setTasks(current =>\n    current.map(task => task.id === update.id ? { ...task, ...update } : task)\n  ))\n})`}
    >
      <label className="flex items-center gap-2 text-xs text-muted">
        <input
          type="checkbox"
          checked={fail}
          disabled={pending}
          onChange={(event) => setFail(event.target.checked)}
        />
        Simulate save failure
      </label>
      <ul
        aria-live="polite"
        aria-busy={pending}
        className="mt-4 divide-y divide-line"
      >
        {optimisticTasks.map((task) => (
          <li key={task.id} className="flex flex-wrap items-center gap-3 py-4">
            <input
              type="checkbox"
              aria-label={`Complete ${task.text}`}
              checked={task.done}
              disabled={pending || editing !== null}
              onChange={(event) =>
                saveTask({ id: task.id, done: event.target.checked })
              }
            />
            {editing === task.id ? (
              <form
                className="flex min-w-0 flex-1 flex-wrap gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  saveTask({ id: task.id, text: draft.trim() });
                }}
              >
                <input
                  className="field min-w-32 flex-1"
                  aria-label="Task title"
                  value={draft}
                  maxLength={120}
                  onChange={(event) => setDraft(event.target.value)}
                  autoFocus
                />
                <button
                  type="submit"
                  className="icon-button"
                  aria-label="Save task title"
                  title="Save task title"
                >
                  <Check size={16} />
                </button>
                <button
                  type="button"
                  className="icon-button"
                  aria-label="Cancel edit"
                  title="Cancel edit"
                  onClick={() => setEditing(null)}
                >
                  <X size={16} />
                </button>
              </form>
            ) : (
              <>
                <span
                  className={`min-w-0 flex-1 wrap-anywhere text-sm ${task.done ? "text-muted line-through" : ""}`}
                >
                  {task.text}
                </span>
                {task.pending && <span className="badge">Saving...</span>}
                <button
                  className="icon-button"
                  disabled={pending || editing !== null}
                  aria-label={`Edit ${task.text}`}
                  title="Edit task"
                  onClick={() => {
                    setEditing(task.id);
                    setDraft(task.text);
                    setError("");
                  }}
                >
                  <Pencil size={15} />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <p role="alert" className="mt-3 text-sm text-red-700">
        {error}
      </p>
    </LessonPage>
  );
}
