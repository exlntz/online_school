import { type JSX } from 'react';
import { cn } from '../../lib/cn';
import styles from './Card.module.css';
import type { CardProps } from './Card.props';


export const Card = ({ footer, hoverable, variant='default', className, children, ref, ...props }: CardProps): JSX.Element => {
    return (
        <div
            ref={ref}
            className={cn(
                styles.card, 
                styles[variant],
                hoverable && styles.hoverable,
                className
            )} 
            {...props}
        >
            <div className={styles.content}>
                {children}
            </div>

            {footer && (
                <div className={styles.footer}>
                    {footer}
                </div>
            )}
        </div>
    )
}

