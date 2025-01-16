import women from "../../../../assets/heros/women.webp";
import men from "../../../../assets/heros/men.webp";
import kids from "../../../../assets/heros/kids.webp";
import { StaticImageData } from "next/image";
import {
  listingSortOptions,
  listingViewTypes,
} from "@/features/Search/sections/Places/utils";

export const genderImgsInfo: {
  title: string;
  isMainImage?: boolean;
  location: string;
  imageUrl: StaticImageData | any;
  id: number;
}[] = [
  {
    id: 1,
    title: "men",
    location: `/search?class=adults&view=${listingViewTypes.listView}&sort=${listingSortOptions.sort_by_newest}`,
    imageUrl: "./assets/heros/men.webp",
  },
  {
    id: 2,
    title: "women",
    isMainImage: true,
    location: `/search?class=adults&view=${listingViewTypes.listView}&sort=${listingSortOptions.sort_by_newest}`,
    imageUrl: "./assets/heros/women.webp",
  },
  {
    id: 3,
    title: "kids",
    location: `/search?class=minors&view=${listingViewTypes.listView}&sort=${listingSortOptions.sort_by_newest}`,
    imageUrl: "./assets/heros/kids.webp",
  },
];
