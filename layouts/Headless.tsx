import type { JSX } from "solid-js";
import "./tailwind.css";

export default function Headless(props: { children?: JSX.Element }) {
  return (
    <div class="flex h-screen flex-col items-center  bg-gradient-to-b       from-slate-900 to-purple-900 ">
      {props.children}
    </div>
  );
}
