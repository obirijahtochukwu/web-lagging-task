
import React from 'react'
import styles from './styles.module.css'
import { Metadata } from 'next';
import AllPlacesDetails from './details';
import Button from '@/components/Button/Button';
import { IoAddOutline } from 'react-icons/io5';
import { generateDashLinkForUser } from '@/helpers/helpers';


export const metadata: Metadata = {
    title: 'Studios | Dasboard'
}

const PlacesPage = () => {
    return <>
        <section className={styles.content__Wrap}>
            <section className={styles.header__Wrap}>
                <h1 className={styles.header}>Your studios</h1>

                <Button
                    label={'add'}
                    icon={
                        <IoAddOutline
                            size={'1.1rem'}
                        />
                    }
                    useLink={true}
                    linkLocation={`${generateDashLinkForUser(true)}/studios/add-studio`}
                    style={{
                        backgroundColor: 'var(--primary-app-color)'
                    }}
                />
            </section>

            <AllPlacesDetails />
        </section>
    </>
}

export default PlacesPage