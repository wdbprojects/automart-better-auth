import { ReactNode } from "react";
import InventoryLayout from "@/modules/layouts/inventory-layout";

interface PresentationLayoutProps {
  children: ReactNode;
}

const InventaryLayout = ({ children }: PresentationLayoutProps) => {
  return <InventoryLayout>{children}</InventoryLayout>;
};

export default InventaryLayout;
