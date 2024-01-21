import entry_point from "./server/h3-entry";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import "dotenv/config";

if (!process.env.DATABASE_HOST) {
  console.log(
    "mssing env variables the server database will not reponse to any request",
  );
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const isProduction = process.env.NODE_ENV === "production";
//entry point for h3 server that server frontend and backend

entry_point(__filename, __dirname, isProduction);
