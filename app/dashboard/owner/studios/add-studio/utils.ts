import { getAllDaysOfTheWeek } from "@/helpers/helpers";
import { v4 as uuidv4 } from 'uuid';

const pricingTypesDict = {
    monthlyPricing: 'monthly',
    classPricing: 'per class',
    privatePricing: 'private',
}

export const pricingTypes = Object.keys(pricingTypesDict).map(key => {
    return pricingTypesDict[key as keyof typeof pricingTypesDict]
});

export const formatPricingType = (type: string) => {
    const typeInLower = type.toLowerCase();

    if (typeInLower === pricingTypesDict.monthlyPricing) return 'month';
    if (typeInLower === pricingTypesDict.classPricing) return 'class';
    if (typeInLower === pricingTypesDict.privatePricing) return 'private';

    return 'month';
}

export interface NewPlaceDetail {
    name: string;
    description: string;
    pricing: number;
    pricing_type: string;
    email: string;
    phone_number: string;
    website?: string;
    benefits: string[];
    locations: ILocation[];
    master_images: IPlaceMasterImage[];
    activity_hours: IPlaceActivityHours[];
    faqs: IPlaceFaq[];
    images: IPlaceImage[];
    video?: string;
    type_of_place: number | null;
    free_lesson_available: boolean;
    styles: number[];
    gender: string;
    caters_to: number[];
    age_groups: number[];
    policy: string;
    reviews: {}[];
    is_featured: boolean;
    documents: IPlaceDocuments[];
    class_schedules_data: IPlaceClassSchedule[];
}

export const newPlaceDetailKeysDict = {
    name: 'name',
    description: 'description',
    pricing: 'pricing',
    pricing_type: 'pricing_type',
    email: 'email',
    phone_number: 'phone_number',
    website: 'website',
    benefits: 'benefits',
    locations: 'locations',
    master_images: 'master_images',
    activity_hours: 'activity_hours',
    opening_time: 'opening_time',
    closing_time: 'closing_time',
    faqs: 'faqs',
    images: 'images',
    video: 'video',
    type_of_place: 'type_of_place',
    free_lesson_available: 'free_lesson_available',
    styles: 'styles',
    gender: 'gender',
    caters_to: 'caters_to',
    age_groups: 'age_groups',
    policy: 'policy',
    reviews: 'reviews',
    is_featured: 'is_featured',
    documents: 'documents',
    class_schedules_data: 'class_schedules_data',
}

export const compulsoryDetailKeys = [
    newPlaceDetailKeysDict.name,
    newPlaceDetailKeysDict.description,
    newPlaceDetailKeysDict.type_of_place,
    newPlaceDetailKeysDict.pricing_type,
    newPlaceDetailKeysDict.locations,
    newPlaceDetailKeysDict.benefits,
    newPlaceDetailKeysDict.images,
    newPlaceDetailKeysDict.gender,
    newPlaceDetailKeysDict.caters_to,
    newPlaceDetailKeysDict.age_groups,
    newPlaceDetailKeysDict.email,
    // newPlaceDetailKeysDict.policy,
    // newPlaceDetailKeysDict.faqs,
]

export const compulsoryDetailKeysDict = {
    [newPlaceDetailKeysDict.name]: 'place name',
    [newPlaceDetailKeysDict.description]: 'place description',
    [newPlaceDetailKeysDict.type_of_place]: 'place type',
    [newPlaceDetailKeysDict.pricing_type]: 'pricing type',
    [newPlaceDetailKeysDict.gender]: 'place gender offering',
    [newPlaceDetailKeysDict.email]: 'contact email',
    [newPlaceDetailKeysDict.locations]: 'place location(s)',
    [newPlaceDetailKeysDict.benefits]: 'place benefits',
    // newPlaceDetailKeysDict.policy,
    // newPlaceDetailKeysDict.faqs,
    [newPlaceDetailKeysDict.images]: 'place image(s)',
    [newPlaceDetailKeysDict.caters_to]: 'place class type(s)',
    [newPlaceDetailKeysDict.age_groups]: 'place age group(s)',
}

export const initialNewPlaceDetail: NewPlaceDetail = {
    name: '',
    description: '',
    pricing: 0,
    pricing_type: '',
    email: '',
    phone_number: '',
    benefits: [],
    locations: [],
    master_images: [],
    activity_hours: getAllDaysOfTheWeek().map(day => {
        return {
            id: uuidv4(),
            day,
            opening_time: '09:00',
            closing_time: '17:00',
        }
    }),
    faqs: [],
    images: [],
    type_of_place: null,
    free_lesson_available: false,
    styles: [],
    gender: '',
    caters_to: [],
    age_groups: [],
    policy: '',
    reviews: [
        {
            "rating": 5,
            "comment": "Excellent training!",
            "user": 1 
        }
    ],
    is_featured: false,
    documents: [],
    class_schedules_data: [],
};

export const rateOptions = [
    'month',
    'hour',
]

