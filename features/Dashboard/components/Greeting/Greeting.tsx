'use client';


import { useUserContext } from '@/contexts/UserContext'
import React from 'react'
import styles from './styles.module.css'
import Button from '@/components/Button/Button';
import { IoAddOutline, IoSearchOutline } from 'react-icons/io5';
import { generateDashLinkForUser } from '@/helpers/helpers';
import { listingSortOptions, listingViewTypes } from '@/features/Search/sections/Places/utils';


const Greeting = () => {
    const { userDetails } = useUserContext();

    return (
        <section className={styles.greeting__Item}>
            <h1 className={styles.title__Text}>
                Welcome back <span className={styles.username}>{userDetails?.username}</span> !
            </h1>

            <Button 
                label={
                    userDetails?.is_owner === true ?
                        'add studio'
                    :
                    'search studios'
                }
                icon={
                    userDetails?.is_owner === true ?
                        <IoAddOutline
                            size={'1.1rem'}
                        />
                    :
                    <IoSearchOutline
                        size={'1.1rem'}
                    />
                }
                useLink={true}
                linkLocation={
                    userDetails?.is_owner === true ?
                        `${generateDashLinkForUser(userDetails.is_owner)}/studios/add-studio`
                    :
                    `/search?view=${listingViewTypes.listView}&sort=${listingSortOptions.sort_by_newest}`
                }
                style={{
                    backgroundColor: 'var(--primary-app-color)',
                }}
            />
        </section>
    )
}

export default Greeting