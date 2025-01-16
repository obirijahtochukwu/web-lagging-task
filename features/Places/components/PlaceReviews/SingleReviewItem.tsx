import { getTimeAgoFromDate } from '@/helpers/helpers';
import Rate from 'rc-rate';
import React from 'react'
import Avatar from 'react-avatar';
import styles from './styles.module.css'


const SingleReviewItem = ({
    review,
}: {
    review: IPlaceReviews;
}) => {
    return (
        <section className={styles.review__Card}>
            <section className={styles.review__Top__Content}>
                <Avatar 
                    name={review.user.name ?? review.user.username ?? ''}
                    round
                    size='2rem'
                />

                <section className={styles.review__Detail}>
                    <section className={styles.review__User__Wrap}>
                        <h3 className={styles.review__User}>
                            {review.user.name ?? review.user.username ?? ''}
                        </h3>
                        
                        <Rate
                            allowHalf={true}
                            value={review.rating}
                            disabled={true}
                            style={{
                                fontSize: '1.2rem',
                            }}
                        />
                    </section>

                    <p className={styles.review__Time}>{getTimeAgoFromDate(review.created_at)}</p>
                </section>
            </section>
            <p className={styles.comment}>{review.comment}</p>
        </section>
    )
}

export default SingleReviewItem