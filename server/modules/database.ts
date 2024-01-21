import { Client } from "@planetscale/database";
import type { Connection, ExecutedQuery } from "@planetscale/database";

import "dotenv/config";
export const database = () => {
  const config = {
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  };
  const Clientdb = new Client(config);
  return Clientdb;
};
class wrappedClient {
  client: Connection;
  constructor(client: Connection) {
    this.client = client;
  }
  //third param  is a optional validator for the query

  //get the same type as the
  async query(query: string, args: unknown[]) {
    try {
      return {
        success: true,
        data: await this.client.execute(query, args),
      };
    } catch (error) {
      return { success: false, data: error };
    }
  }
  async execute(query: string, params: unknown[]): Promise<ExecutedQuery> {
    return await this.execute(query, params);
  }
  async transaction(query: string, params: unknown): Promise<ExecutedQuery> {
    return await this.transaction(query, params);
  }
  async refresh() {
    return await this.client.refresh();
  }
}
export let Clientdb = new wrappedClient(database().connection());

export const useClientDB = () => {
  if (Clientdb == undefined) {
    Clientdb = new wrappedClient(database().connection());
  }
  return Clientdb;
};
