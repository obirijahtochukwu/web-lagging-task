import React from 'react'
import styles from './styles.module.css'
import Image from 'next/image'
import mascot from '../../../../assets/astr.webp'


const SavedStudioDetail = () => {
    return (
        <section className={styles.empty__places}>
            <Image
                src={mascot}
                alt='mascot img'
                width={400}
                height={400}
                style={{
                    objectFit: 'cover'
                }}
            />
            <p>Feature coming soon!</p>
        </section>
    )
}

export default SavedStudioDetail