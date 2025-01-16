'use client';


import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logo from '../../../../assets/FAVICON-plain.png'
import styles from './styles.module.css'
import Link from 'next/link'
import Button from '@/components/Button/Button'
import UserTypeSelect from '../UserTypeSelect/UserTypeSelect';
import TextInputComponent from '@/components/inputs/TextInputComponent/TextInputComponent';
import { AuthDetails, AuthInfoKey, authTypesDict, initialAuthInfo } from './utils';
import { AuthService } from '@/services/authService';
import { validateEmail } from '@/helpers/helpers';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { userTypes } from '../UserTypeSelect/utils';
import { AppConstants } from '@/utils/constants';
import { useUserContext } from '@/contexts/UserContext';


const AuthForm = ({
    authType,
}: {
    authType: string;
}) => {
    const [ authInfo, setAuthInfo ] = useState<AuthInfoKey>(initialAuthInfo);
    
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ details, setDetails ] = useState<AuthDetails>({});

    const { setIsLoggedIn, setUserDetails } = useUserContext();

    const params = useSearchParams();
    const router = useRouter();

    const authService = new AuthService();


    const handleUpdateDetail = (key: string, value: string) => {
        setDetails(prevDetail => {
            return {
                ...prevDetail,
                [key]: value
            }
        })
    }

    useEffect(() => {
        setAuthInfo(initialAuthInfo);

        if (authType === authTypesDict.login) return setAuthInfo({
            isLoginForm: true,
            isRegisterForm: false,
            isForgotPassForm: false,
            isResetPassForm: false,
        });

        if (authType === authTypesDict.forgotPass) return setAuthInfo({
            isLoginForm: false,
            isRegisterForm: false,
            isForgotPassForm: true,
            isResetPassForm: false,
        });

        if (authType === authTypesDict.resetPass) return setAuthInfo({
            isForgotPassForm: false,
            isLoginForm: false,
            isRegisterForm: false,
            isResetPassForm: true,
        });

        setAuthInfo({
            isLoginForm: false,
            isForgotPassForm: false,
            isRegisterForm: true,
            isResetPassForm: false,
        });
    }, [authType])


    const handleSubmitDetails = async () => {
        const numberofDetailsEntered = Object.keys(details).length;
        const minDetailsRequired = authInfo.isForgotPassForm === false ? 2 : 1;
        if (numberofDetailsEntered < minDetailsRequired || loading) return toast.info('Please fill in all required details');
        if (details.email && !validateEmail(details.email)) return toast.info('Please enter a valid email');

        const nextUrl = params.get('next');
        setLoading(true);

        if (authInfo.isLoginForm === true) {
            try {
                const res = await authService.loginUser(details);
                localStorage.setItem(AppConstants.tokenKey, res?.token);

                setIsLoggedIn(true);

                if (nextUrl) return router.push(`/login-success?next=${nextUrl}`);

                router.push('/login-success');
            } catch (error) {
                setLoading(false);   
            }

            return
        }

        if (authInfo.isForgotPassForm === true) {
            try {
                await authService.requestPasswordReset(details);
                setLoading(false);
                setDetails({});
            } catch (error) {
                setLoading(false);   
            }

            return
        }

        if (authInfo.isResetPassForm === true) {
            const [ token, uid ] = [ 
                params.get('token'),
                params.get('uid'),
            ];
            
            try {
                await authService.resetPassword({
                    ...details,
                    token,
                    uidb64: uid,
                });
                router.push('/auth/login');
            } catch (error) {
                setLoading(false);   
            }

            return
        }
        
        try {
            const res = await authService.registerUser({
                ...details,
                is_owner: params.get('type') === userTypes.owner,
            });

            setIsLoggedIn(true);
            setUserDetails({
                id: res?.id,
                email: res?.email,
                is_owner: res?.is_owner,
                phone_number: res?.phone_number,
                username: res?.username,
            });

            localStorage.setItem(AppConstants.tokenKey, res?.token);

            if (nextUrl) return router.push(`/login-success?next=${nextUrl}`);
            router.push('/login-success');
        } catch (error) {
            setLoading(false);   
        }
    }

    if (!authType || authType?.length < 1 || (authInfo.isForgotPassForm === false && authInfo.isLoginForm === false && authInfo.isRegisterForm === false && authInfo.isResetPassForm === false)) return <></>
    
    return <>
        <section className={styles.form__Wrap}>
            <Link href={'/'}>
                <Image 
                    src={logo}
                    alt='logo icon'
                    width={45}
                    height={45}
                />
            </Link>

            {
                authInfo.isRegisterForm === true &&
                <UserTypeSelect 
                    authType={authType}
                />
            }

            {
                (authInfo.isForgotPassForm === true || authInfo.isResetPassForm === true) ? 
                    <TextInputComponent 
                        label='email'
                        type='email'
                        name='email'
                        value={details.email ?? ''}
                        onChange={handleUpdateDetail}
                        isRequired
                    />
                :
                <TextInputComponent 
                    label='username'
                    name='username'
                    value={details.username ?? ''}
                    onChange={handleUpdateDetail}
                    isRequired
                />
            }

            {
                authInfo.isRegisterForm === true && <>
                    <TextInputComponent 
                        label='email'
                        type='email'
                        name='email'
                        value={details.email ?? ''}
                        onChange={handleUpdateDetail}
                        isRequired
                    />

                    <TextInputComponent 
                        label='phone number'
                        type='tel'
                        name='phone_number'
                        value={details.phone_number ?? ''}
                        onChange={handleUpdateDetail}
                    />
                </>
            }

            {
                authInfo.isForgotPassForm === false &&
                <section className={styles.input__Col}>
                    <TextInputComponent 
                        label='password'
                        type='password'
                        name='password'
                        value={details.password ?? ''}
                        onChange={handleUpdateDetail}
                        isRequired
                    />

                    {
                        authInfo.isLoginForm === true &&
                        <Button 
                            label='forgot password?'
                            useLink
                            linkLocation='/auth/forgot-password'
                            style={{
                                width: 'max-content',
                                padding: 0,
                                fontSize: '0.65rem',
                                color: 'var(--primary-app-color)',
                                marginLeft: 'auto',
                                background: 'none',
                            }}
                        />
                    }
                </section>
            }

            <Button 
                label={
                    loading ?
                        'Please wait...'
                    :
                    authInfo.isResetPassForm === true || authInfo.isForgotPassForm === true ?
                        'Reset'
                    :
                    authInfo.isLoginForm === true ?
                        'Login'
                    :
                    'Register'
                }
                handleClick={handleSubmitDetails}
            />

            <section className={styles.bottom__Row}>
                <p>
                    {
                        authInfo.isLoginForm === true ?
                            "Don't have an account?"
                        :
                        "Already have an account?"
                    }
                </p>

                <Button 
                    label={
                        authInfo.isLoginForm === true ?
                            'Register'
                        :
                        'Login'
                    }
                    useLink={true}
                    linkLocation={
                        authInfo.isLoginForm === true ?
                            params.size > 0 ?
                                `/auth/register?type=${userTypes.owner}&${new URLSearchParams(params?.toString())?.toString()?.split('&')?.slice(1)?.join('')}`
                            :
                            `/auth/register?type=${userTypes.owner}`
                        :
                        params.size > 0 ?
                            `/auth/login?${new URLSearchParams(params.toString()).toString()}` 
                        :
                        `/auth/login` 
                    }
                    style={{
                        fontSize: '0.85rem',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--primary-app-color)',
                        padding: 0
                    }}
                />
            </section>

            {
                authInfo.isRegisterForm === true &&
                <p className={styles.legal__Info}>
                    <span>By continuing, you agree to our named</span>
                    {' '}
                    <Button 
                        label='terms of use'
                        style={{
                            padding: 0,
                            backgroundColor: 'transparent',
                            fontSize: '0.65rem',
                            color: 'var(--primary-app-color)',
                        }}
                    />
                    
                    <span>Read our</span>
                    
                    <Button 
                        label='Privacy Policy'
                        style={{
                            padding: 0,
                            backgroundColor: 'transparent',
                            fontSize: '0.65rem',
                            color: 'var(--primary-app-color)',
                        }}
                    />
                </p>
            }
        </section>
    </>
}

export default AuthForm