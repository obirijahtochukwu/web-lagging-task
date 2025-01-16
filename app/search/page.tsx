import NavigationBar from '@/layouts/NavigationBar/NavigationBar'
import React from 'react'
import SearchFilters from '@/features/Search/sections/Filters/Filters'
import styles from './styles.module.css'
import SearchPageDetails from './details'

const SearchPage = () => {
  return <>
    <NavigationBar
      showSearchBar={true}
      className={styles.nav__Bar}
    />
    
    <SearchFilters />
    
    <SearchPageDetails />
  </>
}

export default SearchPage