'use client';

import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useAppContext } from '@/contexts/AppContext/AppContext';
import { APIProvider, InfoWindow, Map, Marker} from "@vis.gl/react-google-maps";
import { defaultMapCenter, testMapCoordinates } from './utils';
import { IoLocationOutline } from 'react-icons/io5';
import PageLoader from '@/components/loaders/PageLoader/PageLoader';

interface PlaceCoordinate {
  lat: number;
  lng: number;
  name: string;
  address: string;
}

const PlacesMap = ({
  placeCoordinates=[],
  minHeight="100dvh",
  width,
  showContentOnSmallScreen=false,
  zoom=11,
  loaded=true,
}: {
  placeCoordinates?: PlaceCoordinate[];
  minHeight?: string;
  width?: string;
  showContentOnSmallScreen?: boolean;
  zoom?: number;
  loaded?: boolean;
}) => {
  const { showMap, mapKey, mapKeyLoading } = useAppContext();
  const [ selectedLocation, setSelectedLocation ] = useState<PlaceCoordinate | null>(null);
  const [ showDialog, setShowDialog ] = useState(false);

  const handleMarkerClick = (e: google.maps.MapMouseEvent, clickedCoord: PlaceCoordinate) => {
    setSelectedLocation(clickedCoord);
    setShowDialog(true);
  }

  return <>
    <section 
      className={`${styles.content__Wrap} ${showMap === false ? styles.hide : ''} ${showContentOnSmallScreen === true ? styles.main : ''}`}
      style={{
        width,
      }}
    >
      {
        !loaded || mapKeyLoading ? <>
          <PageLoader />
        </>
        :
        
        <APIProvider
          apiKey={mapKey ?? ''}
        >
          <Map
            defaultZoom={zoom}
            defaultCenter={
              placeCoordinates.length > 0 && placeCoordinates.find(co => co.lat > 0)?.lat && placeCoordinates.find(co => co.lat > 0)?.lng ? 
                placeCoordinates.find(co => co.lat > 0)
              : 
              defaultMapCenter
            }
            disableDefaultUI
            style={{ 
              minHeight, 
              height: minHeight 
            }}
          >
            {showDialog && (
              <InfoWindow 
                position={selectedLocation}
                onClose={() => {
                  setSelectedLocation(null);
                  setShowDialog(false);
                }}
              >
                <h1
                  style={{
                    fontFamily: 'var(--mako-font)',
                    fontSize: '1rem',
                  }}
                >
                  {selectedLocation?.name}
                </h1>

                <p
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                    fontSize: '0.7rem',
                  }}
                >
                  <IoLocationOutline />
                  {selectedLocation?.address}
                </p>
              </InfoWindow>
            )}

            {
              placeCoordinates.map((coord, index) => {
                if (!coord.lat || !coord.lng || !coord.lng) return <div key={index}></div>
                
                return <Marker 
                  position={coord} 
                  key={`${index}`}
                  onClick={(e) => handleMarkerClick(e, coord)}
                />
              })
            }
          </Map>
        </APIProvider>
      }
    </section>
  </>
}

export default PlacesMap