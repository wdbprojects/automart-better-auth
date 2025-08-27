"use client";

import { use } from "react";
import { ClassifiedWithImages, Favourites } from "@/config/types";
import ClassifiedCard from "./classified-card";

interface ClassifiedListProps {
  classifieds: Promise<ClassifiedWithImages[]>;
  favourites: number[];
}

const ClassifiedList = (props: ClassifiedListProps) => {
  const { classifieds, favourites } = props;
  const inventory = use(classifieds);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 px-4 min-w-fit">
      {inventory.map((classified: any) => {
        return (
          <ClassifiedCard
            key={classified.id}
            classified={classified}
            favourites={favourites}
          />
        );
      })}
    </div>
  );
};

export default ClassifiedList;
