import Footer from '@/layouts/Footer/Footer';
import SinglePlaceView from '@/features/Places/sections/SinglePlaceView/SinglePlaceView';
import NavigationBar from '@/layouts/NavigationBar/NavigationBar'
import { PlaceService } from '@/services/placeService';
import React from 'react'

export async function generateMetadata(props: { params: PageParams }) {
    const { placeId } = await props.params;
    if (!placeId) return {
        title: "Invalid Studio",
    };

    const placeService = new PlaceService();

    try {
        const res = await placeService.getSinglePlaceName(Number(placeId));
        return {
            title: `${res?.name} | Studios`,
        }
    } catch (error) {
        return {
            title: "Invalid Studio",
        };
    }
}

const Places = async (props: { params: PageParams }) => {
    const { placeId } = await props.params;
    
    return <>
        <NavigationBar 
            showSearchBar
            wrapperStyle={{
              padding: '1rem 1.5rem',
              zIndex: 1001,
            }}
        />

        <SinglePlaceView 
            id={placeId ? Number(placeId) : null}
        />

        <Footer />
    </>
}

export default Places