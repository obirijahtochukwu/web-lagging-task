import { Metadata } from 'next'
import React from 'react'
import styles from './styles.module.css'
import SavedStudioDetail from './details'


export const metadata: Metadata = {
    title: 'Saved Studios | Dasboard'
}


const SavedStudios = () => {
    return <>
        <section className={styles.content__Wrap}>
            <h1 className={styles.header}>Saved studios</h1>

            <SavedStudioDetail />
        </section>
    </>
}

export default SavedStudios