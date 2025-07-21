import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import { auth } from "./lib/auth";
import { env } from "./env";
import { helloRoute } from "./routes/hello.route";
import { homeRoute } from "./routes/home.route";
import { authRoute } from "./routes/auth.route";
import type { AppType } from "./types/app.type";
import { corsOptions } from "./lib/cors-options";

export const app = new Hono<{ Variables: AppType }>()
  .use(cors(corsOptions))
  .use(logger())
  .basePath("/api");

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

app.route("/", homeRoute);
app.route("/hello", helloRoute);
app.route("/api/auth/*", authRoute);

app.get("*", serveStatic({ root: "../client/dist" }));
app.get("*", serveStatic({ path: "index.html", root: "../client/dist" }));

Bun.serve({
  fetch: app.fetch,
  port: 3000,
});
