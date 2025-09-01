import { createAuthClient } from "better-auth/react";
import { env } from "@/env";
import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_APP_URL,
  plugins: [emailOTPClient()],
});

export const { signIn, signOut, useSession } = createAuthClient();
