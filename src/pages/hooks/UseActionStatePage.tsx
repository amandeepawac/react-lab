import LessonPage from "@/components/LessonPage";
import { delay } from "@/lib/demoApi";
import { useActionState } from "react";

type Result = { message: string; success: boolean };
async function subscribe(
  _previous: Result,
  formData: FormData,
): Promise<Result> {
  await delay(900);
  const email = String(formData.get("email") ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { message: "Enter a valid email address.", success: false };
  return {
    message: `${email} is on the list! (Local demo; no email was sent.)`,
    success: true,
  };
}

export default function UseActionStatePage() {
  const [result, formAction, pending] = useActionState(subscribe, {
    message: "",
    success: false,
  });
  return (
    <LessonPage
      title="useActionState"
      summary="Tie an action's result and pending state to your UI."
      what="Returns the current action state, an action dispatcher, and a pending flag. The action receives previous state and its input."
      why="Reduces manual loading and result-state plumbing for submissions with validation, success feedback, or errors."
      how="Define an async action and pass it with an initial state. Use the returned action as the form's action prop."
      scenario="Submit an email to a locally simulated newsletter action. Try an invalid address to see validation feedback after the 900 ms delay."
      pitfall="The action's first parameter is previous state, not FormData. Dispatch outside a form action within startTransition. This client-only demo performs no server call and stores no subscription."
      code={`async function subscribe(previousState, formData) {\n  const email = formData.get('email')\n  return await saveSubscription(email)\n}\n\nconst [result, formAction, isPending] = useActionState(\n  subscribe, { message: '', success: false },\n)\n\n<form action={formAction}>\n  <input name="email" />\n  <button disabled={isPending}>Subscribe</button>\n</form>`}
    >
      <form action={formAction} noValidate className="space-y-4">
        <label className="demo-label block">
          Email address
          <input
            name="email"
            type="email"
            className="field mt-2"
            placeholder="you@example.com"
            required
            disabled={pending}
          />
        </label>
        <button className="button" type="submit" disabled={pending}>
          {pending ? "Subscribing..." : "Subscribe"}
        </button>
        <p
          role="status"
          className={`min-h-5 text-sm ${result.success ? "text-accent" : "text-red-700"}`}
        >
          {result.message}
        </p>
      </form>
    </LessonPage>
  );
}
