import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink, oAuthProxy } from "better-auth/plugins";
import { db } from "../db";
import { env } from "../env";
// import { schema } from "../db/schema";

export const auth = betterAuth({
	baseURL: env.SERVER_BASE_URL,
	database: drizzleAdapter(db, {
		provider: "pg",
		// schema,
	}),
	plugins: [
		oAuthProxy(),
		magicLink({
			sendMagicLink: async ({ email, url }) => {
				console.log("Sending magic link email to", email, url);
				return await Promise.resolve();
			},
			expiresIn: 60 * 30, // 30 minutes
		}),
	],
	// user: {
	//   additionalFields: {
	//     roles: {
	//       type: [Role.STUDENT, Role.CREATOR, Role.ADMIN],
	//       required: true,
	//       defaultValue: [Role.STUDENT],
	//     },
	//   },
	// },
	trustedOrigins: [env.CLIENT_BASE_URL],
	secret: env.BETTER_AUTH_SECRET,
});
