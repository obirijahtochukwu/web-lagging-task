type PageParams = Promise<{ 
    type?: string;
    placeId?: number;
    bookingId?: number;
    slug?: string;
}>;

type PageSearchParams = Promise<{ 
    access?: string;
}>;

type ApiError = {
    detail: string;
}