import React from 'react'
import styles from './styles.module.css'


const SingleResultViewOption = ({
    children,
} : {
    children: React.ReactNode;
}) => {
    return (
        <section 
            className={styles.view__Option__Wrap}
        >
            {children}
        </section>
    )
}

export default SingleResultViewOption