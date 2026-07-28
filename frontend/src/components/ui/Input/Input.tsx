import { type JSX } from "react";
import { cn } from '../../../utils/cn';
import styles from './Input.module.css';
import type { InputProps } from "./Input.props";


export const Input = ({ className, type, error, ref, ...props}: InputProps): JSX.Element => {
    return (
        <div className={styles.inputWrapper}>
            <input 
                className={cn(styles.input, className, {
                    [styles.error]: error
                })}
                type={type} 
                ref={ref} 
                {...props} 
            />
            {error && <span role='alert' className={styles.errorMessage}>{error.message}</span>}
        </div>
    )
}
