import React from 'react'
import styles from './styles.module.css';
import { cleanStringAndReturnLower } from '@/helpers/formatters';
import { v4 as uuidv4 } from 'uuid';
import Creatable from 'react-select/creatable';
import { ActionMeta, MultiValue } from 'react-select';
import { toast } from 'sonner';


const ScheduleItem = ({
    classId,
    selectedClassName,
    day,
    activityDays=[],
    classSchedules=[],
    handleUpdateClassSchedules=()=>{},
}: {
    classId: number;
    selectedClassName: string;
    day: string;
    activityDays: IPlaceActivityHours[];
    classSchedules: IPlaceClassSchedule[];
    handleUpdateClassSchedules: (items: IPlaceClassSchedule[]) => void;
}) => {
    const currentSchedules = classSchedules.slice();

    const [
        foundClassSchedule,
        foundClassScheduleIndex,
    ] = [
        currentSchedules.find(item => 
            item.class_id === classId
        ),
        currentSchedules.findIndex(item => 
            item.class_id === classId
        ),
    ];

    const [
        foundDaySchedule,
        foundDayScheduleIndex,
    ] = [
        foundClassSchedule?.schedules.find(schedule => 
            cleanStringAndReturnLower(day) === cleanStringAndReturnLower(schedule.day)
        ) ?? null,
        foundClassSchedule?.schedules.findIndex(schedule => 
            cleanStringAndReturnLower(day) === cleanStringAndReturnLower(schedule.day)
        ) ?? -1,
    ];

    const handleAddTime = (time: string) => {
        const re = /^(1[0-2]|[1-9])(:([0-5][0-9]))?(am|pm)$/i;
        const trimmedVal = time.trim();
    
        const isValidTime = trimmedVal.match(re);
    
        if (!isValidTime) return toast.error('Please enter a valid time in either of these formats: 9pm, 9am, 9:05am, 9:45pm');
    
        let hour = parseInt(isValidTime[1], 10);
        let minutes = isValidTime[3] ? parseInt(isValidTime[3], 10) : 0;
        const period = isValidTime[4].toLowerCase();
    
        if (period === 'pm' && hour !== 12) {
            hour += 12;
        } else if (period === 'am' && hour === 12) {
            hour = 0;
        }
    
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
    
        const newTime = `${formattedHour}:${formattedMinutes}`;
        const newClassSchedules = [...currentSchedules];
                
        if (!foundClassSchedule) {
            const newSchedule = {
                class_id: classId,
                schedules: [
                    {
                        day,
                        times: [newTime],
                    }
                ],
            };
            newClassSchedules.push(newSchedule);
            handleUpdateClassSchedules(newClassSchedules);
            return;
        }

        const currentClassSchedule = newClassSchedules[foundClassScheduleIndex];
        const updatedSchedules = [...currentClassSchedule.schedules];
        const daySchedule = updatedSchedules[foundDayScheduleIndex];

        if (daySchedule) {
            const updatedTimes = Array.from(new Set([...daySchedule.times, newTime]));
            daySchedule.times = updatedTimes;
        } else {
            updatedSchedules.push({
                day,
                times: [newTime],
            });
        }

        newClassSchedules[foundClassScheduleIndex] = {
            ...currentClassSchedule,
            schedules: updatedSchedules,
        };
        handleUpdateClassSchedules(newClassSchedules);
    };    

    const handleTimesChange = (
        newValue: MultiValue<{ label: string; value: string }>, 
        actionMeta: ActionMeta<{ label: string; value: string }>,
    ) => {
        if (foundDayScheduleIndex === -1) return;

        const newClassSchedules = [...currentSchedules];
        const currentClassSchedule = newClassSchedules[foundClassScheduleIndex];
        const updatedSchedules = [...currentClassSchedule.schedules];
        const daySchedule = updatedSchedules[foundDayScheduleIndex];

        if (daySchedule) {
            const updatedTimes = newValue.map(item => item.value);
            daySchedule.times = updatedTimes;
        }

        newClassSchedules[foundClassScheduleIndex] = {
            ...currentClassSchedule,
            schedules: updatedSchedules,
        }
        handleUpdateClassSchedules(newClassSchedules);
    };

    return (
        <section 
            className={
                `${styles.row__Detail} 
                ${activityDays.find(activity => 
                    cleanStringAndReturnLower(activity.day) === cleanStringAndReturnLower(day) && 
                    (
                        !activity.opening_time || 
                        activity.opening_time.length < 1 ||
                        !activity.closing_time || 
                        activity.closing_time.length < 1
                    )
                ) ? styles.disabled : ''}`
            }
            key={uuidv4()}
        >
            <p>
                <span>{day}</span>
            </p>

            <Creatable
                value={
                    foundDaySchedule ?
                        foundDaySchedule.times.map(time => {
                            return {
                                label: time,
                                value: time,
                            }
                        })
                    :
                    []
                }
                isMulti
                onCreateOption={handleAddTime}
                onChange={handleTimesChange}
            />
        </section>
    )
}

export default ScheduleItem