import LessonPage from "@/components/LessonPage";
import { Search } from "lucide-react";
import { useState, useTransition } from "react";

const categories = ["Desk", "Travel", "Tools"];
const names = [
  "Notebook",
  "Canvas tote",
  "Pencil set",
  "Desk lamp",
  "Travel journal",
  "Cable organizer",
];
const products = Array.from({ length: 1800 }, (_, index) => ({
  id: index,
  name: `${names[index % names.length]} ${index + 1}`,
  category: categories[index % categories.length],
  price: 6 + (index % 60),
}));
type Filter = { query: string; category: string };

function ProductResults({ filter }: { filter: Filter }) {
  const visible = products.filter(
    (product) =>
      product.name.toLowerCase().includes(filter.query.toLowerCase()) &&
      (filter.category === "All" || product.category === filter.category),
  );
  return (
    <>
      <p className="mb-3 text-xs text-muted">
        {visible.length.toLocaleString()} matching products
      </p>
      <ul className="max-h-64 overflow-y-auto divide-y divide-line">
        {visible.map((product) => (
          <li
            key={product.id}
            className="flex items-center justify-between gap-4 py-3 text-xs"
          >
            <span className="min-w-0 wrap-anywhere">
              {product.name}
              <small className="mt-1 block text-muted">
                {product.category}
              </small>
            </span>
            <span className="shrink-0 font-mono">${product.price}</span>
          </li>
        ))}
      </ul>
      {visible.length === 0 && (
        <p className="py-5 text-sm text-muted">
          No products match this search.
        </p>
      )}
    </>
  );
}

export default function UseTransitionPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [filter, setFilter] = useState<Filter>({ query: "", category: "All" });
  const [pending, startTransition] = useTransition();
  return (
    <LessonPage
      title="useTransition"
      summary="Mark an update as non-urgent and keep the rest of the interface responsive."
      what="Returns an isPending flag and a startTransition function for scheduling interruptible, lower-priority updates."
      why="Keeps urgent interactions usable while switching views or performing an async action. Existing content can remain visible instead of flashing away."
      how="Wrap the non-urgent update in startTransition. Keep controlled text-input updates outside transitions."
      scenario="Search 1,800 locally generated products or choose a category. The controls update urgently, while the larger results subtree receives a non-urgent filter update. On fast devices pending may be too brief to notice; CPU throttling makes the distinction clearer."
      pitfall="Transitions do not debounce requests, make calculations faster, or move work to a worker. Keep controlled input updates urgent. This demo isolates results in a child component so React Compiler can reuse it while its filter props stay unchanged."
      code={`const [query, setQuery] = useState('')\nconst [filter, setFilter] = useState({ query: '', category: 'All' })\nconst [isPending, startTransition] = useTransition()\n\nfunction onSearch(nextQuery) {\n  setQuery(nextQuery)\n  startTransition(() => {\n    setFilter(previous => ({ ...previous, query: nextQuery }))\n  })\n}\n\n<ProductResults filter={filter} />`}
    >
      <div className="grid items-end gap-4 sm:grid-cols-[1fr_150px]">
        <label className="demo-label">
          Search products
          <div className="mt-2 flex items-center gap-2">
            <Search size={16} className="shrink-0 text-muted" />
            <input
              className="field"
              value={query}
              placeholder="Try notebook"
              onChange={(event) => {
                const value = event.target.value;
                setQuery(value);
                startTransition(() =>
                  setFilter((previous) => ({ ...previous, query: value })),
                );
              }}
            />
          </div>
        </label>
        <label className="demo-label">
          Category
          <select
            className="field mt-2"
            value={category}
            onChange={(event) => {
              const value = event.target.value;
              setCategory(value);
              startTransition(() =>
                setFilter((previous) => ({ ...previous, category: value })),
              );
            }}
          >
            <option>All</option>
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <p role="status" className="my-4 min-h-5 text-xs text-accent">
        {pending ? "Updating results..." : "Results up to date"}
      </p>
      <div aria-busy={pending} className={pending ? "opacity-50" : ""}>
        <ProductResults filter={filter} />
      </div>
    </LessonPage>
  );
}
