import { ReactNode } from "react";
import FavouritesLayoutModule from "@/modules/layouts/favorites-layout";

interface PresentationLayoutProps {
  children: ReactNode;
}

const FavouritesLayout = ({ children }: PresentationLayoutProps) => {
  return <FavouritesLayoutModule>{children}</FavouritesLayoutModule>;
};

export default FavouritesLayout;
