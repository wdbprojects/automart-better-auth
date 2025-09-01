import { routes } from "@/config/routes";
import { LayoutProps } from "@/config/types";
import Link from "next/link";

const AuthLayoutComp = ({ children }: LayoutProps) => {
  return (
    <div className="relative flex min-h-svh w-full flex-col items-center justify-center px-4">
      <div className="flex w-full flex-col items-center justify-center gap-6">
        {children}
      </div>
    </div>
  );
};
export default AuthLayoutComp;
