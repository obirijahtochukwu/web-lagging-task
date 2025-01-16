'use client';


import React from 'react'
import PlacesMap from '@/features/Search/sections/Map/Map'
import SearchPlacesListing from '@/features/Search/sections/Places/Places'
import styles from './styles.module.css'
import { useSearchFilterContext } from '@/contexts/SearchFilterContext/SearchFIlterContext';
// import { testMapCoordinates } from '@/features/Search/sections/Map/utils';

const SearchPageDetails = () => {
    const {
        allPlaces,
        placesLoading,
    } = useSearchFilterContext();
    
    return (
        <section className={styles.content__Wrap}>
            <SearchPlacesListing />
            <PlacesMap 
                placeCoordinates={
                    allPlaces.flatMap(place => place.place_locations.map(location => ({
                        lat: isNaN(Number(location.latitude)) ? 0 : Number(location.latitude),
                        lng: isNaN(Number(location.longitude)) ? 0 : Number(location.longitude),
                        name: place.name,
                        address: location.address,
                    })))
                }
                loaded={!placesLoading}
            />
        </section>
    )
}

export default SearchPageDetails