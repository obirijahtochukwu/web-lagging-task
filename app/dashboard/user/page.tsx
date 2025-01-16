import React from 'react'
import styles from '../styles.module.css'
import Greeting from '@/features/Dashboard/components/Greeting/Greeting'
import TopStatsRow from '@/features/Dashboard/sections/TopStatsRow/TopStatsRow'
import CustomLineChart from '@/components/Charts/LineChart'
import Bookings from '@/features/Dashboard/sections/Bookings/Bookings'
import { getMonthsOfTheYear } from '@/helpers/helpers'


const randomBookingsCount = [0, 4, 8, 1, 5, 3, 6, 3, 2, 6, 4, 10];

const UserDashboard = () => {
    return <>
        <section className={styles.page__Wrap}>
            <Greeting />

            <TopStatsRow />

            <section className={styles.user__Stats}>
                {/* <CustomLineChart
                    title='Booking Trends'
                    subtitle='get insights into how many bookings you made this year'
                    data={
                        getMonthsOfTheYear().map((month, index) => {
                            return {
                                name: month,
                                bookings: randomBookingsCount[index]
                            }
                        })
                    }
                    dataKeyName='bookings'
                    labelKeyName='name'
                /> */}

                <Bookings />
            </section>

        </section>
    </>
}

export default UserDashboard