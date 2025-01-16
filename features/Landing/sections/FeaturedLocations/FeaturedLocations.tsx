import React from 'react'
import styles from './styles.module.css'
import { dummyFeaturedLocations } from './utils'
import Link from 'next/link'
import Image from 'next/image'
import { IoLocateOutline } from 'react-icons/io5'
import FadeInOnScroll from '@/components/wrapperComponents/FadeInOnScroll/FadeInOnScroll'
import { listingSortOptions, listingViewTypes } from '@/features/Search/sections/Places/utils'


const FeaturedLocations = () => {
    return <>
        <section className={styles.content__Wrap}>
            <FadeInOnScroll>
                <h2 className={styles.header}>Explore martial arts near you</h2>
            </FadeInOnScroll>

            <FadeInOnScroll>
                <section className={styles.locations__Wrap}>
                    {
                        React.Children.toArray(dummyFeaturedLocations.map((location, index) => {
                            return <Link
                                key={location.id}
                                href={`/search?place=${location.name}&view=${listingViewTypes.listView}&sort=${listingSortOptions.sort_by_newest}`}
                                className={`${styles.location__Item} ${index === 0 ? styles.main : ''}`}
                            >
                                <Image 
                                    src={location.image}
                                    alt={location.name}
                                    className={styles.location__Image}
                                    // priority
                                />

                                <section className={styles.location__Details}>
                                    <h3 className={`${styles.header}`}>{location.name}</h3>

                                    {/* <p className={styles.location__Place__Count}>
                                        <IoLocateOutline />
                                        <span>{location.totalPlaces} places</span>
                                    </p> */}
                                </section>
                            </Link>
                        }))
                    }
                </section>
            </FadeInOnScroll>
        </section>
    </>
}

export default FeaturedLocations