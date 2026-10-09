import LessonPage from "@/components/LessonPage";
import { Crosshair } from "lucide-react";
import { useRef, useState } from "react";

export default function UseRefPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const clicksRef = useRef(0);
  const [snapshot, setSnapshot] = useState(0);
  return (
    <LessonPage
      title="useRef"
      summary="Keep a mutable value or a DOM handle without requesting a render."
      what="Returns a stable object with a mutable current property that persists between renders."
      why="Useful for focusing inputs, storing timer IDs, and keeping non-visual bookkeeping outside state."
      how="Use a ref on a DOM element, or read and update current inside an event handler or effect."
      scenario="Focus the input from another button. Count focus requests in a ref, then explicitly read that counter into state."
      pitfall="Changing current does not rerender the UI. Store values shown on screen in state. Avoid reading or writing refs during rendering, except predictable one-time initialization."
      code={`const inputRef = useRef(null)\nconst requests = useRef(0)\n\nfunction focusInput() {\n  inputRef.current?.focus()\n  requests.current += 1\n}\n\nreturn <input ref={inputRef} />`}
    >
      <label className="demo-label">
        Your name
        <input
          ref={inputRef}
          className="field mt-2"
          placeholder="Focus me from the button"
        />
      </label>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          className="button"
          onClick={() => {
            inputRef.current?.focus();
            clicksRef.current += 1;
          }}
        >
          <Crosshair size={15} />
          Focus input
        </button>
        <button
          className="button-secondary"
          onClick={() => setSnapshot(clicksRef.current)}
        >
          Read ref count
        </button>
      </div>
      <p className="mt-4 text-sm text-muted">
        Last read: {snapshot} focus requests. Focusing alone doesn't update this
        snapshot.
      </p>
    </LessonPage>
  );
}
