'use client';


import React, { useState } from 'react'
import styles from './styles.module.css'
import Image from 'next/image';
import useMobile from '@/hooks/useMobile';
import Button from '@/components/Button/Button';
import { getYoutubeEmbedVideoLink } from '@/helpers/helpers';
import MasterPopup from '../MasterPopup/MasterPopup';


const maxDescriptionCap = 800;

const SinglePlaceDescription = ({
    description,
    video,
    masters,
}: {
    description: string;
    video?: string;
    masters: IPlaceMasterImage[];
}) => {
    const [ showFullDescription, setShowFullDescription ] = useState(false);
    const [ showMasterPopup, setShowMasterPopup ] = useState(false);
    const [ masterDetails, setMasterDetails ] = useState<IPlaceMasterImage | null>(null);
    const isMobile = useMobile();

    const handleMasterItemClick = (master: IPlaceMasterImage) => {
        setMasterDetails(master);
        setShowMasterPopup(true);
    }

    const handleHidePopup = () => {
        setShowMasterPopup(false);
        setMasterDetails(null);
    }
    
    return <>
        <section className={styles.content__Wrap}>
            <h3 className={styles.header}>about this place</h3>

            <section className={styles.content}>
                <section className={styles.intro}>
                    <iframe
                        width="100%"
                        height={isMobile ? 200 : 300}
                        src={getYoutubeEmbedVideoLink(video)}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe>

                    <section className={styles.masters__Wrap}>
                        <h4 className={styles.content__header}>your masters</h4>

                        <section className={styles.masters}>
                            {
                                React.Children.toArray(masters.map(master => {
                                    return <section 
                                        className={styles.master__item}
                                        key={master.id}
                                        onClick={() => handleMasterItemClick(master)}
                                    >
                                        <Image 
                                            width={isMobile ? 65 : 100}
                                            height={isMobile ? 65 : 100}
                                            alt={master.name}
                                            src={master.image as string}
                                            style={{
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                            }}
                                        />

                                        <p>{master.name}</p>
                                    </section>
                                }))
                            }
                        </section>
                    </section>
                </section>

                <section className={styles.description__Content}>
                    <h4 className={styles.content__header}>description</h4>

                    <p>
                        {
                            showFullDescription ?
                                description
                            :
                            description.length > maxDescriptionCap ?
                                description.slice(0, maxDescriptionCap) + '...'
                            :
                            description
                        }
                    </p>

                    {
                        description.length > maxDescriptionCap ?
                            <Button 
                                label={
                                    !showFullDescription ?
                                        'see more'
                                    :
                                    'see less'
                                }
                                style={{
                                    width: 'max-content',
                                    padding: 0,
                                    fontSize: '0.8rem',
                                    background: 'transparent',
                                    color: 'var(--primary-app-color)',
                                }}
                                handleClick={() => setShowFullDescription(!showFullDescription)}
                            />
                        :
                        <></>
                    }
                </section>
            </section>
        </section>

        {
            showMasterPopup &&
            <MasterPopup 
                master={masterDetails ?? null}
                hidePopup={handleHidePopup}
            />
        }
    </>
}

export default SinglePlaceDescription