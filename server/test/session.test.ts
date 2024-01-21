import {
  beforeAll,
  describe,
  expect,
  afterAll,
  test,
} from "vitest";
import { startTestServer } from "../h3-entry";
import { toNodeListener } from "h3";
import { createServer } from "node:http";
import { faker } from "@faker-js/faker";

beforeAll(async () => {
  const server = toNodeListener(await startTestServer());
  createServer(server).listen(process.env.PORT || 3000);
});
//dummie test
describe("valid login", () => {
  test("should be able to set a cookie", async () => {
    const input = { email: "jpmartel98@gmail.com", password: process.env.PASSWORD };
    const data = await fetch("http://localhost:3000/api/session/login", {
      method: "POST",
      body: JSON.stringify(input),
    });

    const body = await data.json();

    expect(body).toEqual({
      payload: { success: true, data: { email: "jpmartel98@gmail.com", username: "Leatha93" } },


      //expect(body).toEqual({ hello: "session" });
    });
  });
});
describe("valid register", () => {

  const pass = faker.internet.password();
  const register = {
    email: faker.internet.email(),
    username: faker.internet.userName(),
    re_password: pass,
    password: pass,
  };

  test("should be able to register", async () => {
    const data = await fetch("http://localhost:3000/api/session/register", {
      method: "POST",
      body: JSON.stringify(register),
    });
    const body = await data.json();
    expect(body).toEqual({
      payload: { success: true, data: { email: register.email, username: register.username } },
      //expect(body).toEqual({ hello: "session" });
    });
  });

  test("should be able to delete account", async () => {
    const data = await fetch("http://localhost:3000/api/session/delete", {
      method: "POST",
      body: JSON.stringify({ email: register.email }),
    });
    const body = await data.json();
    console.log("body content", body);
    expect(body).toEqual({
      payload: { success: true, data: [] },
      //expect(body).toEqual({ hello: "session" });
    });
  }
  );
});


afterAll(async () => {








});
