import React from 'react'
import styles from './styles.module.css'
import SingleReviewItem from './SingleReviewItem';


const PlaceReviews = ({
    reviews=[]
}: {
    reviews: IPlaceReviews[];
}) => {
    return (
        <section className={styles.content__Wrap}>
            <h3 className={styles.header}>reviews</h3>

            <section className={styles.reviews}>
                {
                    reviews.length < 1 ?
                        <p className={styles.no__Review__Txt}>Studio has not received any reviews yet</p>
                    :
                    React.Children.toArray(reviews.map(review => {
                        return <SingleReviewItem 
                            review={review}
                            key={review.id}
                        />
                    }))
                }
            </section>       
        </section>
    )
}

export default PlaceReviews