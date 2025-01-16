import { listingSortOptions, listingViewTypes } from "@/features/Search/sections/Places/utils";

export type FilterKeyType = keyof AvailableFilters;

export const availableFiltersKeys: (keyof AvailableFilters)[] = [
    'style_id',
    'type_of_place_id',
    'caters_to_id',
    'age_group_id',
    'place',
    'name',
    'sort',
    'view',
]

export const filterKeysToCombine: (keyof AvailableFilters)[] = [
    'style_id',
    'type_of_place_id',
    'caters_to_id',
    'age_group_id',
]

export const initialActiveFilters = availableFiltersKeys.reduce((acc, key) => {
    if (key === 'sort' || key === 'view') {
        acc[key] = key === 'sort' ? 
            listingSortOptions.sort_by_newest
            :
            listingViewTypes.listView
        ;
    } else {
        acc[key] = [];
    }
    return acc;
}, {} as AvailableFilters);

export const initialSearchContextState: SearchContextType = {
    activeFilters: initialActiveFilters,
    handleUpdateFiltersForCategory: () => {},
    allPlaces: [],
    setAllPlaces: () => {},
    placesLoading: true,
    setPlacesLoading: () => {},
    placesLoaded: false,
    setPlacesLoaded: () => {},
}
