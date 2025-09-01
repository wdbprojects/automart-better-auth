import { ReactNode } from "react";
import HomeNavbar from "@/modules/components/home/home-navbar";
import HomeFooter from "@/modules/components/home/home-footer";

interface LayoutProps {
  children: ReactNode;
}

const AboutLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen w-full">
      <HomeNavbar />
      <div className="flex !h-screen w-full flex-col justify-between pt-[4rem]">
        <main className="flex overflow-y-auto">{children}</main>
        <HomeFooter />
      </div>
    </div>
  );
};

export default AboutLayout;
