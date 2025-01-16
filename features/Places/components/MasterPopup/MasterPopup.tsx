import React from 'react'
import { IoClose } from 'react-icons/io5';
import styles from './styles.module.css'
import Image from 'next/image';


const MasterPopup = ({
    master,
    hidePopup=()=>{},
}: {
    master: IPlaceMasterImage | null;
    hidePopup?: () => void;
}) => {
    if (!master) return <></>

    return (
        <section className={styles.overlay}>
            <section className={styles.popup}>
                <section className={styles.top__Content}>
                    <IoClose
                        cursor={'pointer'} 
                        onClick={hidePopup}
                        size={'1.4rem'}
                        style={{
                            display: 'block',
                            marginLeft: 'auto',
                        }}
                    />

                    <Image 
                        src={master.image as string}
                        alt={master.name}
                        width={0}
                        height={0}
                        className={styles.master__Img}
                    />
                </section>

                <section className={styles.content}>
                    <h2 className={styles.header}>{master.name}</h2>

                    <section className={styles.info}>
                        <p>about</p>
                        <p className={styles.bio}>{master.bio}</p>
                    </section>
                </section>
            </section>
        </section>
    )
}

export default MasterPopup