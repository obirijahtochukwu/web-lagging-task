import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import React, { CSSProperties } from 'react'
import styles from './styles.module.css'

const Carousel = ({
    children,
    style={},
    delay=3000,
}: {
    style?: CSSProperties;
    children: React.ReactNode;
    delay?: number;
}) => {
    const [emblaRef] = useEmblaCarousel(
        {
            loop: true,
        },
        [Autoplay({
            delay,
        })],
    );

    return <>
        <div 
            className={styles.embla} 
            ref={emblaRef}
            style={style}
        >
            <div className={styles.embla__container}>
                {children}
            </div>
        </div>
    </>
}

export default Carousel