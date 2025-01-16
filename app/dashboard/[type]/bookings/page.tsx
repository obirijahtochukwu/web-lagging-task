import React from 'react'
import styles from './styles.module.css'
import { Metadata } from 'next'
import BookingsDetail from './details'


export const metadata: Metadata = {
    title: 'Bookings | Dasboard'
}

const BookingsPage = () => {
    return <>
        <section className={styles.content__Wrap}>
            <BookingsDetail />
        </section>
    </>
}

export default BookingsPage