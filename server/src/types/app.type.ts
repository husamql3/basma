import type { auth } from "@server/lib/auth";

export type AppType = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};
