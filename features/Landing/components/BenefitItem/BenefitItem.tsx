import React from 'react'
import { IconType } from 'react-icons';
import styles from './styles.module.css'


const BenefitItem = ({
    benefit,
}: {
    benefit: {
        icon: IconType;
        title: string;
        info: string;
    }
}) => {
    const Icon = benefit.icon;

    return <>
        <section className={styles.item__Wrap}>
            <section className={styles.icon__Wrap}>
                <Icon 
                    size={'2rem'}
                    style={{
                        display: 'block',
                        margin: '0 auto',
                        color: '#fff',
                    }}
                />
            </section>
            
            <section className={styles.content}>
                <h2 className={styles.header}>{benefit.title}</h2>
                <p className={styles.info}>{benefit.info}</p>
            </section>
        </section>
    </>
}

export default BenefitItem