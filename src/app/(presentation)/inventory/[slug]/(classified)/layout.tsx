import SingleClassifiedLayoutModule from "@/modules/layouts/single-classified-layout";
import { ReactNode } from "react";

interface PresentationLayoutProps {
  children: ReactNode;
}

const SingleClassifiedLayout = ({ children }: PresentationLayoutProps) => {
  return (
    <SingleClassifiedLayoutModule>{children}</SingleClassifiedLayoutModule>
  );
};

export default SingleClassifiedLayout;
