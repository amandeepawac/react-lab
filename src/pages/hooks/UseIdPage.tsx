import LessonPage from "@/components/LessonPage";
import { useId } from "react";

function EmailField({ label }: { label: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="demo-label">
        {label}
      </label>
      <input
        id={id}
        type="email"
        className="field mt-2"
        aria-describedby={`${id}-help`}
        placeholder="you@example.com"
      />
      <p id={`${id}-help`} className="mt-2 text-xs text-muted">
        Unique field ID: <span className="font-mono">{id}</span>
      </p>
    </div>
  );
}

export default function UseIdPage() {
  return (
    <LessonPage
      title="useId"
      summary="Create stable, unique IDs for accessible component relationships."
      what="Generates an ID unique to a component instance, with support for matching server and client rendering."
      why="Reusable forms need labels and help text connected to the right input, even when the same component appears several times."
      how="Call useId once and reuse it for htmlFor, id, and related aria-describedby IDs."
      scenario="These two copies of the same email-field component receive different IDs. Clicking each label focuses the correct input."
      pitfall="Do not use useId for list keys. Keys should come from your data. IDs are opaque; don't rely on their format or call this hook inside loops."
      code={`function EmailField() {\n  const id = useId()\n  return <>\n    <label htmlFor={id}>Email</label>\n    <input id={id} aria-describedby={id + '-help'} />\n    <p id={id + '-help'}>Your contact email.</p>\n  </>\n}`}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <EmailField label="Personal email" />
        <EmailField label="Work email" />
      </div>
    </LessonPage>
  );
}
