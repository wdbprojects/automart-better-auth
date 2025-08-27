import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { CarIcon, HomeIcon } from "lucide-react";
import Link from "next/link";

const EndButtons = () => {
  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <Button asChild variant="secondary">
        <Link href={routes.home}>
          <HomeIcon className="mr-2 h-5 w-5" />
          <span>Go to homepage</span>
        </Link>
      </Button>
      <Button asChild variant="default">
        <Link href={routes.inventory} className="text-white">
          <CarIcon className="mr-2 h-5 w-5" />
          <span>Go to inventory</span>
        </Link>
      </Button>
    </div>
  );
};

export default EndButtons;
