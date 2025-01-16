'use client';

import React from 'react'
import styles from './styles.module.css'
import PlacesMap from '@/features/Search/sections/Map/Map'
import useMobile from '@/hooks/useMobile';


const SinglePlaceLocation = ({
    placeName,
    locations=[]
}: {
    placeName: string;
    locations: ILocation[];
}) => {
    const isMobile = useMobile();

    return (
        <section className={styles.content__Wrap}>
            <h3 className={styles.header}>location</h3>
            
            <PlacesMap 
                minHeight={isMobile ? '14rem' : '24rem'}
                width='100%'
                showContentOnSmallScreen={true}
                zoom={13}
                placeCoordinates={
                    locations.map(location => {
                        const [ formattedLat, formattedLon ] = [ Number(location.latitude), Number(location.longitude) ];
                        return {
                            lat: isNaN(formattedLat) ? 0 : formattedLat,
                            lng: isNaN(formattedLon) ? 0 : formattedLon, 
                            name: placeName,
                            address: location.address,
                        }
                    })
                }
            />
        </section>
    )
}

export default SinglePlaceLocation