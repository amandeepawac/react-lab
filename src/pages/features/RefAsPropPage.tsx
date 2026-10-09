import LessonPage from "@/components/LessonPage";
import { Crosshair } from "lucide-react";
import type { Ref } from "react";
import { useRef } from "react";

function NameInput({ ref }: { ref: Ref<HTMLInputElement> }) {
  return (
    <label className="demo-label block">
      Your name
      <input
        ref={ref}
        className="field mt-2"
        placeholder="A ref passes through this component"
      />
    </label>
  );
}

export default function RefAsPropPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <LessonPage
      title="Ref as a prop"
      summary="Pass refs through function components without a forwardRef wrapper."
      what="In React 19, function components can receive ref as a prop and forward it to a DOM element or customize it with useImperativeHandle."
      why="Simplifies reusable input components and removes a layer of wrapping that was required in earlier React versions."
      how="Include ref in the component's TypeScript props and pass it to the target element. The parent uses useRef as usual."
      scenario="A parent button focuses the DOM input inside a custom NameInput component. There is no forwardRef call."
      pitfall="A ref is an escape hatch, not reactive state. Class components still use refs to expose their instance. Don't read ref.current during rendering or rely on ref changes to update the UI."
      docs="https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop"
      code={`type Props = { ref: Ref<HTMLInputElement> }\n\nfunction NameInput({ ref }: Props) {\n  return <input ref={ref} />\n}\n\nconst inputRef = useRef<HTMLInputElement>(null)\n<NameInput ref={inputRef} />\n\ninputRef.current?.focus()`}
    >
      <NameInput ref={inputRef} />
      <button className="button mt-4" onClick={() => inputRef.current?.focus()}>
        <Crosshair size={15} />
        Focus the nested input
      </button>
    </LessonPage>
  );
}
