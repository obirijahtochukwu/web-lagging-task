'use client';


import React, { useEffect, useRef, useState } from 'react'
import { IoChevronDown } from 'react-icons/io5';
import styles from './styles.module.css';
import Button from '../../../../components/Button/Button';
import useClickOutside from '@/hooks/useClickOutside';
import { useSearchFilterContext } from '@/contexts/SearchFilterContext/SearchFIlterContext';
import SearchBar from '@/components/SearchBar/SearchBar';
import { cleanStringAndReturnLower } from '@/helpers/formatters';


interface FilterValue {
    name: string;
    value: string;
}

const FilterItem = ({
    title='',
    filterKey='',
    filters=[],
    currentActiveFiltersForItem=[],
    showCustomSearch=false,
}: {
    title: string;
    filterKey: string;
    filters?: FilterValue[];
    currentActiveFiltersForItem?: string[];
    showCustomSearch?: boolean;
}) => {
    const {
        handleUpdateFiltersForCategory,
    } = useSearchFilterContext();

    const [ selectedFilters, setSelectedFilters ] = useState<string[]>([]);
    const [ showFilterListing, setShowFilterListing ] = useState<boolean>(false);
    const [ searchValue, setSearchValue ] = useState<string>('');
    const [ matchedFiltersForSearch, setMatchedFiltersForSearch ] = useState<FilterValue[]>([]);

    const filterWrapRef = useRef<HTMLDivElement>(null);
    const listingRef = useRef<HTMLDivElement>(null);
    
    useClickOutside({
        elemRef: filterWrapRef,
        alternateElementRef: listingRef,
        handleClickOutside: () => setShowFilterListing(false),
    });

    useEffect(() => {
        setSelectedFilters(currentActiveFiltersForItem);
    }, [currentActiveFiltersForItem]);

    useEffect(() => {
        setMatchedFiltersForSearch(
            [
                ...selectedFilters.filter(item => !filters.find(fil => cleanStringAndReturnLower(fil.value) === cleanStringAndReturnLower(item))).map(item => {
                    return {
                        name: item,
                        value: item,
                    }
                }),
                ...filters,
            ].filter(filter => {
                if (searchValue.length > 0) return cleanStringAndReturnLower(filter.name).includes(cleanStringAndReturnLower(searchValue));

                return filter;
            })
        );
    }, [filters, searchValue, selectedFilters])

    const handleBtnClick = (value: string[]) => {
        handleUpdateFiltersForCategory(
            filterKey,
            searchValue.length > 0 ?
                [
                    ...value,
                    searchValue,
                ]
            :
            value
        );
        setShowFilterListing(false);
        setSearchValue('');
    } 

    return <>
        <section 
            className={`${styles.filter__Item} ${currentActiveFiltersForItem.length > 0 ? styles.has__Items : ''}`}
            onClick={() => setShowFilterListing(!showFilterListing)}
            ref={filterWrapRef}
        >
            <span>{currentActiveFiltersForItem.length > 0 ? currentActiveFiltersForItem.length + ' ' : ''}{title}{currentActiveFiltersForItem.length > 1 ? 's' : ''}</span>
            
            <IoChevronDown />

            {
                showFilterListing &&
                <section 
                    className={styles.filter__Listing__Wrap}
                    ref={listingRef}
                    onClick={(e) => e.stopPropagation()}
                >
                    {
                        showCustomSearch === true &&
                        <SearchBar
                            value={searchValue}
                            onChange={(_name, val) => setSearchValue(val)}
                            style={{
                                padding: '0.65rem 0.7rem',
                                width: 'calc(100% - calc(1rem * 2)',
                                margin: '1rem auto 0',
                            }}
                        />
                    }

                    <ul className={styles.filter__Listing}>
                        {
                            matchedFiltersForSearch.length < 1 ?
                                <p className={styles.empty__Filters}>{"No results? No worries.\n\njust click on 'save' and we would perform a wide search for you!"}</p>
                            :
                            React.Children.toArray(matchedFiltersForSearch.map(filter => {
                                return <li 
                                    className={styles.single__Filter}
                                    key={`${filter.name} ${filter.value}`}
                                >
                                    <label className={styles.single__Filter__Label}>
                                        <input 
                                            type='checkbox'
                                            checked={selectedFilters.includes(filter.value)}
                                            onChange={({ target }) => {
                                                if (target.checked === false) return setSelectedFilters((prevFilters) => prevFilters.filter(selectFilter => filter.value !== selectFilter));

                                                setSelectedFilters((prevFilters) => [...prevFilters, filter.value])
                                            }}
                                        />
                                        <span>{filter.name}</span>
                                    </label>
                                </li>
                            }))
                        }
                    </ul>

                    <section className={styles.actions__Wrap}>
                        <Button 
                            label='Clear'
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'transparent',
                                color: '#000',
                                border: '1px solid #000',
                                padding: '0.65rem 1.5rem'
                            }}
                            handleClick={() => handleBtnClick([])}
                        />

                        <Button
                            label='Save'
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid #000',
                                padding: '0.65rem 1.5rem'
                            }}
                            handleClick={() => handleBtnClick(selectedFilters)}
                        />
                    </section>
                </section>
            }
        </section>
    </>
}

export default FilterItem