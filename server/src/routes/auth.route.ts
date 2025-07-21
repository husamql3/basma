import { auth } from "@server/lib/auth";
import { Hono } from "hono";

export const authRoute = new Hono();

authRoute.all("/*", (c) => {
  return auth.handler(c.req.raw);
});
