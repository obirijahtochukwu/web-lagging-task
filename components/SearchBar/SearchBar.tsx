import React, { CSSProperties } from 'react'
import { IoSearchOutline } from 'react-icons/io5';
import styles from './styles.module.css';


const SearchBar = ({
    name,
    value,
    placeholder='Search',
    style={},
    onChange=() => {},
}: {
    name?: string;
    value?: string;
    placeholder?: string;
    style?: CSSProperties;
    onChange?: (name: string, value: string) => void;
}) => {
    return <section 
        className={styles.search__Bar}
        style={style}
    >
        <IoSearchOutline 
            size={'1rem'}
        />

        <input 
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={({ target }) => onChange(target.name, target.value)}
        />
    </section>
}

export default SearchBar