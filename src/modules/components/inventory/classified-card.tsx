"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import {
  ClassifiedCardProps,
  ClassifiedWithImages,
  MultiStepFormEnum,
} from "@/config/types";
import FavouriteButton from "./favorite-button";
import { HTMLParser } from "@/components/shared/html-parser";
import { Cog, Fuel, GaugeCircle, Paintbrush2 } from "lucide-react";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  formatColor,
  formatFuelType,
  formatNumber,
  formatOdometerUnit,
  formatPrice,
  formatTransmission,
} from "@/lib/format-data";
import { ImgixImage } from "@/components/shared/imgix-image";

const ClassifiedCard = ({ classified, favourites }: ClassifiedCardProps) => {
  const [isFavourite, setIsFavourite] = useState(
    favourites.includes(classified.id),
  );
  const [isVisible, setIsVisible] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    if (!isFavourite && pathname === routes.favourites) {
      setIsVisible(false);
    }
  }, [isFavourite]);

  const getKeyClassifiedInfo = (classified: ClassifiedWithImages) => {
    return [
      {
        id: "odometerReading",
        icon: <GaugeCircle className="w-4 h-4" />,
        value: `${formatNumber(
          classified?.odometerReading,
        )} ${formatOdometerUnit(classified?.odometerUnit)}`,
      },
      {
        id: "transmission",
        icon: <Cog className="w-4 h-4" />,
        value: formatTransmission(classified?.transmission),
      },
      {
        id: "fuelType",
        icon: <Fuel className="w-4 h-4" />,
        value: formatFuelType(classified?.fuelType),
      },
      {
        id: "color",
        icon: <Paintbrush2 className="w-4 h-4" />,
        value: formatColor(classified?.color),
      },
    ];
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="w-full pt-0 pb-4 gap-2 rounded-md overflow-hidden flex flex-col justify-between space-y-2">
            <CardContent className="px-0 relative">
              <Link href={routes.singleClassified(classified.slug)}>
                <ImgixImage
                  placeholder="blur"
                  blurDataURL={classified.images[0]?.blurhash}
                  src={classified.images[0]?.src}
                  alt={classified.images[0]?.alt}
                  width={500}
                  height={300}
                  quality={25}
                  className="object-cover w-auto h-auto"
                />
              </Link>
              <div className="absolute top-2.5 right-3.5 bg-secondary dark:bg-[#eff6ff] dark:text-background px-2 py-1 rounded">
                <p className="text-xs lg:text-sm font-semibold">
                  {formatPrice({
                    price: classified.price,
                    currency: classified.currency,
                  })}
                </p>
              </div>
              <FavouriteButton
                isFavourite={isFavourite}
                setIsFavourite={setIsFavourite}
                id={classified.id}
              />
              <div className="flex flex-col space-y-1 px-2 pt-2">
                <Link
                  href={routes.singleClassified("slug")}
                  className="text-sm md:text-sm lg:text-base leading-5 line-clamp-1 capitalize transition-colors hover:text-primary"
                >
                  {classified.title}
                </Link>
                {classified?.description && (
                  <div className="text-sm leading-5 text-muted-foreground line-clamp-2 mb-2">
                    <HTMLParser html={classified.description} />
                    &nbsp;
                  </div>
                )}
                <ul className="grid grid-cols-2 gap-1.5">
                  {getKeyClassifiedInfo(classified)
                    .filter((val) => {
                      return val.value;
                    })
                    .map((info) => {
                      return (
                        <li
                          key={info.id}
                          className="flex items-center gap-1.5 font-normal text-xs text-muted-foreground"
                        >
                          {info.icon}
                          {info.value}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="px-2 flex flex-col sm:flex-row justify-between items-center gap-2">
              <Button
                variant="outline"
                className="cursor-pointer sm:flex-1 w-full"
                size="sm"
              >
                <Link
                  href={routes.reserve(
                    classified.slug,
                    MultiStepFormEnum.WELCOME,
                  )}
                  className="text-xs"
                >
                  Reserve
                </Link>
              </Button>
              <Button
                variant="default"
                size="sm"
                className="cursor-pointer sm:flex-1 w-full text-white dark:text-foreground"
              >
                <Link
                  href={routes.singleClassified(classified.slug)}
                  className="text-xs font-semibold"
                >
                  View details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ClassifiedCard;
