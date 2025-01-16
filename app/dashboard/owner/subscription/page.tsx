import React from 'react'
import styles from './styles.module.css'
import SubscriptionDetails from './details'


const SubscriptionPage = () => {
    return (
        <section className={styles.content__Wrap}>
            <h1 className={styles.header}>Your Plans</h1>

            <SubscriptionDetails />
        </section>
    )
}

export default SubscriptionPage