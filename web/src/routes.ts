import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";
import AboutData from "./pages/about.data";
export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: lazy(() => import("./pages/home")),
    load: AboutData,
    children: []
  },
  {
    path: "/about",
    component: lazy(() => import("./pages/about")),
  },
  {
    path: "/login",
    component: lazy(() => import("./pages/Login")),
  },
  {
    path: "/me",
    component: lazy(() => import("./pages/Profile")),
  },

  {
    path: "/register",

    component: lazy(() => import("./pages/Register")),
  },
  {
    path: "**",
    component: lazy(() => import("./errors/404")),
  },
];
