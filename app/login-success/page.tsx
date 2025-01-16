'use client';


import Loader from '@/components/loaders/Loader/Loader';
import { useUserContext } from '@/contexts/UserContext';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'

const LoginSuccess = () => {
  const { userDetails, userDetailsLoading, isLoggedIn } = useUserContext();
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (userDetailsLoading) return;
    if (!userDetails && !isLoggedIn) return router.push('/auth/login');

    const nextUrl = params.get('next');
    if (nextUrl) return router.push(nextUrl);

    if (userDetails?.is_owner !== true) {
      return router.push('/');
    }
    
    router.push(`/dashboard/owner`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails, userDetailsLoading, isLoggedIn])

  return (
    <section style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100dvh',
    }}>
      <Loader />
    </section>
  )
}

export default LoginSuccess;
