import LessonPage from "@/components/LessonPage";
import { Plus } from "lucide-react";
import { memo, useCallback, useState } from "react";

const AddButton = memo(function AddButton({ onAdd }: { onAdd: () => void }) {
  return (
    <button className="button" onClick={onAdd}>
      <Plus size={15} />
      Add to basket
    </button>
  );
});

export default function UseCallbackPage() {
  const [count, setCount] = useState(0);
  const [note, setNote] = useState("");
  const addItem = useCallback(() => setCount((previous) => previous + 1), []);
  return (
    <LessonPage
      title="useCallback"
      summary="Keep a function's identity stable when a consumer needs it."
      what="Caches a function reference until one of its dependencies changes; it does not cache the function's result."
      why="Can help memoized children skip rerenders or stabilize a dependency. React Compiler generally removes the need for manual callback memoization."
      how="Wrap the function and declare all reactive dependencies. Use a functional state update when only the previous state is needed."
      scenario="A memoized basket button receives a stable callback. Editing the unrelated note doesn't change that callback's identity."
      pitfall="Wrapping every event handler in useCallback adds noise without an automatic benefit. Missing dependencies cause stale closures. This explicit example teaches the hook for codebases without the compiler."
      code={`const AddButton = memo(function AddButton({ onAdd }) {\n  return <button onClick={onAdd}>Add to basket</button>\n})\n\nconst addItem = useCallback(() => {\n  setCount(previous => previous + 1)\n}, [])\n\n<AddButton onAdd={addItem} />`}
    >
      <div className="flex flex-wrap items-center gap-4">
        <AddButton onAdd={addItem} />
        <output className="font-mono text-lg">{count} items</output>
      </div>
      <label className="mt-5 block text-xs font-semibold">
        Unrelated note
        <input
          className="field mt-2"
          placeholder="Type without changing the callback"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </label>
    </LessonPage>
  );
}
