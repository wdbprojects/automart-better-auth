import { CURRENCY_CODE } from "@/config/constants";
import {
  BodyType,
  Color,
  CurrencyCode,
  FuelType,
  OdometerUnit,
  Transmission,
} from "@prisma/client";

interface FormatPriceArgs {
  price: number | null;
  currency: CurrencyCode | null;
}

export const formatPrice = ({ price, currency }: FormatPriceArgs) => {
  const { US } = CURRENCY_CODE;
  if (!price) return "0";
  const formatter = new Intl.NumberFormat(US, {
    style: "currency",
    currencyDisplay: "symbol",
    ...(currency && { currency }),
    maximumFractionDigits: 0,
  });
  if (currency === "USD") {
    return formatter.format(price / 100).replace("US$", "$");
  }

  return formatter.format(price / 100);
};

export const formatNumber = (
  num: number | null,
  options?: Intl.NumberFormatOptions,
) => {
  if (!num) return "0";
  return new Intl.NumberFormat("en-US", options).format(num);
};

export const formatOdometerUnit = (unit: OdometerUnit) => {
  return unit === "MILES" ? "mi" : "km";
};

export const formatTransmission = (transmission: Transmission) => {
  return transmission === "MANUAL" ? "Manual" : "Automatic";
};

export const formatFuelType = (fuelType: FuelType) => {
  switch (fuelType) {
    case "ELECTRIC":
      return "Electric";
    case "DIESEL":
      return "Diesel";
    case "PETROL":
      return "Petrol";
    case "HYBRID":
      return "Hybrid";
    default:
      return "Unknown";
  }
};

export const formatBodyType = (bodyType: BodyType) => {
  switch (bodyType) {
    case BodyType.CONVERTIBLE:
      return "Convertible";
    case BodyType.COUPE:
      return "Coupe";
    case BodyType.HATCHBACK:
      return "Hatchback";
    case BodyType.SUV:
      return "SUV";
    case BodyType.WAGON:
      return "Wagon";
    case BodyType.SEDAN:
      return "Sedan";
    default:
      return "Unknown";
  }
};

export const formatColor = (color: Color) => {
  let colorArr = color.toLowerCase().split("");
  const result = colorArr.toSpliced(0, 1, colorArr[0].toUpperCase());
  return result.join("");
};

export const capitalizeFirstLetter = (str: string) => {
  const months = str.toLowerCase().split("");
  months.splice(0, 1, months[0].toUpperCase());
  return months.join("");
};
