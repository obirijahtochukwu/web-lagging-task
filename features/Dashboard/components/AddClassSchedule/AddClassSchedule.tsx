'use client';

import { useAppContext } from '@/contexts/AppContext/AppContext';
import { getAllDaysOfTheWeek } from '@/helpers/helpers';
import React from 'react'
import styles from './styles.module.css';
import ScheduleItem from './ScheduleItem';

const daysOfTheWeek = getAllDaysOfTheWeek();

const AddClassSchedule = ({
    classNumber=1,
    classId=0,
    studioActivityDays=[],
    classSchedules=[],
    handleUpdateClassSchedules=()=>{},
}: {
    classNumber?: number;
    classId?: number;
    studioActivityDays?: IPlaceActivityHours[];
    classSchedules?: IPlaceClassSchedule[];
    handleUpdateClassSchedules?: (items: IPlaceClassSchedule[]) => void;
}) => {
    const {
        catersTo,
    } = useAppContext();

    const selectedClassName = catersTo.find(item => item.id === Number(classId))?.name ?? '';

    return (
        <section className={styles.content__Wrap}>
            <section className={styles.header}>
                <p>{classNumber}. {selectedClassName} class</p>
            </section>

            <section className={styles.schedules}>
                <section className={styles.row__Detail}>
                    <p><b>Day</b></p>
                    <p><b>Class times</b></p>
                </section>

                {
                    React.Children.toArray(daysOfTheWeek.map(day => {
                        return <ScheduleItem 
                            classId={classId}
                            selectedClassName={selectedClassName}
                            day={day}
                            activityDays={studioActivityDays}
                            classSchedules={classSchedules}
                            handleUpdateClassSchedules={handleUpdateClassSchedules}
                        />
                    }))
                }
            </section>
        </section>
    )
}

export default AddClassSchedule