import { Component, Show, ErrorBoundary } from "solid-js";
import { Router, useLocation } from "@solidjs/router";
import { Nav } from "./components/Nav";
import { lazy } from "solid-js";
import Error from "./components/Error";

const showNav = (value) => {
  const RouteNoNav = ["/login", "/register", "/error", "/"];
  return RouteNoNav.includes(value.pathname) ? false : true;
};
export const routes = [


  {
    path: "/",
    component: lazy(() => import("./pages/Login")),
  }
]








const App: Component = () => {
  return (
    <ErrorBoundary fallback={(err) => <Error err={err} />}>
      <Show when={showNav(location)}>
        <Nav />
      </Show>
      <main />
    </ErrorBoundary>
  );
};

export default App;
