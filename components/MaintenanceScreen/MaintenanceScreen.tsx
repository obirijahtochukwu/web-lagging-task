'use client';


import React, { useEffect, useState } from 'react'
import maintenanceImg from '../../assets/maintenance.webp'
import Image from 'next/image'
import styles from './styles.module.css'
import AppPopup from '../AppPopup/AppPopup';

const MaintenanceScreen = () => {
    const [ showPopup, setShowPopup ] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 1200);

        return () => clearTimeout(timer);
    }, [])

    return (
        <section className={styles.content}>
            <Image 
                src={'/logo-new.png'}
                alt='logo'
                width={180}
                height={25}
                className={styles.logo}
                priority
            />

            <Image 
                src={maintenanceImg}
                alt='maintenance illustation'
                width={0}
                height={500}
                className={styles.main__Ilus}
            />

            {
                showPopup && 
                <AppPopup 
                    hidePopup={() => setShowPopup(false)}
                />
            }
        </section>
    )
}

export default MaintenanceScreen