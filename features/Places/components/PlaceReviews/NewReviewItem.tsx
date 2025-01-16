'use client';


import { useUserContext } from '@/contexts/UserContext';
import React, { useState } from 'react'
import { INewReview, initialReviewState } from './utils';
import { PlaceService } from '@/services/placeService';
import { AppConstants } from '@/utils/constants';
import styles from './styles.module.css'
import Rate from 'rc-rate';
import TextInputComponent from '@/components/inputs/TextInputComponent/TextInputComponent';
import Button from '@/components/Button/Button';
import { toast } from 'sonner';


const NewReviewItem = ({
    placeId,
    reviews,
    updateReviews=() => {},
}: {
    placeId: number;
    reviews: IPlaceReviews[];
    updateReviews?: (data: IPlaceReviews[]) => void;
}) => {
    const {
        userDetails,
    } = useUserContext();

    const [ newReviewDetail, setNewReviewDetail ] = useState<INewReview>(initialReviewState);
    const [ loading, setLoading ] = useState<boolean>(false);

    const placeService = new PlaceService();

    const handleUpdateDetail = (key: string, value: string | number) => {
        setNewReviewDetail(prevDetail => {
            return {
                ...prevDetail,
                [key]: value
            }
        })
    }

    const handleAddReview = async () => {
        const token = AppConstants.getSavedToken();

        if (loading || newReviewDetail.comment.length < 1 || !token || !userDetails) return;
        if (newReviewDetail.rating < 1 || newReviewDetail.rating > 5) return toast.info('Please enter a rating between 1 - 5');

        const formData = new FormData();
        formData.append('place_id', `${placeId}`);

        for (const itemKey in newReviewDetail) {
            const key = itemKey as keyof typeof newReviewDetail;
            formData.append(key, `${newReviewDetail[key]}`);
        };

        setLoading(true);

        try {
            await placeService.addNewReview(token, formData);

            const currentReviews = reviews.slice();
            updateReviews([
                {
                    id: currentReviews.length + 1,
                    rating: newReviewDetail.rating,
                    comment: newReviewDetail.comment,
                    user: userDetails,
                    created_at: new Date().toString(),
                },
                ...currentReviews,
            ]);

            setLoading(false);
            setNewReviewDetail(initialReviewState);
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <section className={styles.new__Review}>
            <h5 className={styles.header}>Write a review</h5>

            <Rate
                allowHalf={false}
                value={newReviewDetail.rating}
                style={{
                    fontSize: '2.5rem',
                }}
                onChange={(val) => handleUpdateDetail('rating', val)}
            />

            <TextInputComponent
                name='comment'
                placeholder='Share a note about your experience with the studio'
                isTextArea
                value={newReviewDetail.comment}
                onChange={handleUpdateDetail}
                borderRadius='12px'
            />

            <Button 
                label={
                    loading ?
                        'submitting...'
                    :
                    'submit'
                }
                style={{
                    width: 'max-content',
                    marginTop: '0.8rem',
                }}
                disabled={newReviewDetail.comment.length < 1 || loading}
                handleClick={handleAddReview}
            />
        </section>
    )
}

export default NewReviewItem