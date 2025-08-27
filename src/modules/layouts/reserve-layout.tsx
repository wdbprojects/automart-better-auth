import { LayoutProps } from "@/config/types";
import HomeNavbar from "@/modules/components/home/home-navbar";
import HomeFooter from "@/modules/components/home/home-footer";
import FormHeader from "@/modules/components/reserve/form-header";

const ReserveLayoutModule = ({ children }: LayoutProps) => {
  return (
    <div className="w-full min-h-screen">
      <HomeNavbar />
      <div className="flex flex-col justify-between pt-[4rem] !h-screen">
        <main className="w-full max-w-5xl mx-auto p-6 sm:p-8 md:p-10 !pt-[4rem] ">
          <FormHeader />
          {children}
        </main>
        <HomeFooter />
      </div>
    </div>
  );
};

export default ReserveLayoutModule;
