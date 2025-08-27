"use client";

import { Prisma } from "@prisma/client";
import dynamic from "next/dynamic";
import { Navigation } from "swiper/modules";
import SkeletonCard from "./skeleton-card";
import { SwiperSlide } from "swiper/react";
import ClassifiedCard from "@/modules/components/inventory/classified-card";
import SwiperButtons from "@/modules/components/single-classified-comps/swiper-buttons";
import "swiper/css";

interface CarouselProps {
  classifieds: Prisma.ClassifiedGetPayload<{ include: { images: true } }>[];
  favourites: number[];
}

const Swiper = dynamic(
  () =>
    import("swiper/react").then((mod) => {
      return mod.Swiper;
    }),
  {
    ssr: false,
    loading: () => {
      // return <CarouselSkeleton />;
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8 ">
          {[1, 2, 3, 4].map((_, index) => {
            return <SkeletonCard key={index} />;
          })}
        </div>
      );
    },
  },
);

const LatestArrivalCarousel = (props: CarouselProps) => {
  const { classifieds, favourites } = props;

  return (
    <div className="mt-8 relative">
      <Swiper
        pagination={{ clickable: true }}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        modules={[Navigation]}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1536: { slidesPerView: 4 },
        }}
      >
        {classifieds.map((classified) => {
          return (
            <SwiperSlide key={classified.id}>
              <ClassifiedCard classified={classified} favourites={favourites} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <SwiperButtons
        prevClassName="swiper-button-prev absolute -left-10 sm:-left-16 border-1 border-border hidden lg:flex"
        nextClassName="swiper-button-next absolute -right-10 sm:-right-16 border-1 border-border hidden lg:flex"
      />
    </div>
  );
};

export default LatestArrivalCarousel;
