import { Hono } from "hono";

export const helloRoute = new Hono();

helloRoute.get("/", (c) => {
  return c.text("Hello BHVR!");
});
