import LessonPage from "@/components/LessonPage";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { useReducer } from "react";

type Cart = { quantity: number; giftWrap: boolean };
type Action =
  { type: "add" | "remove" | "reset" } | { type: "wrap"; value: boolean };
const initialCart: Cart = { quantity: 1, giftWrap: false };

function cartReducer(state: Cart, action: Action): Cart {
  switch (action.type) {
    case "add":
      return { ...state, quantity: state.quantity + 1 };
    case "remove":
      return { ...state, quantity: Math.max(1, state.quantity - 1) };
    case "wrap":
      return { ...state, giftWrap: action.value };
    case "reset":
      return initialCart;
  }
}

export default function UseReducerPage() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  return (
    <LessonPage
      title="useReducer"
      summary="Give related state updates a clear, predictable vocabulary."
      what="Manages state through a pure reducer function. Dispatching an action computes the next state."
      why="Useful when several events affect related fields, such as a cart, multi-step form, or editor."
      how="Define your state and action types, write a reducer, and dispatch descriptive actions from handlers."
      scenario="This cart keeps quantity and gift wrapping in one state object. Every interaction becomes an explicit action."
      pitfall="Reducers must be pure. Do not mutate the previous state, fetch data, or generate random IDs inside a reducer. Strict Mode may call reducers twice in development."
      code={`function reducer(state, action) {\n  switch (action.type) {\n    case 'add':\n      return { ...state, quantity: state.quantity + 1 }\n    case 'wrap':\n      return { ...state, giftWrap: action.value }\n    default: return state\n  }\n}\nconst [cart, dispatch] = useReducer(reducer, initialCart)\ndispatch({ type: 'add' })`}
    >
      <div className="flex flex-wrap items-center gap-4">
        <button
          className="icon-button"
          aria-label="Remove item"
          title="Remove item"
          disabled={cart.quantity === 1}
          onClick={() => dispatch({ type: "remove" })}
        >
          <Minus size={16} />
        </button>
        <output className="font-mono text-xl">{cart.quantity}</output>
        <button
          className="icon-button"
          aria-label="Add item"
          title="Add item"
          onClick={() => dispatch({ type: "add" })}
        >
          <Plus size={16} />
        </button>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={cart.giftWrap}
            onChange={(event) =>
              dispatch({ type: "wrap", value: event.target.checked })
            }
          />
          Gift wrap (+$3)
        </label>
        <button
          className="icon-button ml-auto"
          aria-label="Reset cart"
          title="Reset cart"
          onClick={() => dispatch({ type: "reset" })}
        >
          <RotateCcw size={16} />
        </button>
      </div>
      <p className="mt-5 border-t border-line pt-4 font-semibold">
        Total: ${cart.quantity * 12 + (cart.giftWrap ? 3 : 0)}
      </p>
    </LessonPage>
  );
}
