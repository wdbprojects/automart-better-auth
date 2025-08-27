"use client";

import { subscribeAction } from "@/app/_actions/subscribe";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SubscribeSchema } from "@/app/schemas/subscribe.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

/* BUTTON */
const SubscribeButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      aria-hidden="true"
      size="sm"
      className="mt-1 w-full dark:text-foreground"
    >
      {pending && (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />
      )}{" "}
      Subscribe now
    </Button>
  );
};

const NewsletterForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [state, formAction] = useActionState(subscribeAction, {
    success: false,
    message: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof SubscribeSchema>>({
    resolver: zodResolver(SubscribeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    mode: "onChange",
  });

  const { control, reset } = form;

  const handleFormAction = async (formData: FormData) => {
    const valid = await form.trigger();
    if (!valid) return;
    startTransition(() => {
      formAction(formData);
    });
    setOpenDialog(false);
  };

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    }
    // TODO: add toast when user already subscribed
    reset();
  }, [state.success]);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <Button
        variant="outline"
        className="w-full max-w-[300px]"
        size="sm"
        onClick={() => {
          setOpenDialog(true);
          reset();
        }}
      >
        Subscribe to newsletter
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-2">
            Get the latest from our inventory updates
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            ref={formRef}
            className="space-y-3"
            action={handleFormAction}
            onSubmit={() => {
              return null;
            }}
          >
            <div className="flex items-stretch justify-between gap-2">
              <FormField
                control={control}
                name="firstName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl className="!mb-0">
                        <Input
                          placeholder="First name"
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-destructive" />
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
                      <FormControl className="!mb-0">
                        <Input
                          placeholder="Last name"
                          {...field}
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-destructive" />
                    </FormItem>
                  );
                }}
              />
            </div>
            <FormField
              control={control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl className="!mb-0">
                      <Input
                        placeholder="Email"
                        {...field}
                        type="email"
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-destructive" />
                  </FormItem>
                );
              }}
            />

            <SubscribeButton />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterForm;