export const generateFormDataForNewPlaceDetails = (details: NewPlaceDetail, isEditView=false) => {
    const formattedDetails = Object.keys(details).map(key => {
        const value = details[key as keyof NewPlaceDetail];
        
        if (key === newPlaceDetailKeysDict.activity_hours || key === newPlaceDetailKeysDict.faqs || key === newPlaceDetailKeysDict.images || key === newPlaceDetailKeysDict.master_images || key === newPlaceDetailKeysDict.locations) {
            const valueFormatted = value as IPlaceActivityHours[] | IPlaceFaq[] | IPlaceImage[] | IPlaceMasterImage[] | ILocation[];
            const updatedValue = valueFormatted.map(item => {
                const { id, ...rest } = item;

                if (key === newPlaceDetailKeysDict.images || key === newPlaceDetailKeysDict.master_images) {
                    const itemValue = rest as IPlaceImage | IPlaceMasterImage;

                    if (itemValue.imageFile) {
                        itemValue.image = itemValue.imageFile;
                        delete itemValue.imageFile;
                    }

                    return {
                        id,
                        ...itemValue
                    }
                }
                
                return {
                    ...rest
                }
            });

            return {
                [key]: updatedValue
            }
        }

        if (key === newPlaceDetailKeysDict.benefits) {
            const currentValue = value as string[];
            const updatedValue = currentValue.map(item => item.trim());
            return {
                [key]: updatedValue.join(','),
            }
        }

        if (key === newPlaceDetailKeysDict.type_of_place || key === newPlaceDetailKeysDict.pricing) {
            const updatedValue = Number(value);
            return {
                [key]: updatedValue,
            }
        }

        if (key === newPlaceDetailKeysDict.policy) {
            return {
                [key]: {
                    content: value,
                },
            }
        }

        return {
            [key]: value
        };
    }).reduce<{ [key: string]: any }>((acc, current) => {
        return { ...acc, ...current };
    }, {});

    
    const formData = new FormData();

    for (const key in formattedDetails) {
        const value = formattedDetails[key];
        if (key === newPlaceDetailKeysDict.master_images) {
            const masterImagesDetails = value as IPlaceMasterImage[];

            if (isEditView === true) {
                formData.append('master_images_data_in', JSON.stringify(masterImagesDetails.map(item => {
                    if (typeof item.id === 'number') {
                        return { 
                            id: item.id,
                            name: item.name, 
                            bio: item.bio,
                            action: 'update',
                        }
                    }

                    return { 
                        name: item.name, 
                        bio: item.bio,
                        action: 'create',
                    }
                })))
            } else {
                formData.append('master_images_bio', JSON.stringify(masterImagesDetails.map(item => ({ name: item.name, bio: item.bio }))))
            }
            // const existingMasterImages = masterImagesDetails.filter(item => typeof item.id === 'number' && typeof item.image === 'string');
            // let newImageStartIndex = 1;

            masterImagesDetails.forEach((item, index) => {
                if (isEditView === true) {
                    formData.append(`master_image_new_${index + 1}`, item.image as File);
                
                    if (typeof item.id === 'number' && typeof item.image === 'string') {
                        formData.append(`master_image_${item.id}`, item.image as string);
                    }
                } else {
                    formData.append(`${key}`, item.image as File);
                }
            });

            continue;
        }
        
        if (key === newPlaceDetailKeysDict.images) {
            const imagesDetail = value as IPlaceImage[];

            imagesDetail.forEach(item => {
                if (item.image instanceof File) {
                    formData.append(`${key}`, item.image as File)
                }
            });

            if (isEditView === true) {
                const imagesToKeep = imagesDetail.filter(item => typeof item.id === 'number' && typeof item.image === 'string');
                formData.append('current_place_images', JSON.stringify(imagesToKeep.map(item => item.id)));
            }
            
            continue;
        }

        if (key === newPlaceDetailKeysDict.documents) {
            const documentDetail = value as IPlaceDocuments[];

            documentDetail.forEach((item, index) => {
                if (item.file && item.file instanceof File) {
                    formData.append(`${key}[${index}]`, item.file as File)
                }
            });

            continue;
        }

        if (key === newPlaceDetailKeysDict.locations) {
            formData.append('locations_data', JSON.stringify(value));
            continue;
        }

        if (key === newPlaceDetailKeysDict.activity_hours) {
            formData.append('activity_hours_data', JSON.stringify(value));
            continue;
        }
        
        if (key === newPlaceDetailKeysDict.faqs) {
            formData.append('faqs_data', JSON.stringify(value));
            continue;
        }

        if (key === newPlaceDetailKeysDict.class_schedules_data) {
            formData.append('class_schedules', JSON.stringify(value));
            continue;
        }

        if (
            key === newPlaceDetailKeysDict.styles || 
            key === newPlaceDetailKeysDict.caters_to || 
            key === newPlaceDetailKeysDict.policy || 
            key === newPlaceDetailKeysDict.reviews || 
            key === newPlaceDetailKeysDict.age_groups
        ) {
            formData.append(key, JSON.stringify(value));
            continue;
        }

        formData.append(key, value);
    }
    
    return formData;
}
