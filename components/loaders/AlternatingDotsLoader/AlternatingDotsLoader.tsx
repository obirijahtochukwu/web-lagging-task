import React from 'react'
import styles from './styles.module.css'


const AlternatingDotsLoader = ({
    size='16px',
}: {
    size?: string;
}) => {
    return (
        <div 
            className={styles.loader}
            style={{
                width: size,
                height: size,
            }}
        ></div>
    )
}

export default AlternatingDotsLoader