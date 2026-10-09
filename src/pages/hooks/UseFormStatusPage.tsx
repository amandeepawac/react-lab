import LessonPage from "@/components/LessonPage";
import SubmitButton from "@/components/SubmitButton";
import { delay } from "@/lib/demoApi";
import { useState } from "react";
import { useFormStatus } from "react-dom";

function SubmissionStatus() {
  const { pending, data } = useFormStatus();
  return (
    <p role="status" className="text-xs text-muted">
      {pending
        ? `Submitting feedback: "${String(data?.get("feedback") ?? "")}"`
        : "The parent form is idle."}
    </p>
  );
}

export default function UseFormStatusPage() {
  const [saved, setSaved] = useState("");
  async function saveFeedback(formData: FormData) {
    const feedback = String(formData.get("feedback") ?? "").trim();
    if (!feedback) {
      setSaved("Please write feedback before submitting.");
      return;
    }
    await delay(1200);
    setSaved(`Saved locally: ${feedback}`);
  }
  return (
    <LessonPage
      title="useFormStatus"
      summary="Let a nested component observe its parent form's current submission."
      what="A react-dom hook exposing pending, data, method, and action for the closest parent form."
      why="Lets reusable submit buttons and status messages work without passing loading props through the tree."
      how="Call it from a component rendered inside a form with an action. The hook must be below the form, not in the component that creates it."
      scenario="Send feedback to a simulated local action. The shared submit button and status component independently read the parent form's pending state."
      pitfall="Import useFormStatus from react-dom, not react. It doesn't track the form rendered by the same component or child forms. It observes the submission, not controlled field changes."
      docs="https://react.dev/reference/react-dom/hooks/useFormStatus"
      code={`import { useFormStatus } from 'react-dom'\n\nfunction SubmitButton() {\n  const { pending } = useFormStatus()\n  return <button disabled={pending}>\n    {pending ? 'Submitting...' : 'Submit'}\n  </button>\n}\n\n<form action={saveFeedback}>\n  <input name="feedback" />\n  <SubmitButton />\n</form>`}
    >
      <form action={saveFeedback} className="space-y-4">
        <label className="demo-label block">
          Your feedback
          <textarea
            name="feedback"
            className="field mt-2"
            rows={3}
            placeholder="This lesson helped me understand..."
            required
            maxLength={300}
          />
        </label>
        <SubmitButton label="Save feedback" />
        <SubmissionStatus />
      </form>
      <p aria-live="polite" className="mt-4 break-words text-sm text-accent">
        {saved}
      </p>
    </LessonPage>
  );
}
