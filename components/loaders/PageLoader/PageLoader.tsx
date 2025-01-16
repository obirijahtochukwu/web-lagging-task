import Loader from '@/components/loaders/Loader/Loader'
import React from 'react'

const PageLoader = () => {
    return <section 
        style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '1rem 0 2rem',
            height: '100%',
            width: '100%',
        }}
    >
        <Loader />
    </section>
}

export default PageLoader