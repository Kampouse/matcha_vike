import { createSignal } from "solid-js";

export function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <button
      type="button"
      class="inline-block border border-black rounded bg-gray-200 px-2 py-1 text-xs font-medium uppercase leading-normal"
      onClick={() => setCount((count) => count + 1)}
    >
      Counter {count()}
    </button>
  );
}
