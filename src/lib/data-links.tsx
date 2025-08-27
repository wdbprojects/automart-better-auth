import { routes } from "@/config/routes";
import { SiYoutube, SiMeta, SiDiscord } from "@icons-pack/react-simple-icons";
import { Icon } from "lucide-react";

export const navLinks = [
  {
    id: 1,
    name: "Home",
    href: routes.home,
  },
  {
    id: 2,
    name: "About",
    href: routes.about,
  },
  {
    id: 3,
    name: "Inventory",
    href: routes.inventory,
  },
];

export const socialLinks = [
  {
    id: 1,
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <SiYoutube className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
    ),
  },
  {
    id: 2,
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <SiMeta className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
    ),
  },
  {
    id: 3,
    name: "Discord",
    href: "https://discord.com",
    icon: (
      <SiDiscord className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
    ),
  },
];
