"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <NextTopLoader showSpinner={false} />
      <NuqsAdapter>{children}</NuqsAdapter>
      <Toaster richColors closeButton position="bottom-right" />
    </ThemeProvider>
  );
};

export default Providers;
