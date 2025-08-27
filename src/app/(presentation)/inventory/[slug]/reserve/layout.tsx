import { LayoutProps } from "@/config/types";
import ReserveLayoutModule from "@/modules/layouts/reserve-layout";

const ReserveLayout = ({ children }: LayoutProps) => {
  return <ReserveLayoutModule>{children}</ReserveLayoutModule>;
};

export default ReserveLayout;
