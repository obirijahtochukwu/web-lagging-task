'use client';


import FilterItem from '@/features/Search/components/FilterItem/FilterItem'
import React from 'react'
import styles from './styles.module.css'
import { availableLocations } from '@/utils/locations';
import { useSearchFilterContext } from '@/contexts/SearchFilterContext/SearchFIlterContext';
import { useAppContext } from '@/contexts/AppContext/AppContext';
import ToggleSwitch from '@/components/ToggleSwitch/ToggleSwitch';
import useMobile from '@/hooks/useMobile';

const SearchFilters = () => {
    const {
        placeTypes,
        catersTo,
        allStyles,
        showMap,
        ageGroups,
        setShowMap,
    } = useAppContext();

    const { activeFilters } = useSearchFilterContext();
    const isMobile = useMobile();

    return <>
        <section className={styles.content}>
            <section className={styles.filters__Wrap}>
                <FilterItem 
                    title='style'
                    filterKey='style_id'
                    filters={
                        allStyles
                        .sort((a, b) => {
                            if (a.is_featured === true && b.is_featured !== true) return -1;
                            if (a.is_featured !== true && b.is_featured === true) return 1;
                            return 0;
                        })
                        .map(style => ({ 
                            name: `${style.name}`, 
                            value: String(style.id),
                        }))
                    }
                    currentActiveFiltersForItem={activeFilters.style_id}
                />

                <FilterItem 
                    title='place'
                    filterKey='type_of_place_id'
                    filters={placeTypes.map(place => ({ name: place.name, value: String(place.id) }))}
                    currentActiveFiltersForItem={activeFilters.type_of_place_id}
                />
                
                <FilterItem 
                    title='class type'
                    filterKey='caters_to_id'
                    filters={catersTo.map(type => ({ name: type.name, value: String(type.id) }))}
                    currentActiveFiltersForItem={activeFilters.caters_to_id}
                />

                <FilterItem 
                    title='age group'
                    filterKey='age_group_id'
                    filters={ageGroups.map(type => ({ name: type.name, value: String(type.id) }))}
                    currentActiveFiltersForItem={activeFilters.age_group_id}
                />

                <FilterItem 
                    title='location'
                    filterKey='place'
                    filters={Object.keys(availableLocations || {}).map(locationKey => {
                        return {
                            name: `${locationKey}, ${availableLocations[locationKey]}`,
                            value: `${locationKey}, ${availableLocations[locationKey]}`
                        }
                    })}
                    currentActiveFiltersForItem={activeFilters.place}
                    showCustomSearch
                />
            </section>
            
            {
                !isMobile &&
                <ToggleSwitch 
                    contentText='show map'
                    fontSize='0.875rem'
                    checked={showMap}
                    handleChange={() => setShowMap(!showMap)}
                />
            }
        </section>
    </>
}

export default SearchFilters