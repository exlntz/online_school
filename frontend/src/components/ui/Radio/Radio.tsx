import { type ForwardedRef, forwardRef, type JSX } from "react";
import { cn } from '../../../utils/cn';
import styles from './Radio.module.css';
import type { RadioProps } from "./Radio.props";

export const Radio = forwardRef(({ className, children, ...props }: RadioProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
    return (
        <label className={cn(styles.radioLabel, className)}>
            <input 
                type="radio" 
                className={styles.radioInput}
                ref={ref} 
                {...props} 
            />
            <span className={styles.radioCustom}></span>
            <span>{children}</span>
        </label>
    )
})