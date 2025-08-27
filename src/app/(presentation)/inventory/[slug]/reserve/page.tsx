import ReservePageMain from "@/modules/presentation/reserve/reserve-page-main";
import { MultiStepFormEnum, PageProps } from "@/config/types";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { MultiStepFormSchema } from "@/app/schemas/reserve-form-schema";
import WelcomeComponent from "@/modules/components/reserve/welcome";
import SelectDate from "@/modules/components/reserve/select-date";
import SubmitDetails from "@/modules/components/reserve/submit-details";

const MAP_STEP_TO_COMPONENT = {
  [MultiStepFormEnum.WELCOME]: WelcomeComponent,
  [MultiStepFormEnum.SELECT_DATE]: SelectDate,
  [MultiStepFormEnum.SUBMIT_DETAILS]: SubmitDetails,
};

const ReservePage = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const slug = params?.slug;
  const step = searchParams?.step;

  const { data, success, error } = MultiStepFormSchema.safeParse({
    slug: slug,
    step: Number(step),
  });

  if (!success) {
    console.log(error);
    return notFound();
  }

  const classified = await prisma.classified.findUnique({
    where: { slug: data?.slug },
    include: { make: true, images: true },
  });

  if (!classified) notFound();

  const Component = MAP_STEP_TO_COMPONENT[data.step as MultiStepFormEnum];
  if (!Component) notFound();

  return (
    <ReservePageMain
      params={params ?? {}}
      searchParams={searchParams ?? {}}
      classified={classified}
      Component={Component}
    />
  );
};

export default ReservePage;
