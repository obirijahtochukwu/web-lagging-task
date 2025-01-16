import React, { CSSProperties } from 'react'
import styles from './styles.module.css'
import RequiredIndicator from '@/components/RequiredIndicator/RequiredIndicator';


const AddItemWrapper = ({
    title,
    isRequired=false,
    children,
    extraInfo,
    ref,
    style={},
}: {
    title: string;
    children: React.ReactNode;
    isRequired?: boolean;
    extraInfo?: string;
    ref?: React.RefObject<HTMLDivElement>;
    style?: CSSProperties;
}) => {
    return <>
        <section 
            className={styles.add__Section}
            ref={ref}
        >
            <h2 className={styles.title}>
                <span>
                    {title}
                    {
                        isRequired ? <>
                            {' '}<RequiredIndicator />
                        </>
                        :
                        <></>
                    }    
                </span>
                
                {
                    extraInfo && <>
                        <span className={styles.title__Info}>{extraInfo}</span>
                    </>
                }
            </h2>

            <section className={styles.section__Content}>
                {children}
            </section>
        </section>
    </>
}

export default AddItemWrapper