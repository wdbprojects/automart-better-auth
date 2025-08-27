import { ClassifiedWithImagesAndMake } from "@/config/types";
import {
  formatBodyType,
  formatFuelType,
  formatNumber,
  formatOdometerUnit,
  formatTransmission,
} from "@/lib/format-data";
import {
  Car,
  CarFront,
  Fingerprint,
  Fuel,
  Gauge,
  Power,
  User,
} from "lucide-react";

export const features = (props: ClassifiedWithImagesAndMake) => {
  return [
    {
      id: 1,
      icon: <Fingerprint className="w-6- h-6 mx-auto text-muted-foreground" />,
      label: props.vrm,
    },
    {
      id: 2,
      icon: <Car className="w-6- h-6 mx-auto text-muted-foreground" />,
      label: formatBodyType(props.bodyType),
    },
    {
      id: 3,
      icon: <Fuel className="w-6- h-6 mx-auto text-muted-foreground" />,
      label: formatFuelType(props.fuelType),
    },
    {
      id: 4,
      icon: <Power className="w-6- h-6 mx-auto text-muted-foreground" />,
      label: formatTransmission(props.transmission),
    },
    {
      id: 5,
      icon: <Gauge className="w-6- h-6 mx-auto text-muted-foreground" />,
      label: `${formatNumber(props.odometerReading)} ${formatOdometerUnit(
        props.odometerUnit,
      )} `,
    },
    {
      id: 6,
      icon: <User className="w-6- h-6 mx-auto text-muted-foreground" />,
      label: `${props.seats} seats.`,
    },
    {
      id: 7,
      icon: <CarFront className="w-6- h-6 mx-auto text-muted-foreground" />,
      label: `${props.doors} doors.`,
    },
  ];
};
