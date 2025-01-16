import React from 'react'
import styles from './styles.module.css'
import { formatTimeString } from '@/helpers/helpers';


const OpeningHours = ({
    activityHours
}: {
    activityHours: IPlaceActivityHours[];
}) => {
    return (
        <section className={styles.content__Wrap}>
            <h3 className={styles.header}>opening hours</h3>

            <ul className={styles.benefits}>
                {
                    React.Children.toArray(activityHours.map(activity => {
                        const placeIsClosedOnDay = (
                            !activity.opening_time ||
                            !activity.closing_time
                        );

                        return <li
                            className={placeIsClosedOnDay ? styles.closed : ''}
                            key={activity.id}
                        >
                            <span>{activity.day}</span>
                            {
                                placeIsClosedOnDay ?
                                <span className={styles.time__Detail}>closed</span>
                                :
                                <span className={styles.time__Detail}>{formatTimeString(activity.opening_time ?? '')} - {formatTimeString(activity.closing_time ?? '')}</span>
                            }
                        </li>
                    }))
                }
            </ul>
        </section>
    )
}

export default OpeningHours