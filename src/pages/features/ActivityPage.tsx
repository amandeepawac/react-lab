import LessonPage from "@/components/LessonPage";
import { Activity, useEffect, useState } from "react";

function DraftEditor() {
  const [draft, setDraft] = useState("My next React experiment...");
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(
      () => setSeconds((previous) => previous + 1),
      1000,
    );
    return () => window.clearInterval(timer);
  }, []);
  return (
    <div className="mt-5">
      <label className="demo-label">
        Saved component state
        <textarea
          className="field mt-2"
          rows={3}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
      </label>
      <p className="mt-3 text-xs text-muted">
        Active time: {seconds}s. The timer effect disconnects while hidden.
      </p>
    </div>
  );
}

export default function ActivityPage() {
  const [visible, setVisible] = useState(true);
  return (
    <LessonPage
      title="Activity"
      summary="Hide a subtree without throwing away its state."
      what="A React 19.2 component that hides UI, preserves state, and cleans up effects while hidden. Effects restart when it becomes visible."
      why="Lets tab panels or drafts retain user input without keeping their active subscriptions running in the background."
      how="Wrap the subtree in Activity and switch mode between visible and hidden instead of conditionally unmounting it."
      scenario="Edit the draft, hide it, wait, and show it again. Your draft survives and its timer pauses while hidden."
      pitfall="Hidden is different from unmounted: state remains and hidden content can still receive lower-priority updates. Do not use Activity when you actually want a fresh component instance."
      code={`<Activity mode={visible ? 'visible' : 'hidden'}>\n  <DraftEditor />\n</Activity>\n\n// Inside DraftEditor, ordinary effect cleanup runs\n// when the Activity is hidden and setup runs on reveal.`}
    >
      <button
        className="button"
        aria-pressed={!visible}
        onClick={() => setVisible(!visible)}
      >
        {visible ? "Hide draft" : "Show draft"}
      </button>
      <Activity mode={visible ? "visible" : "hidden"}>
        <DraftEditor />
      </Activity>
      {!visible && (
        <p className="mt-5 text-sm text-muted">
          Draft hidden. Its state is preserved.
        </p>
      )}
    </LessonPage>
  );
}
