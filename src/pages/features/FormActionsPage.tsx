import LessonPage from "@/components/LessonPage";
import SubmitButton from "@/components/SubmitButton";
import { delay } from "@/lib/demoApi";
import { useState } from "react";

export default function FormActionsPage() {
  const [result, setResult] = useState("");
  async function save(formData: FormData) {
    const title = String(formData.get("title") ?? "").trim();
    if (!title) {
      setResult("Enter a project name first.");
      return;
    }
    await delay(800);
    setResult(`Created "${title}" in this local demo.`);
  }
  return (
    <LessonPage
      title="Form Actions"
      summary="Handle a form submission with a function instead of manual event plumbing."
      what="React 19 lets the form action prop receive a function that consumes FormData and can perform asynchronous work."
      why="Integrates submissions with transitions, useFormStatus, and automatic reset of uncontrolled fields after a successful action."
      how="Give fields name attributes, read FormData inside the action, and render a pending-aware button below the form."
      scenario="Create a project with a local 800 ms simulation. Notice the pending button and the uncontrolled field resetting when the action finishes."
      pitfall="A client form action is not a Server Function. Vite alone doesn't execute code on a server. Real apps still need secure backend validation, request errors, and a framework for use server functions."
      docs="https://react.dev/reference/react-dom/components/form"
      code={`async function save(formData) {\n  const title = formData.get('title')\n  await createProject(title)\n}\n\n<form action={save}>\n  <input name="title" required />\n  <SubmitButton />\n</form>\n\n// Successful actions reset uncontrolled form fields.`}
    >
      <form action={save} className="space-y-4">
        <label className="demo-label block">
          Project name
          <input
            className="field mt-2"
            name="title"
            required
            placeholder="My next experiment"
            maxLength={100}
          />
        </label>
        <SubmitButton label="Create project" />
      </form>
      <p role="status" className="mt-4 break-words text-sm text-accent">
        {result}
      </p>
    </LessonPage>
  );
}
