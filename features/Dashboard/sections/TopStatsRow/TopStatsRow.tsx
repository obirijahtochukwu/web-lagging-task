'use client';


import React from 'react'
import styles from './styles.module.css'
import StatItem from '../../components/StatItem/StatItem'
import { useAppContext } from '@/contexts/AppContext/AppContext'
import { useUserContext } from '@/contexts/UserContext';

const TopStatsRow = () => {
    const {
        userPlaces,
        bookings,
    } = useAppContext();

    const {
        userDetails
    } = useUserContext();

    const totalReviews = userPlaces.flatMap(place => place.place_reviews ?? []);

    return <>
        <section className={styles.stats__Wrap}>
            <StatItem
                title='total bookings'
                count={bookings.length}
            />

            {
                !userDetails ? <>
                    <div style={{ width: '100%' }}></div>
                    <div style={{ width: '100%' }}></div>
                    <div style={{ width: '100%' }}></div>
                </>
                :
                userDetails?.is_owner === false ?
                    <>
                        <StatItem
                            title='upcoming bookings'
                            count={bookings.filter(booking => booking.status === 'confirmed' && new Date(booking.date).getTime() >= new Date().getTime()).length}
                        />

                        <StatItem 
                            title='past bookings'
                            count={bookings.filter(booking => booking.status === 'confirmed' && new Date(booking.date).getTime() <= new Date().getTime()).length}
                        />
                        
                        <StatItem 
                            title={'cancelled bookings'}
                            count={bookings.filter(booking => booking.status === 'cancelled').length}
                        />
                    </>
                :
                <>
                    <StatItem
                        title='total studios'
                        count={userPlaces.length}
                    />

                    <StatItem 
                        title='total reviews'
                        count={totalReviews.length}
                    />
                    
                    <StatItem 
                        title={'average rating'}
                        count={
                            totalReviews ?
                                Number(
                                    Number(
                                        totalReviews.reduce((a, b) => a + (b.rating ?? 0), 0) / 
                                        totalReviews.length
                                    ).toFixed(2)
                                )
                            :
                            0
                        }
                        useDecimal
                    />
                </>
            }
        </section>
    </>
}

export default TopStatsRow