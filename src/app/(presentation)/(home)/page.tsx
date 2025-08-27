import { PageProps } from "@/config/types";
import HomeMain from "@/modules/presentation/home/home-main";

const HomePage = async (props: PageProps) => {
  const searchParams = await props.searchParams;

  return <HomeMain searchParams={searchParams ?? {}} />;
};

export default HomePage;
