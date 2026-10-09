import LessonPage from "@/components/LessonPage";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { useReducer } from "react";

type Fields = { name: string; email: string; address: string };
type Checkout = Fields & {
  step: number;
  delivery: "standard" | "express";
  errors: Partial<Fields>;
};
type Action =
  | { type: "field"; field: keyof Fields; value: string }
  | { type: "delivery"; value: Checkout["delivery"] }
  | { type: "next" | "back" | "complete" | "reset" };
const initialCheckout: Checkout = {
  step: 0,
  name: "",
  email: "",
  address: "",
  delivery: "standard",
  errors: {},
};

function checkoutReducer(state: Checkout, action: Action): Checkout {
  switch (action.type) {
    case "field":
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: undefined },
      };
    case "delivery":
      return { ...state, delivery: action.value };
    case "next": {
      const errors: Partial<Fields> = {};
      if (state.step === 0) {
        if (!state.name.trim()) errors.name = "Enter your name.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim()))
          errors.email = "Enter a valid email address.";
      }
      if (state.step === 1 && !state.address.trim())
        errors.address = "Enter a delivery address.";
      return Object.keys(errors).length
        ? { ...state, errors }
        : { ...state, step: Math.min(2, state.step + 1), errors: {} };
    }
    case "back":
      return { ...state, step: Math.max(0, state.step - 1), errors: {} };
    case "complete":
      return state.step === 2 ? { ...state, step: 3 } : state;
    case "reset":
      return initialCheckout;
  }
}

export default function UseReducerPage() {
  const [checkout, dispatch] = useReducer(checkoutReducer, initialCheckout);
  const fields: (keyof Fields)[] =
    checkout.step === 0 ? ["name", "email"] : ["address"];
  const total = 24 + (checkout.delivery === "express" ? 8 : 0);
  return (
    <LessonPage
      title="useReducer"
      summary="Give related state updates a clear, predictable vocabulary."
      what="Manages state through a pure reducer function. Dispatching an action computes the next state."
      why="A checkout needs fields, validation, delivery choices, and navigation to agree. A reducer makes each allowed transition explicit."
      how="Define your state and action types, write a reducer, and dispatch descriptive actions from handlers."
      scenario="Complete a three-step checkout for a $24 notebook bundle. Try continuing with empty fields, choose delivery, and go back to edit without losing your entries. This is a local demo: no order or payment is sent."
      pitfall="Reducers must be pure. Do not mutate state, fetch data, or generate IDs inside a reducer. Client validation helps the user; a real checkout still needs server-side validation."
      code={`function checkoutReducer(state, action) {\n  switch (action.type) {\n    case 'field':\n      return { ...state, [action.field]: action.value }\n    case 'next': {\n      const errors = validateCurrentStep(state)\n      if (Object.keys(errors).length) return { ...state, errors }\n      return { ...state, step: state.step + 1, errors: {} }\n    }\n    case 'back':\n      return { ...state, step: state.step - 1, errors: {} }\n    case 'reset': return initialCheckout\n    default: return state\n  }\n}\nconst [checkout, dispatch] = useReducer(checkoutReducer, initialCheckout)`}
    >
      <div className="flex items-center justify-between gap-4">
        <ol
          aria-label="Checkout steps"
          className="flex flex-wrap gap-4 text-xs"
        >
          {["Contact", "Delivery", "Review"].map((step, index) => (
            <li
              key={step}
              aria-current={checkout.step === index ? "step" : undefined}
              className={
                checkout.step === index
                  ? "font-semibold text-accent"
                  : "text-muted"
              }
            >
              {index + 1}. {step}
            </li>
          ))}
        </ol>
        <button
          className="icon-button"
          aria-label="Reset checkout"
          title="Reset checkout"
          onClick={() => dispatch({ type: "reset" })}
        >
          <RotateCcw size={16} />
        </button>
      </div>
      {checkout.step === 3 ? (
        <div role="status" className="mt-6">
          <p className="flex items-center gap-2 font-semibold text-accent">
            <Check size={18} />
            Demo order complete
          </p>
          <p className="mt-2 text-sm text-muted">
            Thank you, {checkout.name}. Total: ${total}. No payment was taken.
          </p>
        </div>
      ) : (
        <form
          noValidate
          className="mt-6 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            dispatch({ type: checkout.step === 2 ? "complete" : "next" });
          }}
        >
          {checkout.step < 2 &&
            fields.map((field) => (
              <div key={field}>
                <label
                  htmlFor={`checkout-${field}`}
                  className="demo-label capitalize"
                >
                  {field === "address" ? "Delivery address" : field}
                </label>
                <input
                  id={`checkout-${field}`}
                  className="field mt-2"
                  type={field === "email" ? "email" : "text"}
                  autoComplete={field === "address" ? "street-address" : field}
                  value={checkout[field]}
                  aria-invalid={!!checkout.errors[field]}
                  aria-describedby={
                    checkout.errors[field] ? `error-${field}` : undefined
                  }
                  onChange={(event) =>
                    dispatch({
                      type: "field",
                      field,
                      value: event.target.value,
                    })
                  }
                />
                {checkout.errors[field] && (
                  <p
                    id={`error-${field}`}
                    role="alert"
                    className="mt-2 text-xs text-red-700"
                  >
                    {checkout.errors[field]}
                  </p>
                )}
              </div>
            ))}
          {checkout.step === 1 && (
            <fieldset>
              <legend className="demo-label mb-3">Delivery method</legend>
              <div className="flex flex-wrap gap-4">
                {(["standard", "express"] as const).map((method) => (
                  <label
                    key={method}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={checkout.delivery === method}
                      onChange={() =>
                        dispatch({ type: "delivery", value: method })
                      }
                    />
                    {method === "standard"
                      ? "Standard (free)"
                      : "Express (+$8)"}
                  </label>
                ))}
              </div>
            </fieldset>
          )}
          {checkout.step === 2 && (
            <dl className="space-y-3 text-sm">
              {[
                ["Contact", `${checkout.name} (${checkout.email})`],
                ["Address", checkout.address],
                ["Delivery", checkout.delivery],
                ["Total", `$${total}`],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-1 border-b border-line pb-3 sm:grid-cols-[100px_1fr]"
                >
                  <dt className="text-muted">{label}</dt>
                  <dd className="wrap-anywhere">{value}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className="flex flex-wrap justify-between gap-3 border-t border-line pt-4">
            <button
              type="button"
              className="button-secondary"
              disabled={checkout.step === 0}
              onClick={() => dispatch({ type: "back" })}
            >
              <ArrowLeft size={15} />
              Back
            </button>
            <button type="submit" className="button">
              {checkout.step === 2 ? "Place demo order" : "Continue"}
              <ArrowRight size={15} />
            </button>
          </div>
        </form>
      )}
    </LessonPage>
  );
}
