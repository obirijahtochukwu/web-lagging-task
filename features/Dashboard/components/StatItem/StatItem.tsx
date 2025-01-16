import React from 'react'
import styles from './styles.module.css'


const StatItem = ({
    title='stat',
    count=0,
    useDecimal=false,
}: {
    title: string;
    count: number;
    useDecimal?: boolean;
}) => {
    return (
        <div className={styles.stat__Item}>
            <p className={styles.title}>{title}</p>
            
            <h2 className={styles.stat}>
                {
                    useDecimal === true ?
                        Number(Number(count).toLocaleString()).toFixed(1)
                    :
                    Number(count).toLocaleString()
                }
            </h2>
        </div>
    )
}

export default StatItem