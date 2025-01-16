import Switch from "react-switch";
import styles from "./styles.module.css";


const ToggleSwitch = ({
    handleChange= () => {},
    checked=false,
    activeColor='#08a7f8',
    width = 56,
    height = 28,
    boxShadow = 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
    handleDiameter,
    contentText,
    fontSize,
    gap,
    cursor,
}: {
    handleChange?: () => void,
    checked?: boolean,
    activeColor?: string;
    width?: number;
    height?: number;
    boxShadow?: string;
    handleDiameter?: number;
    contentText?: string;
    fontSize?: string;
    gap?: string;
    cursor?: string;
}) => {
    return <label 
        className={styles.switch__Wrap}
        style={{
            cursor,
            gap,
        }}
    >
        <Switch
            onChange={handleChange}
            checked={checked}
            uncheckedIcon={<></>}
            checkedIcon={<></>}
            onColor={activeColor}
            width={width}
            height={height}
            boxShadow={boxShadow}
            handleDiameter={handleDiameter}
        />
        {
            contentText &&
            <span style={{
                fontSize,
                textTransform: 'capitalize',
            }}>
                {contentText}
            </span>
        }
    </label>
}

export default ToggleSwitch