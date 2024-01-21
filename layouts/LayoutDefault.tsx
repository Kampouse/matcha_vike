import "./style.css";

import "./tailwind.css";
import type { JSX } from "solid-js";
import logoUrl from "../assets/logo.svg";
import { Link } from "../components/Link";

export default function LayoutDefault(props: { children?: JSX.Element }) {
  return (
    <div class="flex">
      <Content>{props.children}</Content>
    </div>
  );
}

function Sidebar(props: { children: JSX.Element }) {
  return (
    <div
      id="sidebar"
      class=" flex flex-col shrink-0 border-r-2 border-gray-200 bg-gray-100 "
    >
      {props.children}
    </div>
  );
}

function Content(props: { children: JSX.Element }) {
  return (
    <div>
      <div class="w-1">{props.children}</div>
    </div>
  );
}

function Logo() {
  return (
    <div class="p-5 mb-2">
      <a href="/">
        <img src={logoUrl} height={64} width={64} />
      </a>
    </div>
  );
}
