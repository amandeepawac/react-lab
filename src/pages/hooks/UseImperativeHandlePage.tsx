import LessonPage from "@/components/LessonPage";
import { Crosshair, Eraser } from "lucide-react";
import type { Ref } from "react";
import { useImperativeHandle, useRef } from "react";

type InputHandle = { focus: () => void; clear: () => void };

function SearchInput({ ref }: { ref: Ref<InputHandle> }) {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(
    ref,
    () => ({
      focus: () => inputRef.current?.focus(),
      clear: () => {
        if (inputRef.current) inputRef.current.value = "";
      },
    }),
    [],
  );
  return (
    <label className="demo-label">
      Search query
      <input
        ref={inputRef}
        className="field mt-2"
        placeholder="Type something..."
      />
    </label>
  );
}

export default function UseImperativeHandlePage() {
  const searchRef = useRef<InputHandle>(null);
  return (
    <LessonPage
      title="useImperativeHandle"
      summary="Expose a small, intentional API instead of an entire DOM node."
      what="Customizes the handle a parent receives through a child's ref."
      why="Lets reusable inputs or media players expose commands like focus, clear, or play without leaking implementation details."
      how="Receive ref as a prop in React 19. Call useImperativeHandle to return the methods the parent may invoke."
      scenario="The parent can focus or clear a custom search input, but cannot access its internal DOM node through the public handle."
      pitfall="Prefer props for declarative behavior. Imperative handles are an escape hatch for actions such as focus or scrolling. React 19 no longer requires forwardRef for ref props."
      code={`function SearchInput({ ref }) {\n  const inputRef = useRef(null)\n  useImperativeHandle(ref, () => ({\n    focus: () => inputRef.current?.focus(),\n    clear: () => { inputRef.current.value = '' },\n  }), [])\n  return <input ref={inputRef} />\n}\n\nsearchRef.current?.focus()`}
    >
      <SearchInput ref={searchRef} />
      <div className="mt-4 flex gap-3">
        <button className="button" onClick={() => searchRef.current?.focus()}>
          <Crosshair size={15} />
          Focus
        </button>
        <button
          className="button-secondary"
          onClick={() => searchRef.current?.clear()}
        >
          <Eraser size={15} />
          Clear
        </button>
      </div>
    </LessonPage>
  );
}
