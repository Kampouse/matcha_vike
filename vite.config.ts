import vercel from "vite-plugin-vercel";
import trpc from "./server/trpc/vite-plugin";
import solid from "vike-solid/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [solid({
    vps: {
      prerender: true,
    },
  }), trpc(), vercel()],
});