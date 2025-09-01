"use client";

import { ChangeEvent, useState, useTransition } from "react";
import LoginForm from "@/modules/components/auth/login-form";
import { authClient, signIn } from "@/utils/auth-client";
import { routes } from "@/config/routes";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginMain = () => {
  const [isGithubPending, startGithubTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();
  const [isEmailPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState("");
  const router = useRouter();

  const signInWithGithub = () => {
    startGithubTransition(async () => {
      await signIn.social({
        provider: "github",
        callbackURL: routes.about,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with Github, you will be redirected...");
          },
          onError: (err) => {
            toast.error(`Error signing in: ${err?.error.message}`);
          },
        },
      });
    });
  };

  const signInWithGoogle = () => {
    startGoogleTransition(async () => {
      await signIn.social({
        provider: "google",
        callbackURL: routes.about,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with Google, you will be redirected...");
          },
          onError: (err) => {
            toast.error(`Error signing in: ${err?.error.message}`);
          },
        },
      });
    });
  };

  const handleEmailOTP = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const signInWithEmail = () => {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email sent");
            router.push(`/auth/challenge?email=${email}`);
          },
          onError: () => {
            toast.error("Error sending email ");
          },
        },
      });
    });
  };

  return (
    <>
      <Link
        href={routes.home}
        className="absolute top-3.5 hidden w-full cursor-pointer items-center justify-center gap-0 text-center sm:block"
      >
        <span className="text-primary mb-0 text-3xl font-semibold tracking-tight">
          Auto
        </span>
        <span className="text-foreground mb-0 text-3xl font-semibold tracking-tight">
          Mart
        </span>
      </Link>
      <LoginForm
        signInWithGithub={signInWithGithub}
        isGithubPending={isGithubPending}
        signInWithGoogle={signInWithGoogle}
        isGooglePending={isGooglePending}
        signInWithEmail={signInWithEmail}
        email={email}
        handleEmailOTP={handleEmailOTP}
        isEmailPending={isEmailPending}
      />
      <div className="text-muted-foreground max-w-sm text-center text-xs text-balance">
        By clicking continue, you agree to our{" "}
        <span className="hover:text-primary cursor-pointer underline-offset-4 transition-all hover:underline">
          <Link href="#">Terms of Service</Link>
        </span>{" "}
        and{" "}
        <span className="hover:text-primary cursor-pointer underline-offset-4 transition-all hover:underline">
          <Link href="#">Privacy Policy</Link>
        </span>
        .
      </div>
    </>
  );
};
export default LoginMain;
