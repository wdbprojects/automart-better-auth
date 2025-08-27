import DarkMode from "@/components/shared/dark-mode";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import SearchInput from "../inventory-sidebar/search-input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Heart, MenuIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/lib/data-links";
import { Favourites } from "@/config/types";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";

const InventoryNavbar = async () => {
  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId ?? "");

  return (
    <nav className="fixed top-0 right-0 px-2 z-50 flex justify-between items-center border-b bg-background h-16 py-2 w-full">
      <div className="flex items-center gap-1 sm:gap-2 md:gap-4 w-full justify-between">
        {/* //NOTE: MENU & LOGO */}
        <div className="flex item-center gap-2 flex-shrink-0 p-1">
          <SidebarTrigger />
          <Link
            href="/"
            className="cursor-pointer hidden sm:flex flex-row gap-0 items-center"
          >
            <h6 className="text-xl font-extrabold text-primary tracking-tight">
              Auto
            </h6>
            <h6 className="text-xl font-extrabold text-foreground tracking-tight">
              Mart
            </h6>
          </Link>
        </div>
        {/* //NOTE: SEARCH BAR*/}
        <div className="flex-1 hidden md:flex justify-center max-w-[720px] mx-auto p-1">
          {/* <SearchInputNav /> */}
          <SearchInput
            className="w-full pr-12 shadow-none rounded-full max-w-[600px] mx-auto pl-8"
            placeholder="Search for classifieds..."
          />
        </div>
        {/* //NOTE: AUTH */}
        <div className="flex flex-shrink-0 items-center gap-3 p-1">
          <DarkMode />
          <Button size="sm" className="cursor-pointer text-white" asChild>
            <Link href="/">Sign In</Link>
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className="cursor-pointer"
                  variant="outline"
                  asChild
                >
                  <Link href="/favourites" className="relative">
                    <Heart />
                    {favourites?.ids.length && favourites?.ids.length > 0 ? (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center"
                      >
                        {favourites?.ids.length}
                      </Badge>
                    ) : null}
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-white dark:text-foreground">Favourites</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Sheet>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SheetTrigger asChild className="cursor-pointer">
                    <Button variant="outline" size="icon" className="!p-0">
                      <MenuIcon className="!w-6 !h-6" strokeWidth={1.3} />
                    </Button>
                  </SheetTrigger>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
            <SheetContent side="right" className="w-full max-w-xs p-4">
              <SheetHeader>
                <SheetTitle>Main Menu</SheetTitle>
                <nav className="grid gap-2">
                  {navLinks.map((link) => {
                    const { id, name, href } = link;
                    return (
                      <Link
                        key={id}
                        href={href}
                        className="flex items-center gap-2 py-2 text-sm font-medium text-foreground/80 hover:text-foreground bg-secondary/70 hover:bg-secondary/90 rounded-md px-4 transition-colors"
                      >
                        {name}
                      </Link>
                    );
                  })}
                </nav>
                <SheetFooter>
                  <SheetClose asChild>
                    <SheetDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </SheetDescription>
                  </SheetClose>
                </SheetFooter>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default InventoryNavbar;
