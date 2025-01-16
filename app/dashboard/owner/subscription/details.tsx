import SubscriptionCard from '@/features/Dashboard/components/SubscriptionCard/SubscriptionCard'
import { subscriptionPlans } from '@/utils/subscriptionPlans'
import React from 'react'
import styles from './styles.module.css'


const SubscriptionDetails = () => {
    return (
        <section className={styles.subs__Wrap}>
            {
                React.Children.toArray(subscriptionPlans.map(plan => {
                    return <SubscriptionCard 
                        plan={plan}
                        key={plan.id}
                    />
                }))
            }
        </section>
    )
}

export default SubscriptionDetails