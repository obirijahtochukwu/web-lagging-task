'use client';

import React from 'react'
import styles from './styles.module.css'
import { useInView } from 'react-intersection-observer';


const HeroBannerSubtitle = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    return (
        <p 
            ref={ref}
            className={`${styles.subtitle__Header} ${inView ? styles.display : ''}`}
        >
            Discover the perfect martial arts style tailored for you
        </p>
    )
}

export default HeroBannerSubtitle