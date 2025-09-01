import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";
import prisma from "@/lib/prisma";
import { env } from "@/env";
import { resend } from "@/utils/resend";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: "AutomartBA <onboarding@resend.dev>",
          to: [email],
          subject: "AutomartBA - Verify your email",
          html: `<p>Your OTP is <strong>${otp}</strong></p>`,
          // react: EmailTemplate({ firstName: "Nata Slut" }),
        });
      },
    }),
  ],
});
