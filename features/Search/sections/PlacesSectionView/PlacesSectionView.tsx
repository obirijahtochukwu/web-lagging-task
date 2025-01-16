'use client';


import React from 'react'
import { listingSortOptions, listingViewTypes } from '../Places/utils'
import PlaceListCard from '../../components/PlaceListCard/PlaceListCard'
import styles from './styles.module.css';
import { useSearchFilterContext } from '@/contexts/SearchFilterContext/SearchFIlterContext';
import PageLoader from '@/components/loaders/PageLoader/PageLoader';
import { useAppContext } from '@/contexts/AppContext/AppContext';
import useMobile from '@/hooks/useMobile';

const PlacesSectionView = () => {
    const {
        activeFilters,
        allPlaces,
        placesLoading,
    } = useSearchFilterContext();

    const {
        showMap
    } = useAppContext();

    const isMobile = useMobile();
    
    if (placesLoading) return <PageLoader />
    
    return <>
        <section 
            className={`
                ${styles.list__Wrap}
                ${
                    (
                        activeFilters.view.length < 1 ||
                        activeFilters.view === listingViewTypes.listView
                    ) && showMap === true ?
                    ''
                    :
                    (
                        activeFilters.view === listingViewTypes.gridView &&
                        showMap === true
                    ) ?
                        `${styles.wrap__Row} ${styles.min__Gap}`
                    :
                    styles.wrap__Row
                }
            `}
        >
            {
                React.Children.toArray(
                    allPlaces
                    // .sort((a, b) => {
                    //     if (activeFilters.sort === listingSortOptions.sort_by_rating) return b.average_rating - a.average_rating
                    //     if (activeFilters.sort === listingSortOptions.sort_by_price) return b.pricing - a.pricing
                        
                    //     return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                    // })
                    .map((place, index) => {
                        return <PlaceListCard 
                            place={place}
                            index={index}
                            key={place.id}
                            isListView={
                                (
                                    activeFilters.view.length < 1 ||
                                    activeFilters.view === listingViewTypes.listView
                                )
                            }
                        />
                    })
                )
            }
        </section>
    </>
}

export default PlacesSectionView;