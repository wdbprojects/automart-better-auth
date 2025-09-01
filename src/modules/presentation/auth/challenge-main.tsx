import DarkMode from "@/components/shared/dark-mode";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { routes } from "@/config/routes";
import OTPForm from "@/modules/components/auth/otp-form";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

const ChallengeMain = () => {
  return (
    <Card className="mx-auto w-full max-w-[500px]">
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
        <Link
          href={routes.home}
          className="absolute top-3.5 left-[-10px] hidden w-full cursor-pointer items-center justify-center gap-0 text-center sm:block"
        >
          <span className="text-primary mb-0 text-3xl font-semibold tracking-tight">
            Auto
          </span>
          <span className="text-foreground mb-0 text-3xl font-semibold tracking-tight">
            Mart
          </span>
        </Link>
        <DarkMode className="absolute top-5 right-4" />
      </div>
      <CardHeader>
        <CardTitle className="mb-4 text-center text-3xl font-medium lg:text-4xl">
          One Time Password
        </CardTitle>
        <CardDescription className="text-center">
          Enter the six digit code sent to your email address
        </CardDescription>
      </CardHeader>
      <CardContent className="mx-auto space-y-4">
        <OTPForm />
      </CardContent>
      <CardFooter className="text-muted-foreground mx-auto flex w-full max-w-sm flex-col text-center text-xs text-balance">
        <p>
          By clicking continue, you agree to our{" "}
          <span className="hover:text-primary cursor-pointer underline-offset-4 hover:underline">
            <Link href="#">Terms of Service</Link>
          </span>{" "}
          and{" "}
          <span className="hover:text-primary cursor-pointer underline-offset-4 hover:underline">
            <Link href="#">Privacy Policy</Link>
          </span>
          .
        </p>
      </CardFooter>
    </Card>
  );
};
export default ChallengeMain;
