import { IconType } from "react-icons";
import { IoGridOutline, IoListOutline } from "react-icons/io5";

export const listingSortOptions: {
    [key: string]: string;
} = {
    sort_by_newest: 'newest',
    sort_by_rating: 'rating',
    sort_by_price: 'price',
}

export const listingViewTypes = {
    gridView: 'grid',
    listView: 'list',
}

export const listingViewTypesList: {
    viewType: string;
    icon: IconType;
}[] = [
    {
        viewType: listingViewTypes.listView,
        icon: IoListOutline
    },
    {
        viewType: listingViewTypes.gridView,
        icon: IoGridOutline,
    }
];

// export const allDummyPlaces: IPlace[] = [
//     {
//         id: 1,
//         owner: 2,
//         name: 'Wooden Creek',
//         description: 'Learn martial arts here',
//         category: {
//             id: 1,
//             name: '',
//             description: '',
//             image: ''
//         },
//         email: '',
//         website: 'https://google.com',
//         phone_number: '00000000000',
//         video: '',
//         free_lesson_available: true,
//         is_featured: true,
//         created_at: '01/12/2024, 20:33:44',
//         average_rating: 5.0,
//         place_locations: [
//             {
//                 id: 1,
//                 address: '106 Dummy Street',
//                 city: 'Surulere',
//                 state: 'lagos',
//                 zip_code: '',
//                 latitude: 3.0,
//                 longitude: 3.0,
//             }
//         ],
//         master_images_data: [
//             {
//                 id: 1,
//                 name: '',
//                 bio: '',
//                 image: '',
//             }
//         ],
//         images_data: [
//             {
//                 id: 1,
//                 image: 'https://img.freepik.com/free-photo/fluorescent-light_1127-2021.jpg?t=st=1733283610~exp=1733287210~hmac=11471f689e3a9df26068ac672bc85fe7291a99c1d76c20b2d81d7ea6b1263995&w=1380',
//                 uploaded_at: '',
//             },
//             {
//                 id: 2,
//                 image: 'https://img.freepik.com/free-photo/empty-floor-front-modern-building_1127-2889.jpg?semt=ais_hybrid',
//                 uploaded_at: '',
//             },
//             {
//                 id: 3,
//                 image: 'https://img.freepik.com/free-photo/fluorescent-light_1127-2021.jpg?t=st=1733283610~exp=1733287210~hmac=11471f689e3a9df26068ac672bc85fe7291a99c1d76c20b2d81d7ea6b1263995&w=1380',
//                 uploaded_at: '',
//             },
//             {
//                 id: 4,
//                 image: 'https://img.freepik.com/free-photo/empty-floor-front-modern-building_1127-2889.jpg?semt=ais_hybrid',
//                 uploaded_at: '',
//             },
//             {
//                 id: 5,
//                 image: 'https://img.freepik.com/free-photo/fluorescent-light_1127-2021.jpg?t=st=1733283610~exp=1733287210~hmac=11471f689e3a9df26068ac672bc85fe7291a99c1d76c20b2d81d7ea6b1263995&w=1380',
//                 uploaded_at: '',
//             },
//             {
//                 id: 6,
//                 image: 'https://img.freepik.com/free-photo/empty-floor-front-modern-building_1127-2889.jpg?semt=ais_hybrid',
//                 uploaded_at: '',
//             },
//         ],
//         place_faqs: [
//             {
//                 id: 1,
//                 question: '',
//                 answer: '',
//             }
//         ],
//         policy: {
//             id: 1,
//             content: '',
//             document: ''
//         },
//         place_activity_hours: [
//             {
//                 id: 1,
//                 day: 'monday',
//                 opening_time: '09:00',
//                 closing_time: '21:00',
//             },
//         ],
//         reviews: [
//             {
//                 id: 1,
//                 user: 'Peter Pan',
//                 rating: 4,
//                 comment: '',
//                 created_at: '03/12/2024, 20:33:44',
//             }
//         ],
//         benefits: [
//             'Expert instruction from experienced coaches',
//             'All Skill Levels are Welcome',
//             'Comprehensive Fitness and Health Benefits',
//             'Focus on your Mental Health and Stress Relief',
//             'Specialized Programs for Kids and Teens',
//             'State-of-the-Art Facilities',
//             'Flexible Class Schedules',
//             'Positive and Supportive Community',
//             'Affordable Memberships & Discounts',
//         ].join(', '),
//         pricing: 120,
//         place_caters_to: [],
//         place_styles: [],
//     },
//     {
//         id: 2,
//         owner: 2,
//         name: 'Wooden Hollow',
//         email: '',
//         description: 'Learn martial arts here',
//         category: {
//             id: 1,
//             name: '',
//             description: '',
//             image: ''
//         },
//         website: 'https://google.com',
//         phone_number: '00000000000',
//         video: '',
//         free_lesson_available: true,
//         is_featured: true,
//         created_at: '01/12/2024, 20:33:44',
//         average_rating: 4.8,
//         place_locations: [
//             {
//                 id: 1,
//                 address: '106 Dummy Street',
//                 city: 'Los Angeles',
//                 state: 'california',
//                 zip_code: '',
//                 latitude: 3.0,
//                 longitude: 3.0,
//             }
//         ],
//         master_images_data: [
//             {
//                 id: 1,
//                 image: '',
//                 name: '',
//                 bio: '',
//             }
//         ],
//         images_data: [
//             {
//                 id: 2,
//                 image: 'https://img.freepik.com/free-photo/vertical-shot-inside-building-with-arch-doors-roubaix-france_181624-11886.jpg?t=st=1733284286~exp=1733287886~hmac=ee89dc53e1db28a19a82eb5c3ef32e8c3338df300ee5d3744c71170d90cfa106&w=740',
//                 uploaded_at: '',
//             },
//             {
//                 id: 1,
//                 image: 'https://img.freepik.com/free-photo/fluorescent-light_1127-2021.jpg?t=st=1733283610~exp=1733287210~hmac=11471f689e3a9df26068ac672bc85fe7291a99c1d76c20b2d81d7ea6b1263995&w=1380',
//                 uploaded_at: '',
//             },
//         ],
//         place_faqs: [
//             {
//                 id: 1,
//                 question: '',
//                 answer: '',
//             }
//         ],
//         policy: {
//             id: 1,
//             content: '',
//             document: ''
//         },
//         place_activity_hours: [
//             {
//                 id: 1,
//                 day: 'monday',
//                 opening_time: '09:00',
//                 closing_time: '21:00',
//             },
//         ],
//         reviews: [
//             {
//                 id: 1,
//                 user: 'Peter Pan',
//                 rating: 4,
//                 comment: '',
//                 created_at: '03/12/2024, 20:33:44',
//             },
//             {
//                 id: 2,
//                 user: 'Peter Pan',
//                 rating: 4,
//                 comment: '',
//                 created_at: '03/12/2024, 20:33:44',
//             }
//         ],
//         benefits: [
//             'Flexible Class Schedules',
//             'Positive and Supportive Community',
//             'Affordable Memberships & Discounts',
//             'participate in Professional Competitions and Events'
//         ].join(', '),
//         pricing: 100,
//         place_caters_to: [],
//         place_styles: [],
//     },
//     {
//         id: 3,
//         owner: 2,
//         name: 'Silent Creek',
//         email: '',
//         description: 'Learn martial arts here',
//         category: {
//             id: 1,
//             name: '',
//             description: '',
//             image: ''
//         },
//         website: 'https://google.com',
//         phone_number: '00000000000',
//         video: '',
//         free_lesson_available: true,
//         is_featured: true,
//         created_at: '01/12/2024, 20:33:44',
//         average_rating: 5.0,
//         place_locations: [
//             {
//                 id: 1,
//                 address: '106 Dummy Street',
//                 city: 'houston',
//                 state: 'texas',
//                 zip_code: '',
//                 latitude: 3.0,
//                 longitude: 3.0,
//             }
//         ],
//         master_images_data: [
//             {
//                 id: 1,
//                 image: '',
//                 name: '',
//                 bio: '',
//             }
//         ],
//         images_data: [
//             {
//                 id: 1,
//                 image: 'https://img.freepik.com/free-photo/fluorescent-light_1127-2021.jpg?t=st=1733283610~exp=1733287210~hmac=11471f689e3a9df26068ac672bc85fe7291a99c1d76c20b2d81d7ea6b1263995&w=1380',
//                 uploaded_at: '',
//             },
//             {
//                 id: 2,
//                 image: 'https://img.freepik.com/free-photo/empty-floor-front-modern-building_1127-2889.jpg?semt=ais_hybrid',
//                 uploaded_at: '',
//             },
//         ],
//         place_faqs: [
//             {
//                 id: 1,
//                 question: '',
//                 answer: '',
//             }
//         ],
//         policy: {
//             id: 1,
//             content: '',
//             document: ''
//         },
//         place_activity_hours: [
//             {
//                 id: 1,
//                 day: 'monday',
//                 opening_time: '09:00',
//                 closing_time: '21:00',
//             },
//         ],
//         reviews: [
//             {
//                 id: 1,
//                 user: 'Peter Pan',
//                 rating: 4,
//                 comment: '',
//                 created_at: '03/12/2024, 20:33:44',
//             }
//         ],
//         benefits: [
//             'Expert instruction from experienced coaches',
//             'All Skill Levels are Welcome',
//             'Comprehensive Fitness and Health Benefits',
//             'Family-Friendly Environment'
//         ].join(', '),
//         pricing: 70,
//         place_caters_to: [],
//         place_styles: [],
//     },
//     {
//         id: 4,
//         owner: 2,
//         name: 'Shadow Vale',
//         description: 'Learn martial arts here',
//         email: '',
//         category: {
//             id: 1,
//             name: '',
//             description: '',
//             image: ''
//         },
//         website: 'https://google.com',
//         phone_number: '00000000000',
//         video: '',
//         free_lesson_available: true,
//         is_featured: true,
//         created_at: '01/12/2024, 20:33:44',
//         average_rating: 4.65,
//         place_locations: [
//             {
//                 id: 1,
//                 address: '106 Dummy Street',
//                 city: 'philadelphia',
//                 state: 'pennysylvania',
//                 zip_code: '',
//                 latitude: 3.0,
//                 longitude: 3.0,
//             }
//         ],
//         master_images_data: [
//             {
//                 id: 1,
//                 image: '',
//                 name: '',
//                 bio: '',
//             }
//         ],
//         images_data: [
//             {
//                 id: 2,
//                 image: 'https://img.freepik.com/free-photo/empty-floor-front-modern-building_1127-2889.jpg?semt=ais_hybrid',
//                 uploaded_at: '',
//             },
//             {
//                 id: 1,
//                 image: 'https://img.freepik.com/free-photo/fluorescent-light_1127-2021.jpg?t=st=1733283610~exp=1733287210~hmac=11471f689e3a9df26068ac672bc85fe7291a99c1d76c20b2d81d7ea6b1263995&w=1380',
//                 uploaded_at: '',
//             },
//         ],
//         place_faqs: [
//             {
//                 id: 1,
//                 question: '',
//                 answer: '',
//             }
//         ],
//         policy: {
//             id: 1,
//             content: '',
//             document: ''
//         },
//         place_activity_hours: [
//             {
//                 id: 1,
//                 day: 'monday',
//                 opening_time: '09:00',
//                 closing_time: '21:00',
//             },
//         ],
//         reviews: [
//             {
//                 id: 1,
//                 user: 'Peter Pan',
//                 rating: 4,
//                 comment: '',
//                 created_at: '03/12/2024, 20:33:44',
//             },
//             {
//                 id: 2,
//                 user: 'Peter Pan',
//                 rating: 4,
//                 comment: '',
//                 created_at: '03/12/2024, 20:33:44',
//             },
//             {
//                 id: 3,
//                 user: 'Peter Pan',
//                 rating: 4,
//                 comment: '',
//                 created_at: '03/12/2024, 20:33:44',
//             }
//         ],
//         benefits: [
//             'All Skill Levels are Welcome',
//             'Comprehensive Fitness and Health Benefits',
//             'Focus on your Mental Health and Stress Relief',
//             'Specialized Programs for Kids and Teens',
//             'State-of-the-Art Facilities',
//             'Flexible Class Schedules',
//             'Positive and Supportive Community',
//             'Affordable Memberships & Discounts',
//         ].join(', '),
//         pricing: 100,
//         place_caters_to: [],
//         place_styles: [],
//     },
//     {
//         id: 5,
//         owner: 2,
//         name: 'Wooden Creek',
//         email: '',
//         description: 'Learn martial arts here',
//         category: {
//             id: 1,
//             name: '',
//             description: '',
//             image: ''
//         },
//         website: 'https://google.com',
//         phone_number: '00000000000',
//         video: '',
//         free_lesson_available: true,
//         is_featured: true,
//         created_at: '01/12/2024, 20:33:44',
//         average_rating: 5.0,
//         place_locations: [
//             {
//                 id: 1,
//                 address: '106 Dummy Street',
//                 city: 'Surulere',
//                 state: 'lagos',
//                 zip_code: '',
//                 latitude: 3.0,
//                 longitude: 3.0,
//             }
//         ],
//         master_images_data: [
//             {
//                 id: 1,
//                 name: '',
//                 bio: '',
//                 image: '',
//             }
//         ],
//         images_data: [
//             {
//                 id: 1,
//                 image: 'https://img.freepik.com/free-photo/fluorescent-light_1127-2021.jpg?t=st=1733283610~exp=1733287210~hmac=11471f689e3a9df26068ac672bc85fe7291a99c1d76c20b2d81d7ea6b1263995&w=1380',
//                 uploaded_at: '',
//             },
//             {
//                 id: 2,
//                 image: 'https://img.freepik.com/free-photo/empty-floor-front-modern-building_1127-2889.jpg?semt=ais_hybrid',
//                 uploaded_at: '',
//             },
//         ],
//         place_faqs: [
//             {
//                 id: 1,
//                 question: '',
//                 answer: '',
//             }
//         ],
//         policy: {
//             id: 1,
//             content: '',
//             document: ''
//         },
//         place_activity_hours: [
//             {
//                 id: 1,
//                 day: 'monday',
//                 opening_time: '09:00',
//                 closing_time: '21:00',
//             },
//         ],
//         reviews: [
//             {
//                 id: 1,
//                 user: 'Peter Pan',
//                 rating: 4,
//                 comment: '',
//                 created_at: '03/12/2024, 20:33:44',
//             }
//         ],
//         benefits: [
//             'All Skill Levels are Welcome',
//             'Comprehensive Fitness and Health Benefits',
//             'Focus on your Mental Health and Stress Relief',
//             'Specialized Programs for Kids and Teens',
//             'State-of-the-Art Facilities',
//             'Flexible Class Schedules',
//             'Positive and Supportive Community',
//             'Affordable Memberships & Discounts',
//         ].join(', '),
//         pricing: 120,
//         place_caters_to: [],
//         place_styles: [],
//     },
    
// ]