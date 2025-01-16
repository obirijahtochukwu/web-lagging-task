import React from 'react'
import styles from './styles.module.css'
import FaqsList from '@/features/Dashboard/components/FaqsList/FaqsList'


const FaqInfo = ({
    placeFaqs
}: {
    placeFaqs: IPlaceFaq[]
}) => {
    return (
        <section className={styles.content__Wrap}>
            <h3 className={styles.header}>Common Questions</h3>

            <FaqsList 
                faqs={placeFaqs}
            />
        </section>
    )
}

export default FaqInfo