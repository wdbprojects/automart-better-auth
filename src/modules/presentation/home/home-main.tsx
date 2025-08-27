import { Button } from "@/components/ui/button";
import { AwaitedPageProps, PageProps } from "@/config/types";
import BrandsSection from "@/modules/components/home/brands-section";
import FeaturesSection from "@/modules/components/home/features-section";
import HeroSection from "@/modules/components/home/hero-section";
import LatestArrivalSection from "@/modules/components/home/latest-arrival-section";

const HomeMain = ({ searchParams }: AwaitedPageProps) => {
  return (
    <div className="w-full min-h-screen bg-background">
      <HeroSection searchParams={searchParams} />
      <FeaturesSection />
      <LatestArrivalSection />
      <BrandsSection />
    </div>
  );
};

export default HomeMain;
