'use client';

import React from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import styles from './styles.module.css'
import useMobile from '@/hooks/useMobile';


const CustomBarChart = ({
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
            <BarChart
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

                <Bar
                    dataKey={dataKeyName}
                    fill="var(--primary-app-color)" 
                />
            </BarChart>
      </ResponsiveContainer>
    </section>
}

export default CustomBarChart