'use client';

import { useUserContext } from '@/contexts/UserContext';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { userTypes } from '../UserTypeSelect/utils';

const ProtectedRouteWrap = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const { userDetails, userDetailsLoading, isLoggedIn } = useUserContext();
    const router = useRouter();
    const pathname = usePathname();
    
    useEffect(() => {
        if (userDetailsLoading || userDetails || isLoggedIn) {
            if (userDetails && userDetails.is_owner === false && pathname.includes(`/${userTypes.owner}`)) return router.replace(pathname.replace(`/${userTypes.owner}`, `/${userTypes.user}`));
            if (userDetails && userDetails.is_owner === true && pathname.includes(`/${userTypes.user}`)) return router.replace(pathname.replace(`/${userTypes.user}`, `/${userTypes.owner}`)) 
            
            return;
        }

        if (!userDetails) return router.push('/auth/login');
    }, [userDetails, userDetailsLoading, isLoggedIn, pathname])

    return (
        <>{children}</>
    )
}

export default ProtectedRouteWrap