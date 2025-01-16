'use client';


import useLoadData from "@/hooks/useLoadData";
import { PlaceService } from "@/services/placeService";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { availableFiltersKeys, filterKeysToCombine, initialActiveFilters, initialSearchContextState } from "./utils";


const SearchFilterContext = createContext<SearchContextType>(initialSearchContextState);

export const useSearchFilterContext = () => useContext(SearchFilterContext);

const SearchFilterContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [ activeFilters, setActiveFilters ] = useState<AvailableFilters>(initialActiveFilters);

    const [ allPlaces, setAllPlaces ] = useState<IPlace[]>([]);
    const [ placesLoading, setPlacesLoading ] = useState(true);
    const [ placesLoaded, setPlacesLoaded ] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();

    const placeService = new PlaceService();

    const handleUpdateFiltersForCategory = (category: string, value: string[] | string) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());

        newSearchParams.delete(category);

        const categoryValue = Array.isArray(value) ? value: [value]
        
        categoryValue.forEach(searchQuery => {
            newSearchParams.append(category, searchQuery);
        });

        router.push(`?${newSearchParams.toString()}`);
    }
    
    useEffect(() => {
        setActiveFilters((prevFilters) => {
            return {
                ...prevFilters,
                ...availableFiltersKeys.reduce((acc, key) => {
                    if (key === 'sort' || key === 'view') {
                        acc[key] = searchParams.get(key) || '';
                    } else {
                        acc[key] = searchParams.getAll(key);
                    }
                    return acc;
                }, {} as AvailableFilters),
            }
        });
        setPlacesLoaded(false);
    }, [searchParams])

    const combineQueryKeys = (queryStr: string, queryKeys: string[]) => {
        const searchParams = new URLSearchParams(queryStr);
    
        queryKeys.forEach(queryKey => {
            const values = searchParams.getAll(queryKey);
    
            if (values.length > 0) {
                // Combine values into a single string
                const combinedValue = values.join(',');
                const combinedKey = `${queryKey}s`;
    
                // Remove all instances of the original key
                searchParams.delete(queryKey);
    
                // Add the new combined key-value pair
                searchParams.set(combinedKey, combinedValue);
            }
        });
        
        return `?${searchParams.toString()}`;
    }

    useLoadData(
        placesLoaded,
        setPlacesLoading,
        placeService.searchPlace.bind(placeService),
        setAllPlaces,
        setPlacesLoaded,
        {
            inputParam: searchParams.toString().length > 0 ? 
                combineQueryKeys(
                    `?${searchParams.toString()}`, 
                    filterKeysToCombine
                )
            : 
            '',
        }
    );

    return <>
        <SearchFilterContext.Provider
            value={{
                activeFilters,
                handleUpdateFiltersForCategory,
                allPlaces,
                setAllPlaces,
                placesLoaded,
                setPlacesLoaded,
                placesLoading,
                setPlacesLoading,
            }}
        >
            {children}
        </SearchFilterContext.Provider>
    </>
}

export default SearchFilterContextProvider;