import { createEnv } from "@t3-oss/env-core";
import { env as BunEnv, resolveSync } from "bun";
import { config } from "dotenv";
import { z } from "zod/v4";

config({ path: resolveSync("../../../.env", import.meta.path) });

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),

    // better-auth
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.url(),

    // db
    DATABASE_URL: z.url(),

    // app
    SERVER_BASE_URL: z.url(),
    CLIENT_BASE_URL: z.url(),
  },
  runtimeEnv: BunEnv,
  skipValidation: process.env.NODE_ENV !== "development",
});
