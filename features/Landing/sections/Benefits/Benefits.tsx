import React from 'react'
import styles from './styles.module.css'
import { benefitsList } from './utils'
import BenefitItem from '../../components/BenefitItem/BenefitItem'
import FadeInOnScroll from '@/components/wrapperComponents/FadeInOnScroll/FadeInOnScroll'

const Benefits = () => {
    return <>
        <FadeInOnScroll>
            <section className={styles.benefits__Wrap}>
                {
                    React.Children.toArray(benefitsList.map((benefit, index) => {
                        return <BenefitItem 
                            benefit={benefit}
                            key={index}
                        />
                    }))
                }
            </section>
        </FadeInOnScroll>
    </>
}

export default Benefits