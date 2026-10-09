import LessonPage from "@/components/LessonPage";
import useCounter from "@/hooks/useCounter";
import { Minus, Plus, RotateCcw } from "lucide-react";

function Counter({
  label,
  initialValue,
}: {
  label: string;
  initialValue: number;
}) {
  const { count, increment, decrement, reset } = useCounter(initialValue);
  return (
    <div className="border-b border-line py-5 first:pt-0 last:border-0 last:pb-0">
      <p className="demo-label mb-3">{label}</p>
      <div className="flex items-center gap-4">
        <button
          className="icon-button"
          aria-label={`Decrease ${label}`}
          title={`Decrease ${label}`}
          onClick={decrement}
        >
          <Minus size={16} />
        </button>
        <output className="w-12 text-center font-mono text-2xl">{count}</output>
        <button
          className="icon-button"
          aria-label={`Increase ${label}`}
          title={`Increase ${label}`}
          onClick={increment}
        >
          <Plus size={16} />
        </button>
        <button
          className="icon-button ml-auto"
          aria-label={`Reset ${label}`}
          title={`Reset ${label}`}
          onClick={reset}
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}

export default function CustomHooksPage() {
  return (
    <LessonPage
      title="Custom hooks"
      summary="Reuse stateful logic without sharing the state itself."
      what="A function starting with use that composes built-in hooks into a reusable piece of component behavior."
      why="Keeps components readable and avoids repeating related state and event logic in several places."
      how="Extract the logic into a use-prefixed function. Return values and commands that describe the behavior, and call it at the top of a component."
      scenario="Two counters use the same useCounter hook. Each instance owns its own state, so changing one does not affect the other."
      pitfall="Custom hooks share logic, not state. Use context or an external store when instances must coordinate. Avoid lifecycle-shaped wrappers that hide effect dependencies."
      docs="https://react.dev/learn/reusing-logic-with-custom-hooks"
      code={`function useCounter(initialValue = 0) {\n  const [count, setCount] = useState(initialValue)\n  return {\n    count,\n    increment: () => setCount(previous => previous + 1),\n    decrement: () => setCount(previous => previous - 1),\n    reset: () => setCount(initialValue),\n  }\n}\n\nconst { count, increment } = useCounter(0)`}
    >
      <Counter label="Morning experiments" initialValue={0} />
      <Counter label="Afternoon experiments" initialValue={5} />
    </LessonPage>
  );
}
