import { SubscriptionPlan } from '@/utils/subscriptionPlans'
import React from 'react'
import styles from './styles.module.css'
import { AiOutlineCheck } from 'react-icons/ai';
import Button from '@/components/Button/Button';


const SubscriptionCard = ({
    plan
}: {
    plan: SubscriptionPlan;
}) => {
    return <>
        <section className={styles.sub__Card}>
            <h5 className={styles.title}>{plan.title}</h5>

            <p className={styles.pricing__Wrap}>
                <span className={styles.pricing}>${plan.pricing}</span>
                <span>/{plan.paymentInterval}</span>
            </p>

            <section className={styles.benefits}>
                {
                    React.Children.toArray(plan.benefits.map(benefit => {
                        return <p className={styles.benefit__item}>
                            <AiOutlineCheck />
                            <span>{benefit}</span>
                        </p>
                    }))
                }
            </section>

            <Button 
                label="let's go"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px',
                    padding: '0.75rem 1rem',
                    fontSize: '0.8rem',
                    background: 'var(--primary-app-color)',
                    color: '#fff',
                    border: '1px solid var(--primary-app-color)',
                }}
                hoverStyle={{
                    background: 'transparent',
                    color: 'var(--primary-app-color)',
                }}
            />
        </section>
    </>
}

export default SubscriptionCard