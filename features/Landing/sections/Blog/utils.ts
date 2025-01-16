import { StaticImageData } from "next/image";
import sampleImage1 from '../../../../assets/blogSamples/blog-1.webp';
import sampleImage2 from '../../../../assets/blogSamples/blog-2.webp';
import sampleImage3 from '../../../../assets/blogSamples/blog-3.webp';

export const dummyBlogArticles: {
    id: number;
    name: string;
    createdAt: Date;
    lengthOfReadInMinutes: number;
    image: StaticImageData;
    link: string;
} [] = [
    {
        id: 1,
        name: '5 Key Factors to Consider When Choosing a Martial Arts School Near You',
        createdAt: new Date(),
        lengthOfReadInMinutes: 5,
        image: sampleImage1,
        link: '',
    },
    {
        id: 2,
        name: 'The Ultimate Guide to Understanding the Differences Between Karate, Taekwondo, and Kung Fu',
        createdAt: new Date(),
        lengthOfReadInMinutes: 10,
        image: sampleImage2,
        link: '',
    },
    {
        id: 3,
        name: "Why Martial Arts Training is More Than Just Physical—The Mental Benefits You Didn't Know About",
        createdAt: new Date(),
        lengthOfReadInMinutes: 7,
        image: sampleImage3,
        link: '',
    },
]