import { ReactNode } from "react";
import AboutLayout from "@/modules/layouts/about-layout";

interface PresentationLayoutProps {
  children: ReactNode;
}

const AboutLayoutMain = ({ children }: PresentationLayoutProps) => {
  return <AboutLayout>{children}</AboutLayout>;
};

export default AboutLayoutMain;
