import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";

interface LayoutProps {
  children: ReactNode;
}

const InventoryLayout = ({ children }: LayoutProps) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};

export default InventoryLayout;
