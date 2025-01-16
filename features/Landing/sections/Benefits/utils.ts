import { IconType } from "react-icons";
import { IoIosSearch } from "react-icons/io";
import { IoRocketOutline } from "react-icons/io5";
import { MdOutlineVisibility } from "react-icons/md";

export const benefitsList: {
    icon: IconType;
    title: string;
    info: string;
}[] = [
    {
        icon: IoIosSearch,
        title: 'find your class',
        info: 'Discover the perfect martial arts class that fits your goals and schedule.'
    },
    {
        icon: MdOutlineVisibility,
        title: 'Know What to Expect',
        info: "Clear and detailed information on instructors, class formats, and pricing.",
    },
    {
        icon: IoRocketOutline,
        title: 'start your journey',
        info: "Easily book your first class and begin your martial arts experience today.",
    }
]