import { Check } from 'lucide-react';
import type { JSX } from "react";
import { cn } from '../../lib/cn';
import styles from './Checkbox.module.css';
import type { CheckboxProps } from "./Checkbox.props";

export const Checkbox = ({ className, children, ref, ...props }: CheckboxProps): JSX.Element => {
    return (
        <label className={cn(styles.checkboxLabel, className)}>
            <input 
                type="checkbox" 
                className={styles.checkboxInput}
                ref={ref} 
                {...props} 
            />
            <span className={styles.checkboxCustom}>
                <Check className={styles.checkIcon} size={14} strokeWidth={3} />
            </span>
            
            {children && <span>{children}</span>}
        </label>
    );
};