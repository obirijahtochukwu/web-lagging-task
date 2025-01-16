export interface INewReview {
    rating: number;
    comment: string;
}


export const initialReviewState: INewReview = {
    rating: 0,
    comment: '',
}