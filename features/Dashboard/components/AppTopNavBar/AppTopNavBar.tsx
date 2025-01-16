import Image from 'next/image'
import React from 'react'
import logo from '../../../../assets/FAVICON-plain.png'
import styles from './styles.module.css'
import ProfileItem from '@/layouts/ProfileItem/ProfileItem'


const AppTopNavBar = () => {
    return (
        <section className={styles.nav__Wrap}>
            <Image 
                src={logo}
                alt='logo'
                width={40}
                height={40}
                priority
                style={{
                    objectFit: 'cover',
                }}
            />

            <ProfileItem />
        </section>
    )
}

export default AppTopNavBar