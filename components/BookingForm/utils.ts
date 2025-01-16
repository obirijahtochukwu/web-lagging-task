import { formatDate } from "@/helpers/helpers";

export interface BookingDetails {
    place_id: number;
    date: string;
    time: string;
    name: string;
    phone?: string;
    email: string;
    location_id: string;
    is_for_child: boolean | null;
    child_name?: string;
    child_dob?: string;
    child_phone_number?: string;
    child_email?: string;
    selected_styles: number[];
    class_id: string;
    age: string;
    age_group_id: string;
    agreed_to_health_declaration: boolean;
    agreed_to_liability_waiver: boolean;
}

export const initialBookingDetails: BookingDetails = {
    place_id: 0,
    date: formatDate(new Date()),
    time: '09:00',
    name: '',
    phone: '',
    email: '',
    location_id: '',
    is_for_child: null,
    selected_styles: [],
    agreed_to_health_declaration: false,
    agreed_to_liability_waiver: false,
    class_id: '',
    age: '',
    age_group_id: '',
}

export const bookingDetailsDict = {
    place_id: 'place_id',
    date: 'date',
    time: 'time',
    name: 'name',
    phone: 'phone',
    email: 'email',
    is_for_child: 'is_for_child',
    child_name: 'child_name',
    child_dob: 'child_dob',
    child_phone_number: 'child_phone_number',
    child_email: 'child_email',
    selected_styles: 'selected_styles',
    agreed_to_health_declaration: 'agreed_to_health_declaration',
    agreed_to_liability_waiver: 'agreed_to_liability_waiver',
    location_id: 'location_id',
    class_id: 'class_id',
    age: 'age',
    age_group_id: 'age_group_id',
}

export const formPageDetail = [
    {
        id: 1,
        name: 'place detail',
    },
    {
        id: 2,
        name: 'Select Class & Time',
    },
    {
        id: 3,
        name: 'select student type',
    },
    {
        id: 4,
        name: 'enter personal information',
    },
    {
        id: 5,
        name: 'review studio document(s)',
    },
    {
        id: 6,
        name: 'final confirmation',
    },
]

export const requiredInfo: {
    [ key: number ]:  string[]
} = {
    1: [
        bookingDetailsDict.selected_styles,
    ],
    2: [
        bookingDetailsDict.class_id,
        bookingDetailsDict.age_group_id,
        bookingDetailsDict.date,
        bookingDetailsDict.time,
    ],
    3: [],
    4: [
        bookingDetailsDict.name,
        bookingDetailsDict.email,
        bookingDetailsDict.phone,
        bookingDetailsDict.location_id,
        bookingDetailsDict.age,
    ],
    5: [],
    6: [],
}

export const bookingUserOptions = [
    {
        id: 1,
        name: 'an adult',
        value: false,
    },
    {
        id: 2,
        name: 'a parent',
        value: true,
    }
]