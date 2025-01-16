import { generateDashLinkForUser } from "@/helpers/helpers";
import { IconType } from "react-icons";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoCalendarOutline, IoHomeOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";

export interface LinkItemDetail {
    id: number;
    icon: IconType;
    text: string;
    location: string;
}

export const ownerNavLinks: LinkItemDetail[] = [
    {
        id: 1,
        location: generateDashLinkForUser(true),
        icon: IoHomeOutline,
        text: 'dashboard',
    },
    {
        id: 2,
        location: `${generateDashLinkForUser(true)}/studios`,
        icon: HiOutlineBuildingOffice2,
        text: 'studios',
    },
    {
        id: 3,
        location: `${generateDashLinkForUser(true)}/bookings`,
        icon: IoCalendarOutline,
        text: 'students',
    },
    {
        id: 4,
        location: `${generateDashLinkForUser(true)}/subscription`,
        icon: MdOutlinePayment,
        text: 'subscription',
    },
]

export const userNavLinks: LinkItemDetail[] = [
    {
        id: 1,
        location: generateDashLinkForUser(false),
        icon: IoHomeOutline,
        text: 'dashboard',
    },
    {
        id: 2,
        location: `${generateDashLinkForUser(false)}/bookings`,
        icon: IoCalendarOutline,
        text: 'classes',
    },
    {
        id: 3,
        location: `${generateDashLinkForUser(false)}/saved-studios`,
        icon: HiOutlineBuildingOffice2,
        text: 'saved studios',
    },
]