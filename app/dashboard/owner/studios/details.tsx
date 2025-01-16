'use client';

import PaginationItem from '@/components/PaginationItem/PaginationItem';
import React from 'react'
import styles from './styles.module.css'
import PlaceListCard from '@/features/Search/components/PlaceListCard/PlaceListCard';
import { useAppContext } from '@/contexts/AppContext/AppContext';
import PageLoader from '@/components/loaders/PageLoader/PageLoader';
import Image from 'next/image';
import mascot from '../../../../assets/astr.webp'
import { useRouter, useSearchParams } from 'next/navigation';

const itemsPerPage = 6;

const AllPlacesDetails = () => {
    const {
        userPlaces,
        userPlacesLoading,
    } = useAppContext();

    const searchParams = useSearchParams();
    const router = useRouter();

    const currentPage = !searchParams.get('page') || isNaN(Number(searchParams.get('page'))) ? 1 : Number(searchParams.get('page'));

    if (userPlacesLoading) return <>
        <PageLoader />
    </>

    if (userPlaces.length < 1) return <section className={styles.empty__places}>
        <Image
            src={mascot}
            alt='mascot img'
            width={400}
            height={400}
            style={{
                objectFit: 'cover'
            }}
        />
        <p>You have not added any studios yet</p>
    </section>
    
    return <>
        <PaginationItem
            currentPage={currentPage}
            updateCurrentPage={(page) => router.push(`?page=${page}`)}
            itemsPerPage={itemsPerPage}
            totalItems={userPlaces.length}
        />

        <section className={styles.all__places}>
            {
                React.Children.toArray(
                    userPlaces
                    .slice(
                        currentPage < 2 ?
                            0
                        :
                            Number(currentPage * itemsPerPage) - Number(itemsPerPage)
                        ,
                        Number(currentPage * itemsPerPage)
                    )
                    .map((place, index) => {
                        return <PlaceListCard
                            place={place}
                            index={index}
                            key={place.id}
                            isListView={false}
                            imageHeight={350}
                            isInAppStudioUse={true}
                        />
                    }))
            }
            <div style={{ width: '100%', height: '1rem' }}></div>
        </section>
    </>
}

export default AllPlacesDetails