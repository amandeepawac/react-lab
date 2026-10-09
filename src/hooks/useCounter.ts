import { useState } from "react";

export default function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  return {
    count,
    increment: () => setCount((previous) => previous + 1),
    decrement: () => setCount((previous) => previous - 1),
    reset: () => setCount(initialValue),
  };
}
