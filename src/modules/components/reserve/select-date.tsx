"use client";

import { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  selectDateSchema,
  SelectDateType,
} from "@/app/schemas/reserve-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MultiStepFormComponentProps, MultiStepFormEnum } from "@/config/types";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import SelectCompOrig from "@/components/shared/select-comp-orig";
import { generateDateOptions, generateTimeOptions } from "@/lib/utils";
import { routes } from "@/config/routes";
import { env } from "@/env";
import { Button } from "@/components/ui/button";
import { Loader, Loader2 } from "lucide-react";

const SelectDate = (props: MultiStepFormComponentProps) => {
  const [isPending, startTransition] = useTransition();
  const [isPrevPending, startPrevTransition] = useTransition();

  const { searchParams } = props;
  const router = useRouter();

  const handoverDate = (searchParams?.handoverDate as string) ?? undefined;
  const handoverTime = (searchParams?.handoverTime as string) ?? undefined;

  const form = useForm<SelectDateType>({
    resolver: zodResolver(selectDateSchema),
    defaultValues: {
      handoverDate: handoverDate
        ? decodeURIComponent(handoverDate)
        : handoverDate,
      handoverTime: handoverTime
        ? decodeURIComponent(handoverTime)
        : handoverTime,
    },
    mode: "onBlur",
  });

  const { handleSubmit, control, trigger, reset } = form;

  const prevStep = () => {
    startPrevTransition(async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 500);
        const url = new URL(window.location.href);
        url.searchParams.set("step", MultiStepFormEnum.WELCOME.toString());
        router.push(url.toString());
      });
    });
  };

  const onSelectDate: SubmitHandler<SelectDateType> = (data) => {
    startTransition(async () => {
      const valid = await trigger();
      if (!valid) return;
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 500);
      });
      const url = new URL(
        routes.reserve(props.classified.slug, MultiStepFormEnum.SUBMIT_DETAILS),
        env.NEXT_PUBLIC_APP_URL,
      );
      url.searchParams.set(
        "handoverDate",
        encodeURIComponent(data.handoverDate),
      );
      url.searchParams.set(
        "handoverTime",
        encodeURIComponent(data.handoverTime),
      );
      router.push(url.toString());
    });
  };

  return (
    <div className="mt-4 w-full">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSelectDate)}
          className="space-y-4 mx-auto p-6 bg-sidebar rounded-lg w-full"
        >
          <div className="flex flex-col items-center h-auto min-h-56 max-w-4xl mx-auto">
            <div className="flex-1 flex flex-col gap-8 w-full">
              <FormField
                control={control}
                name="handoverDate"
                render={({ field: { ref, ...rest } }) => {
                  return (
                    <FormItem>
                      <FormLabel htmlFor="handoverDate">
                        Select a Date
                      </FormLabel>
                      <FormControl>
                        <SelectCompOrig
                          options={generateDateOptions()}
                          {...rest}
                        />
                      </FormControl>
                      <FormMessage className="text-destructive italic text-xs" />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={control}
                name="handoverTime"
                render={({ field: { ref, ...rest } }) => {
                  return (
                    <FormItem>
                      <FormLabel htmlFor="handoverTime">
                        Select a Time
                      </FormLabel>
                      <FormControl>
                        <SelectCompOrig
                          className="[&>input]:bg-sidebar"
                          options={generateTimeOptions()}
                          {...rest}
                        />
                      </FormControl>
                      <FormMessage className="text-destructive italic text-xs" />
                    </FormItem>
                  );
                }}
              />
            </div>
          </div>
          <div className="mt-8 flex gap-4 justify-between items-center w-full max-w-4xl mx-auto">
            <Button
              type="button"
              size="lg"
              disabled={isPrevPending}
              variant="outline"
              onClick={prevStep}
              className="uppercase font-medium gap-x-3 grow w-[50%] max-w-4xl mx-auto rounded-full"
            >
              {isPrevPending ? (
                <Loader2 className="size-4 shrink-0 animate-spin" />
              ) : (
                <span>Previous Step</span>
              )}
            </Button>
            <Button
              variant="default"
              type="submit"
              size="lg"
              disabled={isPending}
              className="uppercase font-medium gap-x-3 grow w-[50%] text-white rounded-full"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span>Continue</span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default SelectDate;
