'use client';

import React from 'react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import styles from './styles.module.css'
import useMobile from '@/hooks/useMobile';


const CustomLineChart = ({
    title='',
    subtitle='',
    data=[],
    dataKeyName='',
    labelKeyName='',
}: {
    title: string;
    subtitle: string;
    data: {}[];
    dataKeyName: string;
    labelKeyName: string;
}) => {
    const isMobile = useMobile();

    return <section className={styles.content}>
        <h3 className={styles.title}>
            <>{title}</>
            <span className={styles.subtitle}>{subtitle}</span>
        </h3>

        <ResponsiveContainer 
            width="100%" 
            height={500}
        >
            <LineChart
                width={500}
                height={400}
                data={data}
                margin={
                    isMobile ? 
                        {}
                    :
                    {
                        top: 20,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }
                }
                barSize={30}
            >   
                <XAxis 
                    dataKey={labelKeyName} 
                    tick={{
                        fontSize: 12
                    }}
                />

                <YAxis
                    tick={{
                        fontSize: 12
                    }}
                />
                
                <Tooltip />

                <Line
                    dataKey={dataKeyName}
                    fill="var(--primary-app-color)" 
                    type={'monotone'}
                />
            </LineChart>
      </ResponsiveContainer>
    </section>
}

export default CustomLineChart