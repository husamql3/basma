import { env } from "@server/env";

export const corsOptions = {
	origin: env.CLIENT_BASE_URL,
	allowHeaders: ["Content-Type", "Authorization"],
	allowMethods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
	exposeHeaders: ["Content-Length"],
	maxAge: 600,
	credentials: true,
};
