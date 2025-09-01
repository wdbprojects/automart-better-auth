import { LayoutProps } from "@/config/types";
import AuthLayoutComp from "@/modules/layouts/auth-layout";

const AuthLayout = ({ children }: LayoutProps) => {
  return <AuthLayoutComp>{children}</AuthLayoutComp>;
};
export default AuthLayout;
