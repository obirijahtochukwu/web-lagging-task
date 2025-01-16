

import React from 'react'
import styles from './styles.module.css'
import BackButton from '@/components/BackButton/BackButton';
import SingleBookingDetailContent from './details';


const SingleBookingDetail = async (props: { params: PageParams }) => {
    const { bookingId } = await props.params;
    
    return <>
        <section className={styles.content__Wrap}>
            <BackButton />

            <h1 className={styles.header}>Booking detail</h1>

            <SingleBookingDetailContent 
                bookingId={bookingId}
            />        
        </section>
    </>
}

export default SingleBookingDetail