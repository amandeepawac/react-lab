import { exercises } from "@/data/exercises";
import { PencilLine } from "lucide-react";

export default function LessonExercise({ slug }: { slug: string }) {
  const exercise = exercises[slug];
  if (!exercise) return null;

  return (
    <section
      className="mt-9 border-y border-line py-6"
      aria-labelledby="exercise-heading"
    >
      <h2
        id="exercise-heading"
        className="flex items-center gap-2 font-display text-lg font-semibold"
      >
        <PencilLine size={18} className="text-accent" />
        Try it yourself
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted">{exercise.prompt}</p>
      <details className="mt-4">
        <summary className="w-fit cursor-pointer text-sm font-semibold text-accent">
          Reveal solution
        </summary>
        <pre className="mt-4 overflow-x-auto rounded-md bg-code p-4 font-mono text-xs leading-6 text-code-ink">
          <code>{exercise.solution}</code>
        </pre>
        <p className="mt-3 text-sm leading-6 text-muted">
          {exercise.explanation}
        </p>
      </details>
    </section>
  );
}
