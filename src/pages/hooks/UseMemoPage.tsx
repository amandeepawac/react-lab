import LessonPage from "@/components/LessonPage";
import { useMemo, useState } from "react";

const products = [
  { name: "Canvas tote", price: 12 },
  { name: "Notebook", price: 8 },
  { name: "Desk lamp", price: 36 },
  { name: "Pencil set", price: 6 },
];

export default function UseMemoPage() {
  const [budget, setBudget] = useState(20);
  const [note, setNote] = useState("");
  const affordable = useMemo(
    () =>
      products
        .filter((product) => product.price <= budget)
        .sort((first, second) => first.price - second.price),
    [budget],
  );
  return (
    <LessonPage
      title="useMemo"
      summary="Cache a calculation until its inputs change, when manual memoization is actually needed."
      what="Reuses a computed value between renders while every dependency stays equal by Object.is."
      why="Can avoid expensive calculations or preserve a value's identity. React Compiler already handles many of these cases automatically."
      how="Pass a pure calculation and its complete dependency list. Measure a real performance problem before adding it to production code."
      scenario="Filter and sort a catalog by budget. The unrelated shopping note isn't a dependency of the memoized result. This small dataset teaches the API, not a measurable speedup."
      pitfall="Memoization is a performance optimization, not a correctness guarantee. React may discard the cache. In this compiler-enabled project, ordinary derived values are usually enough."
      code={`const affordable = useMemo(() => {\n  return products\n    .filter(product => product.price <= budget)\n    .sort((first, second) => first.price - second.price)\n}, [budget])\n\n// With React Compiler, usually write the calculation\n// directly and let the compiler handle memoization.`}
    >
      <label className="demo-label block">
        Budget: ${budget}
        <input
          type="range"
          min="5"
          max="40"
          value={budget}
          onChange={(event) => setBudget(Number(event.target.value))}
          className="mt-3 block w-full accent-accent"
        />
      </label>
      <ul className="my-5 divide-y divide-line">
        {affordable.map((product) => (
          <li key={product.name} className="flex justify-between py-3 text-sm">
            <span>{product.name}</span>
            <span>${product.price}</span>
          </li>
        ))}
        {affordable.length === 0 && (
          <li className="py-3 text-sm text-muted">
            No items within this budget.
          </li>
        )}
      </ul>
      <label className="text-xs font-semibold">
        Unrelated shopping note
        <input
          className="field mt-2"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="For the weekend trip..."
        />
      </label>
    </LessonPage>
  );
}
