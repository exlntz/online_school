import { type JSX } from "react";
import { cn } from "../../lib/cn";
import styles from './Divider.module.css';
import type { DividerProps } from "./Divider.props";


export const Divider = ( { className, variant='default', orientation='horizontal', ...props }: DividerProps ): JSX.Element => {
    return (
        <hr 
            className={cn(
                styles.divider, 
                styles[variant], 
                styles[orientation], 
                className
            )}
            {...props} 
        />
    )
}