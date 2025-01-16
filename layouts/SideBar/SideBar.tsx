'use client';


import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logo from '../../assets/FAVICON-plain.png'
import ProfileItem from '../ProfileItem/ProfileItem'
import Link from 'next/link'
import styles from './styles.module.css'
import { usePathname } from 'next/navigation';
import { useUserContext } from '@/contexts/UserContext';
import { LinkItemDetail, ownerNavLinks, userNavLinks } from './utils';
import useMobile from '@/hooks/useMobile';
import AlternatingDotsLoader from '@/components/loaders/AlternatingDotsLoader/AlternatingDotsLoader';

const SideBar = () => {
    const currentPath = usePathname();
    const { 
        userDetails,
        userDetailsLoading,
    } = useUserContext();
    const isMobile = useMobile();

    const [ links, setLinks ] = useState<LinkItemDetail[]>([]);

    useEffect(() => {
        if (!userDetails) return setLinks([]);

        if (userDetails.is_owner === true) {
            setLinks(ownerNavLinks);

            return;
        }
        
        setLinks(userNavLinks);
    }, [userDetails])
    
    return (
        <nav className={styles.side__Nav}>
            <section className={styles.nav__Info}>
                <Link
                    href={'/'}
                    className={styles.logo}
                >
                    <Image 
                        src={logo}
                        alt='logo'
                        width={50}
                        height={50}
                        priority
                    />
                </Link>

                <ul className={styles.links__Wrap}>
                    {
                        !userDetails ?
                            <li style={{
                                margin: '0 auto',
                            }}>
                                <AlternatingDotsLoader />
                            </li>
                        :
                        React.Children.toArray(links.map(link => {
                            return <li 
                                className={`${styles.link__Item} ${link.location === currentPath ? styles.active : ''}`}
                                key={link.id}
                            >
                                <Link href={link.location}>
                                    <link.icon 
                                        size={
                                            isMobile ?
                                                '1.3rem'
                                            :
                                            ''
                                        }
                                    />
                                    <span>{link.text}</span>
                                </Link>
                            </li>
                        }))
                    }
                </ul>
            </section>

            {
                isMobile ?
                    <></>
                :
                <ProfileItem />
            }
        </nav>
    )
}

export default SideBar