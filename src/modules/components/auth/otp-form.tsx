"use client";

import { useState, useTransition } from "react";
import { OneTimePasswordSchema, OtpSchemaType } from "@/app/schemas/otp-schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LoaderCircle, RotateCw, Router } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { routes } from "@/config/routes";
import { authClient } from "@/utils/auth-client";

const OTPForm = () => {
  const [isSubmitPending, startSubmitTransition] = useTransition();
  const [isCodePending, startCodeTransition] = useTransition();
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") as string;

  const form = useForm<OtpSchemaType>({
    resolver: zodResolver(OneTimePasswordSchema),
    defaultValues: {
      code: "",
    },
  });
  const { handleSubmit, control } = form;
  const onSubmit: SubmitHandler<OtpSchemaType> = async (
    data: OtpSchemaType,
  ) => {
    startSubmitTransition(async () => {
      await authClient.signIn.emailOtp({
        email: email,
        otp: data.code,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email verified");
            router.push(routes.home);
          },
          onError: (err) => {
            toast.error(`Error: ${err.error?.message}`);
          },
        },
      });
    });
  };

  const sendCode = () => {
    startCodeTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.info("Verification code resent, check your email");
          },
          onError: (err) => {
            toast.error(`Error: ${err.error?.message}`);
          },
        },
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="code"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            );
          }}
        />
        <div className="flex flex-col items-center justify-between gap-2">
          <Button
            type="submit"
            className="w-full text-white"
            size="sm"
            variant="default"
            disabled={isSubmitPending}
          >
            {isSubmitPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="size-3.5 animate-spin" />
                <span>Submitting...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Submit Code</span>
              </div>
            )}
          </Button>
          <Button
            type="button"
            className="text-foreground/70 text-xs"
            size="sm"
            variant="ghost"
            disabled={isCodePending}
            onClick={sendCode}
          >
            {isCodePending ? (
              <LoaderCircle className="group-hover:text-primary size-3.5 animate-spin transition-colors duration-800" />
            ) : (
              <RotateCw className="text-primary group-hover:text-primary size-3.5 transition-colors" />
            )}
            Resend Code
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default OTPForm;
