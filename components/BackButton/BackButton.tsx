'use client';


import React from 'react'
import Button from '../Button/Button'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import useMobile from '@/hooks/useMobile';

const BackButton = () => {
    const router = useRouter();
    const isMobile = useMobile();

    return <Button
        label='back'
        icon={
            <IoArrowBackOutline />
        }
        style={{
            padding: 0,
            background: 'transparent',
            color: '#000',
            fontSize: isMobile ? '0.75rem' : undefined,
            width: 'max-content',
        }}
        handleClick={() => router.back()}
    />
}

export default BackButton