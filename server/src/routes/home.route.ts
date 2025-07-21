import { Hono } from "hono";

export const homeRoute = new Hono();

homeRoute.get("/", (c) => {
  return c.text("Hello Hono!");
});
