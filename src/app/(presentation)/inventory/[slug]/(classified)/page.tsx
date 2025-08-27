import { routes } from "@/config/routes";
import { PageProps } from "@/config/types";
import prisma from "@/lib/prisma";
import SingleClassifiedMain from "@/modules/presentation/single-classified/single-classified-main";
import { ClassifiedStatus } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { decode } from "punycode";

const SingleClassifiedPage = async (props: PageProps) => {
  const params = await props?.params;

  const slug = decodeURIComponent(params?.slug as string);
  if (!slug) {
    notFound();
  }

  const classified = await prisma.classified.findUnique({
    where: {
      slug: slug,
    },
    include: { make: true, images: true },
  });

  if (!classified) {
    notFound();
  }

  if (classified.status === ClassifiedStatus.SOLD) {
    redirect(routes.notAvailable(classified.slug));
  }

  return <SingleClassifiedMain {...classified} />;
};

export default SingleClassifiedPage;
