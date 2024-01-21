import { Counter } from "./Counter";

export default function Page() {
  return (
    <div class="bg-slate-600">
      <h1 class="font-bold text-3xl pb-4">My rust app</h1>
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          <Counter />
        </li>
      </ul>
    </div>
  );
}
