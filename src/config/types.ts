import { ChangeEvent, ReactNode } from "react";
import { Prisma } from "@prisma/client";

type Params = {
  [x: string]: string | string[];
};

export interface LayoutProps {
  children: ReactNode;
}

export type PageProps = {
  params?: Promise<Params>;
  searchParams?: Promise<{ [x: string]: string | string[] | undefined }>;
};

export type AwaitedPageProps = {
  params?: Awaited<PageProps["params"]>;
  searchParams?: Awaited<PageProps["searchParams"]>;
};

export type ClassifiedWithImages = Prisma.ClassifiedGetPayload<{
  include: {
    images: true;
  };
}>;
export interface ClassifiedCardProps {
  classified: ClassifiedWithImages;
  favourites: number[];
}

export enum MultiStepFormEnum {
  WELCOME = 1,
  SELECT_DATE = 2,
  SUBMIT_DETAILS = 3,
}

export interface Favourites {
  ids: number[];
}

export interface TaxonomyFilterProps extends AwaitedPageProps {
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export type FilterOptions<LType, VType> = Array<{ label: LType; value: VType }>;

export type MinMaxResultType = Prisma.GetClassifiedAggregateType<{
  _min: {
    year: true;
    odometerReading: true;
    price: true;
  };
  _max: {
    year: true;
    odometerReading: true;
    price: true;
  };
}>;

export type ClassifiedWithImagesAndMake = Prisma.ClassifiedGetPayload<{
  include: { images: true; make: true };
}>;

export interface SidebarProps extends AwaitedPageProps {
  minMaxValues: Prisma.GetClassifiedAggregateType<{
    _min: { year: true; price: true; odometerReading: true };
    _max: { year: true; price: true; odometerReading: true };
  }>;
}

export interface MultiStepFormComponentProps extends AwaitedPageProps {
  classified: Prisma.ClassifiedGetPayload<{
    include: { make: true };
  }>;
}
