import LessonPage from "@/components/LessonPage";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { useState } from "react";

export default function UseStatePage() {
  const [quantity, setQuantity] = useState(1);
  return (
    <LessonPage
      title="useState"
      summary="A little memory makes a component interactive."
      what="Stores a value between renders and provides a setter that requests a new render."
      why="Local UI state powers counters, form inputs, open menus, and selected tabs without a global store."
      how="Call useState at the top of your component. Read the current value in JSX and update it in an event handler."
      scenario="A shopping cart needs a quantity selector. Add or remove an item and watch the total update."
      pitfall="State is a snapshot, not an immediately mutated variable. Use a functional updater when the next value depends on the previous one. Never mutate state objects directly."
      code={`const [quantity, setQuantity] = useState(1)\n\nfunction addItem() {\n  setQuantity(previous => previous + 1)\n}\n\nreturn <button onClick={addItem}>{quantity} items</button>`}
    >
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="demo-label">Canvas tote</p>
          <p className="mt-2 text-sm text-muted">$12.00 / item</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="icon-button"
            title="Remove one item"
            aria-label="Remove one item"
            disabled={quantity === 1}
            onClick={() => setQuantity((previous) => previous - 1)}
          >
            <Minus size={17} />
          </button>
          <output className="w-8 text-center font-mono text-2xl">
            {quantity}
          </output>
          <button
            className="icon-button"
            title="Add one item"
            aria-label="Add one item"
            onClick={() => setQuantity((previous) => previous + 1)}
          >
            <Plus size={17} />
          </button>
        </div>
        <output className="font-display text-2xl font-semibold">
          ${(quantity * 12).toFixed(2)}
        </output>
        <button
          className="icon-button"
          title="Reset quantity"
          aria-label="Reset quantity"
          onClick={() => setQuantity(1)}
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </LessonPage>
  );
}
