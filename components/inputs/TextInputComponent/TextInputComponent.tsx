import React, { CSSProperties } from 'react'
import styles from './styles.module.css'
import RequiredIndicator from '../../RequiredIndicator/RequiredIndicator';


const TextInputComponent = ({
    label='',
    type='text',
    name='name',
    value='',
    onChange=()=>{},
    isTextArea=false,
    borderRadius,
    placeholder='',
    labelFontSize,
    inputFontSize,
    isDisabled=false,
    style,
    checked=false,
    handleUpdateChecked=()=>{},
    isRequired=false,
    min,
    accentColor,
    rows=5,
    ref,
    inputBackgroundColor,
}: {
    label?: string;
    type?: string;
    name?: string;
    value?: string;
    onChange?: (targetName: string, targetValue: string) => void;
    isTextArea?: boolean;
    borderRadius?: string;
    placeholder?: string;
    labelFontSize?: string;
    inputFontSize?: string;
    isDisabled?: boolean;
    style?: CSSProperties;
    checked?: boolean;
    handleUpdateChecked?: (val: boolean) => void;
    isRequired?: boolean;
    min?: any;
    accentColor?: string;
    rows?: number;
    ref?: React.RefObject<HTMLInputElement> | React.RefObject<HTMLTextAreaElement>;
    inputBackgroundColor?: string;
}) => {
    return (
        <label 
            className={styles.input__Wrap}
            style={style}
        >
            {
                label.length > 0 ?
                    <span
                        style={{
                            fontSize: labelFontSize,
                        }}
                    >
                        {label}
                        {
                            isRequired ? <>
                                {' '}<RequiredIndicator />
                            </>
                            :
                            <></>
                        }
                    </span>
                :
                <></>
            }
            
            {
                isTextArea ?
                    <textarea
                        name={name}
                        value={value}
                        onChange={({ target }) => onChange(name, target.value)}
                        rows={rows}
                        style={{
                            borderRadius,
                            fontSize: inputFontSize,
                            backgroundColor: inputBackgroundColor,
                        }}
                        placeholder={placeholder}
                        disabled={isDisabled}
                        readOnly={isDisabled}
                        ref={ref as React.RefObject<HTMLTextAreaElement>}
                    ></textarea>
                :      
                <input 
                    name={name}
                    type={type}
                    value={value}
                    onChange={({ target }) => {
                        if (type === 'checkbox') return handleUpdateChecked(target.checked);
                        onChange(name, target.value)
                    }}
                    style={{
                        borderRadius,
                        fontSize: inputFontSize,
                        accentColor,
                        backgroundColor: inputBackgroundColor,
                    }}
                    placeholder={placeholder}
                    disabled={isDisabled}
                    readOnly={isDisabled}
                    checked={checked}
                    min={min}
                    ref={ref as React.RefObject<HTMLInputElement>}
                />
            }
        </label>
    )
}

export default TextInputComponent