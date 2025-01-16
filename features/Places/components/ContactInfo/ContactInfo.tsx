import React from 'react'
import styles from './styles.module.css'
import { IoLinkOutline, IoMailOutline } from 'react-icons/io5';
import { HiOutlinePhone } from 'react-icons/hi2';
import Link from 'next/link';


const ContactInfo = ({
    email,
    website,
    phoneNumber,
}: {
    email: string;
    website?: string;
    phoneNumber?: string;
}) => {
    return (
        <section className={styles.content__Wrap}>
            <h3 className={styles.header}>contact information</h3>

            <section className={styles.info}>
                <p className={styles.info__Item}>
                    <IoMailOutline size={'1.4rem'} />
                    <span>{email}</span>
                </p>

                {
                    website &&
                    <Link 
                        href={website} 
                        className={`${styles.info__Item} ${styles.link}`}
                        target='_blank'
                        rel='noreferrer noopener'
                    >
                        <IoLinkOutline size={'1.4rem'} />
                        <span>{website}</span>
                    </Link>
                }

                {
                    phoneNumber &&
                    <p className={styles.info__Item}>
                        <HiOutlinePhone size={'1.4rem'} />
                        <span>{phoneNumber}</span>
                    </p>
                }
            </section>
        </section>
    )
}

export default ContactInfo