import { type JSX } from 'react';
import { cn } from '../../../utils/cn';
import styles from './Card.module.css';
import type { CardProps } from './Card.props';


export const Card = ({ className, children, footer, hoverable, ref, ...props }: CardProps): JSX.Element => {
    return (
        <div
            ref={ref}
            className={cn(
                styles.card, 
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

