import React, { forwardRef } from "react";
import styles from '../styles.module.css';


interface CustomDatePickerInputProps {
    value: string;
    onClick: () => void;
}

const CustomDatePickerInput = forwardRef<HTMLButtonElement, CustomDatePickerInputProps>(
    (props, ref) => {
        const { 
            value, 
            onClick,
        } = props;

        return <span 
            className={styles.custom__Pick__Date} 
            onClick={onClick} 
            ref={ref}
        >
            {
                !value || value.length < 1 ? 
                    'select a date'
                :
                value
            }
        </span>
    }
);

CustomDatePickerInput.displayName = 'CustomDatePickerInput';

export default CustomDatePickerInput;