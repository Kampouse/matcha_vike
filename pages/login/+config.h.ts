import vikeSolid from "vike-solid";
import Layout from "../../layouts/Headless";
import Head from "../../layouts/HeadDefault";

import type { Config } from "vike/types";

// Default config (can be overridden by pages)
export default {
  Layout,
  Head,
  // <title>
  title: "login",
  // <meta name="description">
  description: "bien plus qu'un site de rencontre",
  extends: vikeSolid,
} satisfies Config;
