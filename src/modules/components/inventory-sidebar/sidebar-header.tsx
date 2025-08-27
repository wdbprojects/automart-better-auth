"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { AwaitedPageProps } from "@/config/types";
import { parseAsString, useQueryStates } from "nuqs";
import { routes } from "@/config/routes";
import { env } from "@/env";

const SidebarHeader = ({ searchParams }: AwaitedPageProps) => {
  const [filterCount, setFilterCount] = useState(0);

  useEffect(() => {
    const filterCount = Object.entries(
      searchParams as Record<string, string>,
    ).filter(([key, value]) => {
      return key !== "page" && value;
    }).length;
    setFilterCount(filterCount);
  }, [searchParams]);

  const clearAllFilters = () => {
    const url = new URL(routes.inventory, env.NEXT_PUBLIC_APP_URL);
    window.location.replace(url.toString());
    setFilterCount(0);
  };

  return (
    <SidebarGroup className="py-0">
      <SidebarGroupContent>
        <div className="pt-2 m-0 block">
          <div className="text-base font-semibold flex justify-between items-center ">
            <span className="pl-2">Filters</span>
            <Button
              type="button"
              onClick={clearAllFilters}
              size="sm"
              variant="ghost"
              aria-disabled={filterCount === 0}
              className={cn(
                "text-sm font-medium hover:text-primary hover:no-underline disabled:cursor-not-allowed disabled:text-muted-foreground",
              )}
              disabled={!filterCount ? true : false}
            >
              Clear all {filterCount ? `(${filterCount})` : null}
            </Button>
          </div>
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarHeader;
