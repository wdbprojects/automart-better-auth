"use client";

import DarkMode from "@/components/shared/dark-mode";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { routes } from "@/config/routes";
import { ArrowBigLeft, Loader2, Send } from "lucide-react";
import { FaGithubAlt, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

const LoginForm = ({
  signInWithGithub,
  isGithubPending,
  signInWithGoogle,
  isGooglePending,
  signInWithEmail,
  email,
  handleEmailOTP,
  isEmailPending,
}: {
  signInWithGithub: () => void;
  isGithubPending: boolean;
  signInWithGoogle: () => void;
  isGooglePending: boolean;
  signInWithEmail: () => void;
  email: string;
  handleEmailOTP: (event: ChangeEvent<HTMLInputElement>) => void;
  isEmailPending: boolean;
}) => {
  return (
    <Card className="!mt-0 w-full !pt-1 sm:w-[400px]">
      <CardHeader className="!py-0">
        <div className="flex flex-row items-center justify-between">
          <Link
            href={routes.home}
            className={buttonVariants({
              size: "sm",
              variant: "outline",
              className: "absolute top-4 left-4 text-xs",
            })}
          >
            <ArrowBigLeft className="size-3" />
            <span>Home</span>
          </Link>
          <DarkMode className="absolute top-5 right-4 text-xs" />
        </div>
        <CardTitle className="text-foreground text-center text-xl font-semibold">
          Welcome back!
        </CardTitle>
        <CardDescription className="text-center">
          Login with Google or Email Account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* <Button
          size="sm"
          className="w-full"
          variant="outline"
          onClick={signInWithGithub}
          disabled={isGithubPending}
        >
          {isGithubPending ? (
            <div className="flex items-center gap-2">
              <Loader2 className="size-3.5 animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FaGithubAlt />
              <span>Sign in with Github</span>
            </div>
          )}
        </Button> */}
        <Button
          size="sm"
          className="w-full"
          variant="outline"
          onClick={signInWithGoogle}
          disabled={isGooglePending}
        >
          {isGooglePending ? (
            <div className="flex items-center gap-2">
              <Loader2 className="size-3.5 animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FaGoogle />
              <span>Sign in with Google</span>
            </div>
          )}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="m@example.com"
              autoComplete="off"
              name="email"
              required
              value={email}
              onChange={handleEmailOTP}
            />
          </div>
          <Button size="sm" onClick={signInWithEmail} disabled={isEmailPending}>
            {isEmailPending ? (
              <div className="text-muted-foreground flex items-center gap-2">
                <Loader2 className="size-3.5 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-white">
                <Send className="size-3.5" />
                <span>Continue with email</span>
              </div>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default LoginForm;
