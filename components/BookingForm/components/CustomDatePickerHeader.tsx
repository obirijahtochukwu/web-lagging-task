import React from 'react'
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import styles from '../styles.module.css'

interface CustomDatePickerHeaderProps extends ReactDatePickerCustomHeaderProps {
    startYear?: number;
    startFromCurrent?: boolean;
}

const CustomDatePickerHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
    startYear=1960,
    startFromCurrent=false,
}: CustomDatePickerHeaderProps) => {
    const currentYear = new Date().getFullYear();
    let years = [];

    if (startFromCurrent) {    
        years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => currentYear - i);
    } else {
        years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i).filter(year => year <= currentYear - 5);
    }

    const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString("default", { month: "long" }));

    return (
        <div className={styles.cutom__Pick__head}>
            <select
                value={date.getMonth()}
                onChange={({ target: { value } }) => changeMonth(Number(value))}
            >
                {months.map((month, index) => (
                    <option key={index} value={index}>
                        {month}
                    </option>
                ))}
            </select>
            
            <select
                value={date.getFullYear()}
                onChange={({ target: { value } }) => changeYear(Number(value))}
            >
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CustomDatePickerHeader