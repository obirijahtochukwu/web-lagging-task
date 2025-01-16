import Button from '@/components/Button/Button'
import React from 'react'
import { userTypes, userTypesDict } from './utils';
import styles from './styles.module.css';
import { useSearchParams } from 'next/navigation';


const UserTypeSelect = ({
    authType,
}: {
    authType: string;
}) => {
    const params = useSearchParams();

    return <>
        <section className={styles.select__Wrap}>
            {
                React.Children.toArray((Object.keys(userTypes) as Array<keyof typeof userTypes>).map(type => {
                    return <Button
                        label={userTypesDict[type]}
                        useLink={true}
                        linkLocation={
                            params.size > 0 ?
                                `/auth/${authType}?type=${type}&${new URLSearchParams(params?.toString())?.toString()?.split('&')?.slice(1)?.join('')}`
                            :
                            `/auth/${authType}?type=${type}`
                        }
                        key={type}
                        style={{
                            backgroundColor: params.get('type') === type ?
                                '#000'
                            :
                            'transparent',
                            color: params.get('type') === type ?
                                '#fff'
                            :
                            '#808080',
                        }}
                    />
                }))
            }
        </section>
    </>
}

export default UserTypeSelect