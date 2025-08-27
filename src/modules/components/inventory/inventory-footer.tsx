import NewsletterForm from "@/components/shared/newsletter-form";
import { routes } from "@/config/routes";
import { socialLinks } from "@/lib/data-links";
import Link from "next/link";

const InventoryFooter = () => {
  return (
    <div className="px-8 lg:px-3 py-8 w-full flex justify-center bg-muted rounded-t-md mt-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
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
          <div className="flex space-x-4">
            {socialLinks.map((link) => {
              const { id, href, icon } = link;
              return (
                <Link href={href} key={id}>
                  {icon}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="space-y-2">
          <ul className="space-y-1">
            <li>
              <Link
                href={routes.home}
                className="text-foreground hover:text-primary font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={routes.inventory}
                className="text-foreground hover:text-primary font-medium"
              >
                Inventory
              </Link>
            </li>
            <li>
              <Link
                href={routes.favourites}
                className="text-foreground hover:text-primary font-medium"
              >
                Favourites
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InventoryFooter;
