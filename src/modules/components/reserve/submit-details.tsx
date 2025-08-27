"use client";

import { useTransition } from "react";
import {
  SubmitDetailsSchema,
  SubmitDetailsSchemaType,
} from "@/app/schemas/customer-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MultiStepFormComponentProps, MultiStepFormEnum } from "@/config/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { createCustomerAction } from "@/app/_actions/customer";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import { routes } from "@/config/routes";

const SubmitDetails = (props: MultiStepFormComponentProps) => {
  const [isPending, startTransition] = useTransition();
  const [isPrevPending, startPrevTransition] = useTransition();
  const { params, searchParams } = props;
  const router = useRouter();

  const form = useForm<SubmitDetailsSchemaType>({
    resolver: zodResolver(SubmitDetailsSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      terms: "false",
    },
    mode: "onBlur",
  });

  const { handleSubmit, control, reset, trigger } = form;

  const prevStep = () => {
    startPrevTransition(async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 500);
      });
      const url = new URL(window.location.href);
      url.searchParams.set("step", MultiStepFormEnum.SELECT_DATE.toString());
      router.push(url.toString());
    });
  };

  const onSubmitDetails: SubmitHandler<SubmitDetailsSchemaType> = (data) => {
    startTransition(async () => {
      const valid = await trigger();
      if (!valid) return;
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 500);
      });

      const handoverDate = decodeURIComponent(
        searchParams?.handoverDate as string,
      );
      const handoverTime = decodeURIComponent(
        searchParams?.handoverTime as string,
      );
      const date = formatDate(handoverDate, handoverTime);
      // create customer
      const { success, message } = await createCustomerAction({
        slug: params?.slug as string,
        date: date,
        ...data,
      });
      if (!success) {
        toast.error(message);
        return;
      }
      toast.success(message);
      setTimeout(() => {
        router.push(routes.success(params?.slug as string));
      }, 1000);
    });
  };

  return (
    <div className="mt-4">
      <Form {...form}>
        <form
          className="space-y-4mx-auto border p-3 sm:p-6 bg-background rounded-lg"
          onSubmit={handleSubmit(onSubmitDetails)}
        >
          <div className="flex flex-col h-auto min-h-56 justify-between">
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="firstName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel htmlFor="firstName" className="mb-1">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className="text-destructive italic text-xs" />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={control}
                name="lastName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel htmlFor="lastName" className="mb-1">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className="text-destructive italic text-xs" />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel htmlFor="email" className="mb-1">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className="text-destructive italic text-xs" />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={control}
                name="mobile"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel htmlFor="mobile" className="mb-1">
                        Mobile
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage className="text-destructive italic text-xs" />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="mt-8">
              <FormField
                control={control}
                name="terms"
                render={({ field: { ref, onChange, ...rest } }) => {
                  return (
                    <FormItem className="flex items-center justify-start gap-4">
                      <FormControl>
                        <Checkbox
                          id="terms"
                          {...rest}
                          onCheckedChange={(event) => {
                            onChange(event ? "true" : "false");
                          }}
                          className="hover:cursor-pointer"
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:cursor-pointer"
                      >
                        Accept terms and conditions
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="mt-8 flex gap-2 sm:gap-4 justify-between items-center">
              <Button
                type="button"
                size="lg"
                disabled={isPrevPending}
                variant="outline"
                onClick={prevStep}
                className="uppercase font-medium flex gap-x-3 grow w-[50%]"
              >
                {isPrevPending ? (
                  <Loader2 className="size-4 shrink-0 animate-spin" />
                ) : (
                  <span>Previous Step</span>
                )}
              </Button>
              <Button
                type="submit"
                size="lg"
                disabled={isPending}
                className="uppercase font-medium flex gap-x-3 grow w-[50%] text-white"
              >
                {isPending ? (
                  <Loader2 className="size-4 shrink-0 animate-spin" />
                ) : (
                  <span>Submit Details</span>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SubmitDetails;
