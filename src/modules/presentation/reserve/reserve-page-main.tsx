import { ClassifiedWithImagesAndMake, MultiStepFormEnum } from "@/config/types";
import { notFound } from "next/navigation";
import { z } from "zod";

interface ReservePageProps {
  params: { [x: string]: string | string[] | undefined };
  searchParams: { [x: string]: string | string[] | undefined };
  classified: ClassifiedWithImagesAndMake;
  Component: any;
}

const ReservePageMain = ({
  params,
  searchParams,
  classified,
  Component,
}: ReservePageProps) => {
  return (
    <Component
      searchParams={searchParams}
      params={params}
      classified={classified}
    />
  );
};

export default ReservePageMain;
