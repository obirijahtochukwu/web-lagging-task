import { StaticImageData } from 'next/image';
import image1 from '../../../../assets/locations/california.webp';
import image2 from '../../../../assets/locations/florida.webp';
import image3 from '../../../../assets/locations/illinois.webp';
import image4 from '../../../../assets/locations/new-york.webp';
import image5 from '../../../../assets/locations/texas.webp';
import image6 from '../../../../assets/locations/washington.webp';
import image7 from '../../../../assets/locations/michigan.webp';

export const dummyFeaturedLocations: {
    id: number;
    name: string;
    totalPlaces: number;
    image: StaticImageData;
}[] = [
    {
        id: 1,
        name: 'california',
        totalPlaces: 5,
        image: image1,
    },
    {
        id: 2,
        name: 'florida',
        totalPlaces: 10,
        image: image2,
    },
    {
        id: 3,
        name: 'illinois',
        totalPlaces: 3,
        image: image3,
    },
    {
        id: 4,
        name: 'new york',
        totalPlaces: 2,
        image: image4,
    },
    {
        id: 5,
        name: 'texas',
        totalPlaces: 5,
        image: image5,
    },
    {
        id: 6,
        name: 'washington',
        totalPlaces: 4,
        image: image6,
    },
    {
        id: 7,
        name: 'more',
        totalPlaces: 5,
        image: image7,
    },
]