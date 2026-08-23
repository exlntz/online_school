import type { JSX } from 'react';
import { cn } from '../../lib/cn';
import styles from './Loader.module.css';
import type { LoaderProps } from './Loader.props';
import SpinnerIcon from './spinner.svg?react';


export const Loader = ( {
    size = 'm',
    variant = 'current',
    text,
    className,
    ...props
}: LoaderProps): JSX.Element => {
    return (
        <div 
            className={cn(styles.loaderWrapper, styles[size], styles[variant], className)} 
            role="status"
            aria-live="polite"
            {...props}
        >
            <SpinnerIcon className={styles.spinner} />
            {text && <span className={styles.text}>{text}</span>}
        </div>
    );
};