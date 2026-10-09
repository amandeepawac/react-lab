import LessonPage from "@/components/LessonPage";
import { useEffect, useState } from "react";

export default function EffectsOrEventsPage() {
  const [draft, setDraft] = useState("");
  const [saved, setSaved] = useState("");
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `Draft: ${draft || "Untitled"}`;
    return () => {
      document.title = previousTitle;
    };
  }, [draft]);

  return (
    <LessonPage
      title="Effects or events?"
      summary="Ask whether the work follows rendering or a specific user action."
      what="An event handler responds to a particular interaction. An effect synchronizes an external system with the currently rendered state."
      why="Saving in an effect can send duplicate requests or run when props change unexpectedly. Keeping user commands in handlers makes their cause explicit."
      how="Put a user-requested save in a submit handler. Put document-title or subscription synchronization in an effect with complete dependencies and cleanup."
      scenario="Typing changes the browser tab title through an effect. The local saved message changes only when you submit, through an event handler. Leaving this page restores the original title."
      pitfall="Do not use an effect for values that can be calculated during rendering. Effects can restart in Strict Mode, so they should not be a substitute for a one-off user command."
      docs="https://react.dev/learn/separating-events-from-effects"
      code={`function handleSubmit(event) {\n  event.preventDefault()\n  saveDraft(draft)\n}\n\nuseEffect(() => {\n  const previousTitle = document.title\n  document.title = 'Draft: ' + draft\n  return () => { document.title = previousTitle }\n}, [draft])`}
    >
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(
            draft.trim()
              ? `Saved locally: ${draft.trim()}`
              : "Write a draft before saving.",
          );
        }}
      >
        <label className="demo-label block">
          Draft title
          <input
            className="field mt-2"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="My next experiment"
            maxLength={120}
          />
        </label>
        <button type="submit" className="button">
          Save draft
        </button>
      </form>
      <p className="mt-4 text-xs text-muted">
        The tab title follows your draft. Saving is a separate command.
      </p>
      <p role="status" className="mt-3 wrap-anywhere text-sm text-accent">
        {saved || "Nothing saved yet."}
      </p>
    </LessonPage>
  );
}
