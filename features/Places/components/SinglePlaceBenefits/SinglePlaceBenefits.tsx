import React from 'react'
import styles from './styles.module.css'
import { v4 as uuidv4 } from 'uuid';


const SinglePlaceBenefits = ({
    benefits
}: {
    benefits: string[];
}) => {
    return (
        <section className={styles.content__Wrap}>
            <h3 className={styles.header}>Why choose us?</h3>

            <ul className={styles.benefits}>
                {
                    React.Children.toArray(benefits.map(benefit => {
                        return <li
                            key={uuidv4()}
                        >
                            {benefit}
                        </li>
                    }))
                }
            </ul>
        </section>
    )
}

export default SinglePlaceBenefits