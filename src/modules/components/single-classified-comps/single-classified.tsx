import { ClassifiedWithImagesAndMake, MultiStepFormEnum } from "@/config/types";
import ClassifiedCarrousel from "./classified-carrousel";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  formatColor,
  formatFuelType,
  formatNumber,
  formatOdometerUnit,
  formatPrice,
} from "@/lib/format-data";
import { HTMLParser } from "@/components/shared/html-parser";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import Link from "next/link";
import { features } from "./features-classifieds";

const SingleClassified = (props: ClassifiedWithImagesAndMake) => {
  const {
    color,
    currency,
    description,
    fuelType,
    make,
    odometerReading,
    odometerUnit,
    price,
    slug,
    title,
    year,
    images,
  } = props;

  return (
    <div className="flex flex-col container mx-auto !px-4 md:px-0 py-12">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <ClassifiedCarrousel images={images} />
        </div>
        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <Image
              src={make.image}
              alt={make.name}
              width={120}
              height={120}
              className="w-20 mr-4"
            />
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
              {title}
            </h1>
          </div>
          <div className="mt-4 flex items-center space-x-2 mb-2">
            <Badge variant="outline" className="py-1 px-3">
              {year}
            </Badge>
            <Badge variant="outline" className="py-1 px-3">
              {formatNumber(odometerReading)}&nbsp;
              {formatOdometerUnit(odometerUnit)}
            </Badge>
            <Badge variant="outline" className="py-1 px-3">
              {formatColor(color)}
            </Badge>
            <Badge variant="outline" className="py-1 px-3">
              {formatFuelType(fuelType)}
            </Badge>
          </div>
          {description && (
            <p className="mt-4">
              <HTMLParser html={description} />
            </p>
          )}
          <div className="text-4xl font-medium my-4 w-full border border-muted-foreground flex justify-center items-center rounded-xl py-12">
            Our Price: {formatPrice({ price, currency })}
          </div>
          <Button
            asChild
            variant="default"
            size="lg"
            className="uppercase font-bold py-3 px-6 w-full mb-4"
          >
            <Link
              href={routes.reserve(slug, MultiStepFormEnum.WELCOME)}
              className="text-white"
            >
              Reserve Now
            </Link>
          </Button>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {features(props).map(({ id, icon, label }) => {
              return (
                <div
                  key={id}
                  className="w-full bg-muted rounded-lg shadow-xs p-0 text-center flex-col justify-center items-center gap-0 py-2"
                >
                  <span className="w-full flex justify-center items-end">
                    {icon}
                  </span>
                  <p className="text-sm font-medium mt-1 text-muted-foreground">
                    {label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleClassified;
