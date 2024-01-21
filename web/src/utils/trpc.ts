import { createTRPCProxyClient } from "@trpc/client";
import superjson from "superjson";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { IAppRouter } from "@repo/trpc";
export const trpc = createTRPCProxyClient<IAppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: `http://localhost:2022/trpc`,
      headers: () => {
        return {
          credentials: "include",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        };
      },
    }),
  ],
});

export const Fetch = async (param: string, init?: RequestInit) => {
  try {
    const response = await fetch(`http://localhost:5454/api${param}`, {
      headers: {
        "Content-Type": "application/json",

      },
      ...init,
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};
