import { type JSX } from "react";
import { cn } from "../../lib/cn";
import styles from './Badge.module.css';
import type { BadgeProps } from "./Badge.props";


export const Badge = ({ className, children, variant='primary', size='m', ...props}: BadgeProps): JSX.Element => {
    return (
        <div
            className={cn(
                styles.badge,
                styles[variant],
                styles[size],
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}