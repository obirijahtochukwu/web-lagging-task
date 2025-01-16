enum BookingStatus {
    pending,
    confirmed,
    cancelled,
}

type IBooking = {
    id: number;
    user: string;
    place: IPlace;
    date: string;
    time: string;
    status: keyof typeof BookingStatus;
    created_at: string;
    name: string;
    email: string;
    phone: string;
    location: ILocation;
    is_for_child: boolean;
    child_name?: string;
    child_dob?: string;
    child_phone_number?: string;
    child_email?: string;
    selected_styles: IMartialArtStyle[];
    agreed_to_health_declaration: boolean;
    agreed_to_liability_waiver: boolean;
    age?: string;
    class?: ICatersTo;
    age_group?: IPlaceAgeGroups;
}