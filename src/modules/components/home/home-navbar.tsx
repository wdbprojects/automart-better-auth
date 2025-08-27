import Link from "next/link";
import DarkMode from "@/components/shared/dark-mode";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
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
import { routes } from "@/config/routes";
import { getSourceId } from "@/lib/source-id";
import { redis } from "@/lib/redis-store";
import { Favourites } from "@/config/types";

const HomeNavbar = async () => {
  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId ?? "");

  return (
    <nav className="fixed top-0 right-0 px-2 z-50 flex justify-between items-center border-b bg-background h-16 py-2 w-full">
      <div className="flex items-center gap-1 sm:gap-2 md:gap-4 w-full justify-between">
        {/* //NOTE: MENU & LOGO */}
        <div className="flex item-center gap-2 flex-shrink-0 p-1">
          <Link
            href={routes.home}
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
        {/* <div className="flex-1 hidden md:flex justify-center max-w-[720px] mx-auto border p-1">
          <span className="text-xl text-center">SEARCH BAR GOES HERE HOME</span>
        </div> */}
        {/* <div>
          <span className="text-xl text-center ">
            <Button size="sm" variant="default" asChild>
              <Link
                href="/inventory"
                className="!font-semibold dark:text-muted-foreground"
              >
                Search Inventory
              </Link>
            </Button>
          </span>
        </div> */}
        {/* //NOTE: BUTTONS & AUTH */}
        <div className="flex flex-shrink-0 items-center gap-3 p-1">
          <DarkMode />

          <span className="text-xl text-center ">
            <Button size="sm" variant="outline" asChild>
              <Link
                href="/inventory"
                className="!font-medium dark:text-muted-foreground"
              >
                Search Inventory
              </Link>
            </Button>
          </span>

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

export default HomeNavbar;
