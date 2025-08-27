"use client";

import { ChangeEvent } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import SidebarHeader from "./sidebar-header";
import SidebarFilters from "./sidebar-filters";
import { AwaitedPageProps, MinMaxResultType } from "@/config/types";
import { parseAsString, useQueryStates } from "nuqs";
import { useRouter } from "next/navigation";
import NewsletterForm from "@/components/shared/newsletter-form";

interface SidebarProps extends AwaitedPageProps {
  minMaxResult: MinMaxResultType;
}

const SidebarMain = ({ minMaxResult, searchParams }: SidebarProps) => {
  const router = useRouter();

  const [queryStates, setQueryStates] = useQueryStates(
    {
      make: parseAsString.withDefault(""),
      model: parseAsString.withDefault(""),
      modelVariant: parseAsString.withDefault(""),
      minYear: parseAsString.withDefault(""),
      maxYear: parseAsString.withDefault(""),
      minPrice: parseAsString.withDefault(""),
      maxPrice: parseAsString.withDefault(""),
      minReading: parseAsString.withDefault(""),
      maxReading: parseAsString.withDefault(""),
      currency: parseAsString.withDefault(""),
      odometerUnit: parseAsString.withDefault(""),
      transmission: parseAsString.withDefault(""),
      fuelType: parseAsString.withDefault(""),
      bodyType: parseAsString.withDefault(""),
      color: parseAsString.withDefault(""),
      doors: parseAsString.withDefault(""),
      seats: parseAsString.withDefault(""),
      ulezCompliance: parseAsString.withDefault(""),
    },
    {
      shallow: false,
    },
  );

  const handleChange = async (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    event.preventDefault();
    const { name, value } = event.target;
    setQueryStates({
      [name]: value || null,
    });
    if (name === "make") {
      setQueryStates({
        model: null,
        modelVariant: null,
      });
    }
    router.refresh();
  };

  return (
    <Sidebar
      className="pt-18 z-40 rounded border-none"
      variant="floating"
      collapsible="offcanvas"
    >
      <SidebarContent className="py-0 pb-16  m-1">
        <SidebarHeader searchParams={searchParams} />
        <hr className="mx-2" />
        <SidebarFilters
          handleChange={handleChange}
          searchParams={searchParams}
          minMaxResult={minMaxResult}
          queryStates={queryStates}
        />
      </SidebarContent>
      <SidebarFooter className="bg-background rounded-b-lg p-4">
        <div className="flex justify-center w-full rounded-sm">
          <NewsletterForm />
        </div>
        <div className="px-0 py-2 bg-secondary text-sm text-center">
          AutoMart &copy; 2025
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarMain;
