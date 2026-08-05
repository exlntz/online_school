import { type JSX } from "react";
import { cn } from "../../../utils/cn";
import styles from './Button.module.css';
import type { ButtonProps } from "./Button.props";
import ArrowIcon from './arrow.svg?react';


export const Button = ({ 
    className, 
    children, 
    variant='primary', 
    size='m',
    isLoading,
    arrow='none',
    noBg,
    disabled,
    ref,
    ...props
}: ButtonProps): JSX.Element => {
    return (
        <button
            ref={ref}
            className={cn(
                styles.button,
                styles[variant],
                styles[size],
                { 
                    [styles.isLoading]: isLoading,
                    [styles.noBg]: noBg
                },
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? <span className={styles.loader}>Загрузка...</span> : children}
            {arrow !== 'none' && (
                <span className={cn(styles.arrow, {
                    [styles.right]: arrow === 'right',
                    [styles.rightUp]: arrow === 'right-up',
                })}>
                    <ArrowIcon />
                </span>
            )}
        </button>
    )
}