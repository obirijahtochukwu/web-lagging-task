import { StaticImageData } from "next/image";

const taekwondo = "./assets/artStyles/taekwondo.webp";
const judo = "./assets/artStyles/judo.webp";
const boxing = "./assets/artStyles/boxing.webp";
const karate = "./assets/artStyles/karate.webp";
const jiujustu = "./assets/artStyles/Jiu-Jitsu.webp";
const wrestling = "./assets/artStyles/Wrestling.webp";
const muaythai = "./assets/artStyles/Muay-Thai.webp";
const capoeira = "./assets/artStyles/Capoeira.webp";
const kickboxing = "./assets/artStyles/Kickboxing.webp";

export const dummyMartialStyles: {
  id: string | number;
  name: string;
  imageUrl: any;
  isFeatured: boolean;
  isTrending: boolean;
  original_id?: number;
}[] = [
  {
    id: "style-box-1",
    name: "boxing",
    imageUrl: boxing,
    isFeatured: true,
    isTrending: true,
  },
  {
    id: "style-kar-2",
    name: "karate",
    imageUrl: karate,
    isFeatured: true,
    isTrending: true,
  },
  {
    id: "style-taek-3",
    name: "taekwondo",
    imageUrl: taekwondo,
    isFeatured: true,
    isTrending: true,
  },
  {
    id: "style-jud-4",
    name: "judo",
    imageUrl: judo,
    isFeatured: true,
    isTrending: true,
  },
  {
    id: "style-jiu-5",
    name: "jiu-jitsu",
    imageUrl: jiujustu,
    isFeatured: true,
    isTrending: false,
  },
  {
    id: "style-mua-6",
    name: "muay thai",
    imageUrl: muaythai,
    isFeatured: true,
    isTrending: false,
  },
  {
    id: "style-cap-7",
    name: "capoeira",
    imageUrl: capoeira,
    isFeatured: true,
    isTrending: false,
  },
  {
    id: "style-wre-8",
    name: "wrestling",
    imageUrl: wrestling,
    isFeatured: true,
    isTrending: true,
  },
  {
    id: "style-kic-9",
    name: "kickboxing",
    imageUrl: kickboxing,
    isFeatured: true,
    isTrending: true,
  },
  // {
  //     id: 10,
  //     name: 'boxing',
  //     imageUrl: boxing,
  //     isFeatured: true,
  //     isTrending: true,
  // },
  // {
  //     id: 11,
  //     name: 'karate',
  //     imageUrl: karate,
  //     isFeatured: true,
  //     isTrending: true,
  // },
  // {
  //     id: 12,
  //     name: 'taekwondo',
  //     imageUrl: taekwondo,
  //     isFeatured: true,
  //     isTrending: true,
  // },
];
