import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
} from "node:http";
import { appRouter } from "./trpc/server";
import installCrypto from "@hattip/polyfills/crypto";
import installGetSetCookie from "@hattip/polyfills/get-set-cookie";
import installWhatwgNodeFetch from "@hattip/polyfills/whatwg-node";
import {
  nodeHTTPRequestHandler,
  type NodeHTTPCreateContextFnOptions,
} from "@trpc/server/adapters/node-http";
import {
  createApp,
  createRouter,
  eventHandler,
  fromNodeMiddleware,
  setResponseHeaders,
  setResponseStatus,
  toNodeListener,
  useBase,
} from "h3";
import Sessions from "./routers/sessions";
import serveStatic from "serve-static";
import { renderPage } from "vike/server";
import { database } from "./modules/database";
import "dotenv/config";
export async function startTestServer() {
  {
    installWhatwgNodeFetch();
    installGetSetCookie();
    installCrypto();
    database();
    const app = createApp();
    const router = createRouter();
    router.use(
      "/api/trpc/**:path",
      eventHandler((event) =>
        nodeHTTPRequestHandler({
          req: event.node.req,
          res: event.node.res,
          path: event.context.params!.path,
          router: appRouter,
          createContext({
            req,
            res,
          }: NodeHTTPCreateContextFnOptions<IncomingMessage, ServerResponse>) {
            return { req, res };
          },
        }),
      ),
    );
    app.use(useBase("/api/session", Sessions.handler));
    app.use(router);
    return app;
  }
}

async function startDevServer(root: string, isProduction: boolean) {
  installWhatwgNodeFetch();
  installGetSetCookie();
  installCrypto();

  const app = createApp();

  if (isProduction) {
    app.use("/", fromNodeMiddleware(serveStatic(`${root}/dist/client`)));
  } else {
    // Instantiate Vite's development server and integrate its middleware to our server.
    // ⚠️ We should instantiate it *only* in development. (It isn't needed in production
    // and would unnecessarily bloat our server in production.)
    const vite = await import("vite");
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;
    app.use(fromNodeMiddleware(viteDevMiddleware));
  }

  const router = createRouter();

  router.use(
    "/api/trpc/**:path",
    eventHandler((event) =>
      nodeHTTPRequestHandler({
        req: event.node.req,
        res: event.node.res,
        path: event.context.params!.path,
        router: appRouter,
        createContext({
          req,
          res,
        }: NodeHTTPCreateContextFnOptions<IncomingMessage, ServerResponse>) {
          return { req, res };
        },
      }),
    ),
  );

  /**
   * Vike route
   *
   * @link {@see https://vike.dev}
   **/

  router.use(
    "/**",
    eventHandler(async (event) => {
      const pageContextInit = {
        urlOriginal: event.node.req.originalUrl || event.node.req.url!,
      };
      const pageContext = await renderPage(pageContextInit);
      const response = pageContext.httpResponse;

      setResponseStatus(event, response?.statusCode);
      setResponseHeaders(event, Object.fromEntries(response?.headers ?? []));

      return response?.getBody();
    }),
  );
  app.use(useBase("/api/session", Sessions.handler));
  app.use(router);

  const server = createServer(toNodeListener(app)).listen(
    process.env.PORT || 3000,
  );

  server.on("listening", () => {
    console.log(
      `Server listening on http://localhost:${process.env.PORT || 3000}`,
    );
  });
}

export default function entry_point(
  __filename: string,
  __dirname: string,
  isProduction: boolean,
) {
  const root = __dirname;
  return startDevServer(root, isProduction);
}
