import HomeLayout from "@/modules/layouts/home-layout";
import { ReactNode } from "react";

interface PresentationLayoutProps {
  children: ReactNode;
}

const HomeLayoutMain = ({ children }: PresentationLayoutProps) => {
  return <HomeLayout>{children}</HomeLayout>;
};

export default HomeLayoutMain;
