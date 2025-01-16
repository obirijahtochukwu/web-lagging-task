import React from 'react'
import styles from './styles.module.css'
import BackButton from '@/components/BackButton/BackButton'
import AddPlaceDetails from './details'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Configure Studio | Dasboard'
}

const AddPlacesPage = () => {
    return (
        <section className={styles.content__Wrap}>
            <BackButton />

            <AddPlaceDetails />
        </section>
    )
}

export default AddPlacesPage