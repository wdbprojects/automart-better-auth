import { ReactNode } from "react";
import HomeNavbar from "../components/home/home-navbar";
import HomeFooter from "../components/home/home-footer";

interface LayoutProps {
  children: ReactNode;
}

const SingleClassifiedLayoutModule = ({ children }: LayoutProps) => {
  return (
    <div className="w-full min-h-screen">
      <HomeNavbar />
      <div className="flex flex-col pt-[4rem] !h-screen justify-between">
        <main>{children}</main>
        <HomeFooter />
      </div>
    </div>
  );
};

export default SingleClassifiedLayoutModule;
