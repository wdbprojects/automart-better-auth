import { ClassifiedFilterSchema } from "@/app/schemas/classified.schema";
import { AwaitedPageProps } from "@/config/types";
import { ClassifiedStatus, Prisma } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";
import { format, parse } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const syntheticEvent = (
  value: string,
  name: string,
  options: {
    label: string;
    value: string;
  }[],
  onChange: any,
) => {
  return {
    target: {
      value: value,
      name: name,
      type: "select-one",
      options: {
        length: options.length,
        item: (index: number) => options[index],
        namedItem: (name: string) => {},
      },
      addEventListener: () => {},
      dispatchEvent: (event: Event) => true,
      removeEventListener: () => {},
    },
    nativeEvent: null,
    currentTarget: null,
    bubbles: false,
    cancelable: false,
    defaultPrevented: false,
    preventDefault: () => {},
    stopPropagation: () => {},
    timeStamp: 0,
    type: "change",
    eventPhase: null,
    isTrusted: true,
    isDefaultPrevented: true,
    isPropagationStopped: false,
    persist: true,
  } as unknown as ChangeEvent<HTMLSelectElement>;
  onChange(syntheticEvent);
};

// INFO: CLASSIFIED FILTER QUERY
export const buildClassifiedFilterQuery = (
  searchParams: AwaitedPageProps["searchParams"] | undefined,
): Prisma.ClassifiedWhereInput => {
  const { data } = ClassifiedFilterSchema.safeParse(searchParams);
  if (!data) {
    return { status: ClassifiedStatus.LIVE };
  }
  const keys = Object.keys(data);
  const taxonomyFilters = ["make", "model", "modelVariant"];

  const rangeFilters = {
    minYear: "year",
    maxYear: "year",
    minPrice: "price",
    maxPrice: "price",
    minReading: "odometerReading",
    maxReading: "odometerReading",
  };

  const numFilters = ["seats", "doors"];
  const enumFilters = [
    "odometerUnit",
    "currency",
    "transmission",
    "bodyType",
    "fuelType",
    "color",
  ];

  const mapParamsToFields = keys.reduce((acc, key) => {
    const value = searchParams?.[key] as string | undefined;
    if (!value) return acc;

    if (taxonomyFilters.includes(key)) {
      acc[key] = { id: Number(value) };
    } else if (enumFilters.includes(key)) {
      acc[key] = value.toUpperCase();
    } else if (numFilters.includes(key)) {
      acc[key] = Number(value);
    } else if (key in rangeFilters) {
      const field = rangeFilters[key as keyof typeof rangeFilters];
      acc[field] = acc[field] || {};
      if (key.startsWith("min")) {
        acc[field].gte = Number(value);
      } else if (key.startsWith("max")) {
        acc[field].lte = Number(value);
      }
    }

    return acc;
  }, {} as { [key: string]: any });

  return {
    status: ClassifiedStatus.LIVE,
    ...(searchParams?.q && {
      OR: [
        {
          title: { contains: searchParams.q as string, mode: "insensitive" },
        },
        {
          description: {
            contains: searchParams.q as string,
            mode: "insensitive",
          },
        },
      ],
    }),
    ...mapParamsToFields,
  };
};

export const generateDateOptions = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push({
      label: format(date, "dd MMM yyyy"),
      value: format(date, "dd MMM yyyy"),
    });
  }
  return dates;
};

export const generateTimeOptions = () => {
  const times = [];
  const startHour = 8;
  const endHour = 18;
  for (let hour = startHour; hour < endHour; hour++) {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(hour);
    date.setMinutes(0);
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    times.push({ label: formattedTime, value: formattedTime });
  }
  return times;
};

export const formatDate = (date: string, time: string) => {
  const parsedDate = parse(date, "dd MMM yyyy", new Date());
  const parsedTime = parse(time, "hh:mm aa", new Date());
  parsedDate.setHours(parsedTime.getHours(), parsedTime.getMinutes(), 0, 0);
  return parsedDate;
};
