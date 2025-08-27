"use client";

import { useCallback, useState } from "react";
import { Image as PrismaImage } from "@prisma/client";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/virtual";
import { EffectFade, Navigation, Thumbs, Virtual } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { type Swiper as SwiperType } from "swiper";
import dynamic from "next/dynamic";
import SwiperButtons from "./swiper-buttons";
import { ImgixImage } from "@/components/shared/imgix-image";
import CarouselSkeleton from "./carrousel-skeleton";
import FsLightbox from "fslightbox-react";
import { imgixLoader } from "@/lib/imgix-loader";

interface ClassifiedCarrouselProps {
  images: PrismaImage[];
}

const Swiper = dynamic(
  () =>
    import("swiper/react").then((mod) => {
      return mod.Swiper;
    }),
  {
    ssr: false,
    loading: () => {
      return <CarouselSkeleton />;
    },
  },
);

const SwiperThumb = dynamic(
  () =>
    import("swiper/react").then((mod) => {
      return mod.Swiper;
    }),
  { ssr: false, loading: () => null },
);

const ClassifiedCarrousel = ({ images }: ClassifiedCarrouselProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    sourceIndex: 0,
  });

  const setSwiper = (swiper: SwiperType) => {
    setThumbsSwiper(swiper);
  };

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  }, []);

  const handleImageClick = useCallback(() => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      sourceIndex: activeIndex,
    });
  }, [lightboxController.toggler, activeIndex]);

  const sources = images.map((image) => {
    return imgixLoader({ src: image.src, width: 2400, quality: 100 });
  });

  return (
    <>
      <FsLightbox
        toggler={lightboxController.toggler}
        sourceIndex={lightboxController.sourceIndex}
        sources={sources}
        type="image"
      />
      <div>
        <div className="relative">
          <Swiper
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            effect="fade"
            spaceBetween={10}
            fadeEffect={{ crossFade: true }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[EffectFade, Navigation, Thumbs, Virtual]}
            virtual={{
              addSlidesAfter: 8,
              enabled: true,
            }}
            className="aspect-3/2"
            onSlideChange={handleSlideChange}
          >
            {images.map((image, index) => {
              return (
                <SwiperSlide key={image.id} virtualIndex={index}>
                  <ImgixImage
                    placeholder="blur"
                    blurDataURL={image.blurhash}
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={600}
                    quality={45}
                    className="aspect-3/2 object-cover rounded-md cursor-pointer"
                    onClick={handleImageClick}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <SwiperButtons
            prevClassName="left-4 !bg-background/70 border-none cursor-pointer"
            nextClassName="right-4 !bg-background/70 border-none cursor-pointer"
          />
        </div>
        <SwiperThumb
          onSwiper={setSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Navigation, Thumbs, EffectFade]}
        >
          {images.map((image) => {
            return (
              <SwiperSlide
                key={image.id}
                className="relative mt-2 h-fit w-full cursor-grab"
              >
                <ImgixImage
                  key={image.id}
                  className="object-cover aspect-3/2 rounded-md"
                  src={image.src}
                  width={150}
                  height={100}
                  quality={1}
                  alt={image.alt}
                  placeholder="blur"
                  blurDataURL={image.blurhash}
                />
              </SwiperSlide>
            );
          })}
        </SwiperThumb>
      </div>
    </>
  );
};

export default ClassifiedCarrousel;
