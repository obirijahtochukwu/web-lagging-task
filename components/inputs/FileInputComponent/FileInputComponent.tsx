import React from 'react'
import styles from './styles.module.css'
import RequiredIndicator from '../../RequiredIndicator/RequiredIndicator';

const FileInputComponent = ({
    label,
    labelFontSize,
    onChange=()=>{},
    accept,
    isRequired=false,
}: {
    label?: string;
    labelFontSize?: string;
    onChange?: (files: FileList | null) => void;
    accept?: string;
    isRequired?: boolean;
}) => {
    return <>
        <label className={styles.input__Wrap}>
            {
                label ?
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

            <input
                type='file'
                onChange={({ target }) => onChange(target.files)}
                accept={accept}
            />
        </label>
    </>
}

export default FileInputComponent