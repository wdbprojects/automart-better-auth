import { MultiStepFormEnum } from "./types";

export const routes = {
  home: "/",
  singleClassified: (slug: string) => {
    return `/inventory/${slug}`;
  },
  reserve: (slug: string, step: MultiStepFormEnum) => {
    return `/inventory/${slug}/reserve?step=${step}`;
  },
  success: (slug: string) => {
    return `/inventory/${slug}/success`;
  },
  favourites: "/favourites",
  inventory: "/inventory",
  about: "/about",
  notAvailable: (slug: string) => {
    return `/inventory/${slug}/not-available`;
  },
};
