'use client';

import Button from '@/components/Button/Button';
import CategorySearchBar from '@/components/CategorySearchBar/CategorySearchBar';
import { useUserContext } from '@/contexts/UserContext';
import { userTypes } from '@/features/Auth/components/UserTypeSelect/utils';
import { generateDashLinkForUser } from '@/helpers/helpers';
import useClickOutside from '@/hooks/useClickOutside';
import useMobile from '@/hooks/useMobile';
import React, { useRef, useState } from 'react'
import { IoAddOutline, IoCloseOutline, IoGridOutline } from 'react-icons/io5';
import { RxHamburgerMenu } from 'react-icons/rx';
import styles from './styles.module.css'


const NavigationBarContent = ({
    showSearchBar=false,
}: {
    showSearchBar?: boolean;
}) => {
    const { userDetails, userDetailsLoading } = useUserContext();
    const [ showMobileMenu, setShowMobileMenu ] = useState(false);
    const isMobile = useMobile();

    const actionsRef = useRef<HTMLDivElement>(null);

    useClickOutside({
        elemRef: actionsRef,
        handleClickOutside: () => setShowMobileMenu(false),
    });

    return <>
        <CategorySearchBar
            hideTrendingStyles={true}
            wrapperStyle={{
                width: '35%',
                display: showSearchBar && !isMobile ?
                    'flex'
                :
                'none'
            }}
            searchBarStyle={{
                padding: '0.75rem 0.75rem 0.75rem 1.5rem',
                width: '100%',
            }}
        />

        <div
            style={{
                display: isMobile ? 'block' : 'none',
            }}
        >
            {
                showMobileMenu ?
                    <IoCloseOutline
                        size={'1.2rem'}
                        cursor={'pointer'}
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                    />
                :
                <RxHamburgerMenu
                    size={'1.2rem'}
                    cursor={'pointer'}
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                />
            }
        </div>

        <section 
            className={`${styles.nav__Actions} ${isMobile ? styles.mobile : ''} ${isMobile && showMobileMenu ? styles.show : ''}`}
            ref={actionsRef}
        >   
            <Button
                label='dashboard'
                useLink={true}
                icon={
                    <IoGridOutline
                        color='#fff'
                        size='1.1rem'
                    />
                }
                style={{
                    display: userDetails ? 'flex' : 'none'
                }}
                linkLocation={generateDashLinkForUser(userDetails?.is_owner)}
            />

            <Button 
                label='login'
                style={{
                    backgroundColor: 'transparent',
                    color: '#000',
                    fontWeight: '500',
                    padding: 0,
                    display: !userDetails ? 'flex' : 'none',
                }}
                useLink={true}
                linkLocation='/auth/login'
            />
        
            <Button 
                label='boost your studio'
                icon={
                    <IoAddOutline
                        color='#fff'
                        size='1.1rem'
                    />
                }
                style={{
                    display: !userDetails ? 'flex' : 'none',
                }}
                useLink={true}
                linkLocation={
                    `/auth/register?type=${userTypes.owner}`
                }
            />
        </section>
    </>
}

export default NavigationBarContent