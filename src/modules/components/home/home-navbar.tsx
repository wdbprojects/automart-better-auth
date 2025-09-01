import Link from "next/link";
import DarkMode from "@/components/shared/dark-mode";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Heart, KeySquare, LogIn, MenuIcon } from "lucide-react";
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
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import LoginLogoutButtons from "@/components/utils/login-logout-buttons";

const HomeNavbar = async () => {
  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId ?? "");
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <nav className="bg-background fixed top-0 right-0 z-50 flex h-16 w-full items-center justify-between border-b px-2 py-2">
      <div className="flex w-full items-center justify-between gap-1 sm:gap-2 md:gap-4">
        {/* //NOTE: MENU & LOGO */}
        <div className="item-center flex flex-shrink-0 gap-2 p-1">
          <Link
            href={routes.home}
            className="hidden cursor-pointer flex-row items-center gap-0 sm:flex"
          >
            <h6 className="text-primary text-xl font-extrabold tracking-tight">
              Auto
            </h6>
            <h6 className="text-foreground text-xl font-extrabold tracking-tight">
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

          <span className="text-center text-xl">
            <Button size="sm" variant="outline" asChild>
              <Link
                href={routes.inventory}
                className="dark:text-muted-foreground !font-medium"
              >
                Search Inventory
              </Link>
            </Button>
          </span>
          {/* // INFO: LOGIN & LOGOUT BUTTONS */}
          {session ? (
            <LoginLogoutButtons />
          ) : (
            <Button variant="default" size="sm" className="text-white">
              <Link href={routes.login} className="flex items-center gap-2">
                <LogIn className="size-3.5" />
                <span>Login</span>
              </Link>
            </Button>
          )}

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
                        className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center"
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
                      <MenuIcon className="!h-6 !w-6" strokeWidth={1.3} />
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
                        className="text-foreground/80 hover:text-foreground bg-secondary/70 hover:bg-secondary/90 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
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
