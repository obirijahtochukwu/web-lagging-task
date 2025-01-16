type IPlace = {
    id: number;
    email: string;
    owner: number;
    name: string;
    description: string;
    category: ICategory;
    website: string;
    phone_number: string;
    video?: string;
    free_lesson_available: boolean;
    is_featured: boolean;
    created_at: string;
    average_rating: number,
    place_locations: ILocation[];
    images_data: IPlaceImage[];
    master_images_data: IPlaceMasterImage[];
    place_faqs: IPlaceFaq[];
    policy: IPlacePolicy;
    place_activity_hours: IPlaceActivityHours[];
    place_reviews: IPlaceReviews[];
    benefits: string;
    pricing: number;
    pricing_type?: string;
    place_styles: IMartialArtStyle[];
    place_caters_to: ICatersTo[];
    documents_data: IPlaceDocuments[];
    place_age_groups: IPlaceAgeGroups[];
    class_schedules_data: IPlaceClassSchedule[];
}

type IPlaceImage = {
    id: number | string;
    image: string | File;
    imageFile?: File;
    uploaded_at?: string;
}

type IPlaceMasterImage = {
    id?: number | string;
    name: string;
    image: string | File;
    bio: string;
    imageFile?: File;
    image_base64_str?: string;
}

type IPlaceFaq = {
    id?: number | string;
    question: string;
    answer: string;
}

type IPlacePolicy = {
    id: number;
    content: string;
    document: string;
}

type IPlaceActivityHours = {
    id?: number | string;
    day: string;
    opening_time?: string;
    closing_time?: string;
}

type IPlaceReviews = {
    id?: number;
    user: IUser;
    rating: number;
    comment: string;
    created_at: string;
}

type ICatersTo = {
    id: number;
    name: string;
}

type IMartialArtStyle = {
    id: number;
    name: string;
    is_trending?: boolean;
    is_popular?: boolean;
    is_search_style?: boolean;
    is_featured?: boolean;
}

type IPlaceType = {
    id: number;
    name: string;
}

type IPlaceViewStat = {
    name: string;
    views: number;
}

type IPlaceDocuments = {
    id: string | number;
    title: string;
    document: string;
    uploaded_at: string;
    file?: File;
}

type IPlaceAgeGroups = {
    id: number;
    name: string;
}

type IPlaceClassSchedule = {
    class_id: number;
    schedules: {
        day: string;
        times: string[];
    }[];
}